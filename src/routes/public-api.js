import express from "express";
import authController from "../controllers/auth-controller.js";

const publicRouter = new express.Router();

// auth API
publicRouter.post("/api/auth/signup", authController.signup);
publicRouter.post("/api/auth/signin", authController.signin);

export {
    publicRouter
}
