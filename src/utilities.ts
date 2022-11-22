import sharp from 'sharp';
import { queryParams } from './tests/helpers/types';

export async function resizeImage(imageDetails: queryParams): Promise<boolean> {
  try {
    await sharp(`images/${imageDetails.filename}.jpg`)
      .resize({
        width: Number(imageDetails.width),
        height: Number(imageDetails.height),
      })
      .toFile(
        `resized-images/${imageDetails.filename}-${imageDetails.width}-${imageDetails.height}.jpg`
      );
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}
