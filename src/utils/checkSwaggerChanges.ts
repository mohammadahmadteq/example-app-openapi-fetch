/*
import fs from 'fs';
import path from 'path';

function checkSwaggerChanges() {
  const oldSwaggerPath = path.resolve(__dirname, '../output/oldSwagger.json');
  const newSwaggerPath = path.resolve(__dirname, '../output/swagger.json');

  if (!fs.existsSync(oldSwaggerPath)) {
    fs.copyFileSync(newSwaggerPath, oldSwaggerPath);
    console.log('No previous swagger.json found. Saved current swagger.json as oldSwagger.json.');
    return false;
  }

  const oldSwagger = fs.readFileSync(oldSwaggerPath, 'utf-8');
  const newSwagger = fs.readFileSync(newSwaggerPath, 'utf-8');

  if (oldSwagger !== newSwagger) {
    console.error('Swagger files have changed. Please update the frontend accordingly.');
    fs.copyFileSync(newSwaggerPath, oldSwaggerPath);
    return true;
  }

  console.log('No changes detected in swagger.json.');
  return false;
}

checkSwaggerChanges();
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkSwaggerChanges() {
  const oldPath = path.resolve(__dirname, '../output/oldSwagger.json');
  const newPath = path.resolve(__dirname, '../output/swagger.json');

  let oldSwagger = '';
  let newSwagger = '';

  try {
    if (fs.existsSync(newPath)) {
      newSwagger = fs.readFileSync(newPath, 'utf-8');
    } else {
      console.error('New Swagger data is not available.');
      return false;
    }

    if (fs.existsSync(oldPath)) {
      oldSwagger = fs.readFileSync(oldPath, 'utf-8');
    } else {
      fs.writeFileSync(oldPath, newSwagger);
      return false;
    }

    if (oldSwagger !== newSwagger) {
      console.error('Swagger files have changed. Please update the frontend accordingly.');
      fs.writeFileSync(oldPath, newSwagger);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error reading or writing Swagger files:', error);
    return false;
  }
}

checkSwaggerChanges();
