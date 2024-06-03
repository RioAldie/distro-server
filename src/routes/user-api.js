import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import clothController from '../controller/cloth-controller.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// USER
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// CLOTHES
userRouter.post('/api/clothes/add', clothController.add);
export { userRouter };
