import { Router } from "express";
import { authenticateUser } from "../middleware";
import {
  loginUser,
  signupUser,
  updateUser,
  deleteUser,
  fetchUser,
} from "../handlers";

export const userRouter = Router();

userRouter.get("/", authenticateUser, fetchUser);

userRouter.post("/login", loginUser);

userRouter.post("/signup", signupUser);

userRouter.put("/update", authenticateUser, updateUser);

userRouter.delete("/delete", authenticateUser, deleteUser);
