import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchTasks(req: NextFncReq, res: Response) {
  try {
    const user = req.user;

    const tasks = await prismaClient.task.findMany({
      where: { user: { id: user?.id } },
    });

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
