// This file handles all routes related to authentication.
// For example: signing up, signing in, and signing out.

import { Router } from "express";
import { signUp,signIn,signOut } from "../controllers/auth.controller.js";




const authRouter = Router();

// These are the "endpoints" or web addresses for our auth features.
//path: api/v1/auth/sing-up  (POST)
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

export default authRouter;