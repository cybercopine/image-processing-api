import supertest from 'supertest';
import app from '../index';

const req = supertest(app);

describe('Endpoint response test', () => {
  it('gets a successfully resized image', async () => {
    const res = await req.get(
      '/api?filename=icelandwaterfall&width=540&height=436'
    );
    expect(res.status).toBe(200);
  });

  it('checks for non-existent images', async () => {
    const res = await req.get('/api?filename=test&width=100&height=150');
    expect(res.status).toBe(400);
    expect(res.text).toBe('This picture does not exist');
  });

  it('checks for validity of dimensions', async () => {
    const res = await req.get('/api?filename=santamonica&width=w&height=h');
    expect(res.status).toBe(400);
    expect(res.text).toBe('Please enter numeric values only.');
  });

  it('checks sign of dimensions', async () => {
    const res = await req.get('/api?filename=palmtunnel&width=-45&height=45');
    expect(res.status).toBe(400);
    expect(res.text).toBe('Please enter a value greater than zero.');
  });

  it('checks for empty values', async () => {
    const res = await req.get('/api?filename=palmtunnel&width=&height=270');
    expect(res.status).toBe(400);
    expect(res.text).toBe('Please fill in all the required values');
  });
});
