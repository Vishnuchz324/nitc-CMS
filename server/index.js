import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

import authRouter from "./src/routes/auth.routes.js";
import complaintRouter from "./src/routes/complaint.routes.js";
import adminRouter from "./src/routes/admin.routes.js";
import reviewerRouter from "./src/routes/reviewer.routes.js";

app.use("/complaint", complaintRouter);
app.use("/auth", authRouter);
app.use("/reviewer", reviewerRouter);
app.use("/admin", adminRouter);

app.get("/docs", (req, res) => {
	res.redirect("https://documenter.getpostman.com/view/15324195/2s8YK4s7g9");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log("listening");
});
