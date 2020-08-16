import express from 'express';

import LeedsController from './controllers/LeedsController';

const routes = express.Router();
const leedsControllers = new LeedsController();

routes.get('/create', leedsControllers.index);
routes.post('/create', leedsControllers.create);

export default routes;
