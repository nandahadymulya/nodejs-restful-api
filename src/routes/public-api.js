import express from "express";
import AuthController from "../controllers/auth-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/api/auth", AuthController.signup);

export {
    publicRouter
}
