import { Router } from "express";
import { authenticateUser } from "../middleware";
import {
  createTask,
  deleteTask,
  fetchTasks,
  fetchTaskById,
  updateTask,
  fetchImportantTasks,
  updateStatus,
} from "../handlers";

export const taskRouter = Router();

taskRouter.get("/", authenticateUser, fetchTasks);
taskRouter.get("/important", authenticateUser, fetchImportantTasks);
taskRouter.put("/update-status", authenticateUser, updateStatus);

taskRouter.get("/id", authenticateUser, fetchTaskById);

taskRouter.post("/create", authenticateUser, createTask);

taskRouter.put("/update", authenticateUser, updateTask);

taskRouter.delete("/delete", authenticateUser, deleteTask);
