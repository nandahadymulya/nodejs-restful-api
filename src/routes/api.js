import express from "express";
import authController from "../controllers/auth-controller.js";
import userController from "../controllers/user-controller.js";
import contactController from "../controllers/contact-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.delete("/api/auth/signout", authController.signout);
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.post("/api/contacts", contactController.create);
userRouter.get("/api/contacts/:contactId", contactController.get);
userRouter.put("/api/contacts/:contactId", contactController.update);
userRouter.delete("/api/contacts/:contactId", contactController.remove);
userRouter.get("/api/contacts", contactController.search);

export { userRouter };
