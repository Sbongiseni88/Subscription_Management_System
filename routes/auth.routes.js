// This file handles all routes related to authentication.
// For example: signing up, signing in, and signing out.

import { Router } from "express";

const authRouter = Router();

// These are the "endpoints" or web addresses for our auth features.
authRouter.post('/sign-up', (req, res) => res.send({ title: "Sign up" }));
authRouter.post('/sign-in', (req, res) => res.send({ title: "Sign in" }));
authRouter.post('/sign-out', (req, res) => res.send({ title: 'Sign out' }));

export default authRouter;