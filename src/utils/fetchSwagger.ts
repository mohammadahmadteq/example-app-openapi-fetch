
/*
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
*/

/*
import fs from 'fs';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

// Load environment variables from .env file
dotenv.config();

// Get current branch name
function getCurrentBranchName(): string {
  try {
    const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    return branchName;
  } catch (error) {
    console.error('Error getting current branch name:', error);
    return 'unknown';
  }
}

async function fetchSwagger() {
  const keyFile = process.env['GOOGLE_SERVICE_ACCOUNT_KEY'];
  const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];

  if (!keyFile || !folderId) {
    console.error('Missing GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_DRIVE_FOLDER_ID in environment variables.');
    return;
  }

  const branchName = getCurrentBranchName();

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    // Try to fetch the branch-specific swagger file first
    const branchFileName = `swagger-${branchName}.json`;
    const defaultFileName = 'swagger.json';

    const listResponse = await drive.files.list({
      q: `(name='${branchFileName}' or name='${defaultFileName}') and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = listResponse.data.files;
    let fileToDownload = files?.find(file => file.name === branchFileName) || files?.find(file => file.name === defaultFileName);

    if (fileToDownload?.id) {
      const fileId = fileToDownload.id;
      console.log(`Found file ${fileToDownload.name} with ID: ${fileId}. Downloading it...`);

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
      console.log(`No swagger file found for branch ${branchName} or default swagger.json.`);
    }
  } catch (error) {
    console.error('Error fetching files:', error);
  }

  console.log("Branch name: ", branchName);
}

fetchSwagger();
*/

import fs from 'fs';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSwagger() {
  const keyFile = process.env['GOOGLE_SERVICE_ACCOUNT_KEY'];
  const folderId = process.env['GOOGLE_DRIVE_FOLDER_ID'];
  const branchName = process.env['BRANCH_NAME'];

  if (!keyFile || !folderId || !branchName) {
    console.error('Missing GOOGLE_SERVICE_ACCOUNT_KEY, GOOGLE_DRIVE_FOLDER_ID, or BRANCH_NAME in environment variables.');
    return;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: keyFile,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    const listResponse = await drive.files.list({
      q: `(name='swagger-${branchName}.json' or name='swagger.json') and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name)',
    });

    const files = listResponse.data.files;
    let fileToDownload = files?.find(file => file.name === `swagger-${branchName}.json`) || files?.find(file => file.name === 'swagger.json');

    if (fileToDownload?.id) {
      const fileId = fileToDownload.id;
      console.log(`Found file ${fileToDownload.name} with ID: ${fileId}. Downloading it...`);

      const dest = fs.createWriteStream(path.join(__dirname, '../output/swagger.json'));

      const res = await drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'stream' }
      );

      if (res.data && typeof res.data.on === 'function') {
        res.data
          .on('end', () => {
            console.log(`File downloaded successfully for branch ${branchName}.`);
          })
          .on('error', (err) => {
            console.error('Error downloading file:', err);
          })
          .pipe(dest);
      } else {
        console.error('Unexpected response format.');
      }
    } else {
      console.log(`No swagger file found for branch ${branchName} or default swagger.json.`);
    }
  } catch (error) {
    console.error('Error fetching files:', error);
  }

  console.log("Branch name: ", branchName);
}

fetchSwagger();
