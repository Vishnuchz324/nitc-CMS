import express from "express";
const router = express.Router();

import userController from "../controllers/user.controller.js";

router.get("/", userController.get);

export default router;
