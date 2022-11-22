import express from 'express';
import sharp from 'sharp';
import fs from 'fs';

const app = express();

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});

// define types for typescript
type queryParams = {
  filename?: string;
  width?: string;
  height?: string;
};

app.get(
  '/api',
  async function (
    req: express.Request<unknown, unknown, unknown, queryParams>,
    res: express.Response
  ) {
    const { filename, width, height } = req.query;
    let resizedFileName: string = `resized-images/${filename}-${width}-${height}.jpg`;

    // make sure all parameters have values
    if (!filename || !width || !height) {
      return res.status(400).send('Please fill in all the required values');
    }

    // make sure the entered type is correct
    if (Number.isNaN(+width) || Number.isNaN(+height)) {
      return res.status(400).send('Please enter numeric values only.');
    }

    if (width < '1' || height < '1') {
      return res.status(400).send('Please enter a value greater than zero.');
    }

    // check if the file already exists
    // create file if it file doesn't exist
    if (!fs.existsSync(`images/${filename}.jpg`)) {
      return res.status(400).send('This picture does not exist');
    }

    if (!fs.existsSync(resizedFileName)) {
      try {
        await sharp(`images/${filename}.jpg`)
          .resize({
            width: Number(width),
            height: Number(height),
          })
          .toFile(resizedFileName);
      } catch (error) {
        console.log(error);
      }
    }
    res.sendFile(resizedFileName, { root: '.' });
  }
);

export default app;
