// This file defines the routes for user-related operations.
// These allow us to get, create, and update user information.

import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

// Define the endpoints for user management
userRouter.get('/', getUsers);
userRouter.get('/:id',authorize,getUser);
userRouter.post('/', (req, res) => res.send({ title: 'CREATE new user' }));
userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }));
userRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE user' }));

export default userRouter;