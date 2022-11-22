import express from 'express';
import { imageResizeEndpoint } from './endpoints';

const routes = express.Router();

routes.get('/api', imageResizeEndpoint);

export default routes;
