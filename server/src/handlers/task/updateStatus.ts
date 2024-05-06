import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function updateStatus(req: NextFncReq, res: Response) {
  try {
    const { id, status } = req.body as {
      id: string;
      status: string;
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
        status,
      },
    });

    return res.status(200).json({
      message: "status updated",
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
