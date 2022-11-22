import { resizeImage } from '../utilities';

describe('sharp resizing tool', () => {
  it('successfully resizes an image', async () => {
    const imageStatus = await resizeImage({
      filename: 'palmtunnel',
      width: '450',
      height: '150',
    });
    expect(imageStatus).toBe(true);
  });

  it('failes to resizes an image', async () => {
    const imageStatus = await resizeImage({
      filename: 'nonExistentPhoto',
      width: '700',
      height: '700',
    });
    expect(imageStatus).toBe(false);
  });
});
