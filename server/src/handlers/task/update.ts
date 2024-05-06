import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function updateTask(req: NextFncReq, res: Response) {
  try {
    const { id, title, description, status, important } = req.body as {
      id: string;
      title: string;
      description: string;
      status: string;
      important: boolean;
    };
    const task = await prismaClient.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(401).json({
        success: false,
        message: "no task found",
      });
    }

    const updatedTask = await prismaClient.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        important,
      },
    });

    return res.status(200).json({
      message: "task detail updated",
      success: true,
      task: updatedTask,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
