import express from 'express';
import userController from '../controller/user-controller.js';
import clothController from '../controller/cloth-controller.js';

const publicRouter = new express.Router();
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);
publicRouter.get('/api/clothes', clothController.getAll);

export { publicRouter };
