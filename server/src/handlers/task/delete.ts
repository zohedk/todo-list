import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function deleteTask(req: NextFncReq, res: Response) {
  try {
    const { id } = req.body as {
      id: string;
    };
    const task = await prismaClient.task.delete({
      where: { id },
    });
    return res.status(200).json({
      message: "task deleted successfully",
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
