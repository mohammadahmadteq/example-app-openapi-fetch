

import fs from 'fs';
import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function fetchSwagger() {
  const keyFile = process.env['GOOGLE_SERVICE_ACCOUNT_KEY'];
  const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];

  if (!keyFile || !folderId) {
    console.error('Missing GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_DRIVE_FOLDER_ID in environment variables.');
    return;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const listResponse = await drive.files.list({
      q: `name='swagger.json' and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = listResponse.data.files;
    if (files && files.length > 0) {
      const fileId = files[0]?.id;
      if (fileId) {
        const dest = fs.createWriteStream('./src/output/swagger.json');

        const res = await drive.files.get(
          { fileId, alt: 'media' },
          { responseType: 'stream' }
        );

        if (res.data && typeof res.data.on === 'function') {
          res.data
            .on('end', () => {
              console.log('File downloaded successfully.');
            })
            .on('error', (err) => {
              console.error('Error downloading file:', err);
            })
            .pipe(dest);
        } else {
          console.error('Unexpected response format.');
        }
      } else {
        console.error('File ID is undefined.');
      }
    } else {
      console.log('No swagger.json file found.');
    }
  } catch (error) {
    console.error('Error fetching files:', error);
  }
}

fetchSwagger();
