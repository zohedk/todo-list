import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function createTask(req: NextFncReq, res: Response) {
  try {
    const user = req.user;
    const { title, description, status, important } = req.body as {
      title: string;
      description: string;
      status: string;
      important: boolean;
    };
    const task = await prismaClient.task.create({
      data: {
        title,
        description,
        status,
        important,
        user: { connect: { id: user!.id } },
      },
    });

    return res.status(200).json({
      success: true,
      message: "task created successfully",
      task,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
