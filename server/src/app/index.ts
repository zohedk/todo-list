import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { taskRouter, userRouter } from "../routes";

dotenv.config();

const app = express();

app.use(cors(), bodyParser.json(), cookieParser());

app.use("/user", userRouter);
app.use("/task", taskRouter);

// healthCheck
app.get("/health", (req, res) => {
  return res
    .json({
      message: "server running fine",
    })
    .status(200);
});
export default app;
