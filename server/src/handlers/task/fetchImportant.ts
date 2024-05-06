import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchImportantTasks(req: NextFncReq, res: Response) {
  try {
    const user = req.user;

    const task = await prismaClient.task.findMany({
      where: { user: { id: user?.id }, important: true },
    });

    return res.status(200).json({
      message: "task fetched successfully",
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
