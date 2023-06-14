import express from "express";
import authController from "../controllers/auth-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/api/auth/signup", authController.signUp);
publicRouter.post("/api/auth/signin", authController.signIn);

export {
    publicRouter
}
