import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchTaskById(req: NextFncReq, res: Response) {
  try {
    const { id } = req.body as {
      id: string;
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
    return res.status(200).json({
      success: true,
      task,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
