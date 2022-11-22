import express from 'express';
import fs from 'fs';
import { resizeImage } from './utilities';
import { queryParams } from './tests/helpers/types';

export async function imageResizeEndpoint(
  req: express.Request<unknown, unknown, unknown, queryParams>,
  res: express.Response
) {
  const { filename, width, height } = req.query;
  const resizedFileName = `resized-images/${filename}-${width}-${height}.jpg`;

  // make sure all parameters have values
  if (!filename || !width || !height) {
    return res.status(400).send('Please fill in all the required values');
  }

  // make sure the entered type is correct
  if (Number.isNaN(+width) || Number.isNaN(+height)) {
    return res.status(400).send('Please enter numeric values only.');
  }

  if (Number(width) < 1 || Number(height) < 1) {
    return res.status(400).send('Please enter a value greater than zero.');
  }

  // check if the file already exists
  // create file if it file doesn't exist
  if (!fs.existsSync(`images/${filename}.jpg`)) {
    return res.status(400).send('This picture does not exist');
  }

  if (!fs.existsSync(resizedFileName)) {
    const imageStatus = await resizeImage(req.query);
    if (!imageStatus) {
      return res.status(400).send('Failed to resize');
    }
  }
  res.sendFile(resizedFileName, { root: '.' });
}
