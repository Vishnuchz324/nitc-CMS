import express from "express";
const router = express.Router();

import reviewerController from "../controllers/reviewer.controller.js";

router.get("/", reviewerController.get);

export default router;
