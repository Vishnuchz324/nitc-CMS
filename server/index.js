import express from "express";

const app = express();
const PORT = 8080;
app.use(express.json());

import userRouter from "./src/routes/user.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import adminRouter from "./src/routes/admin.routes.js";
import reviwerRouter from "./src/routes/reviewer.routes";

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/reviewer", reviwerRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
	console.log("listening");
});
