import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function deleteUser(req: NextFncReq, res: Response) {
  try {
    const { user } = req;
    user!.password = "";
    const deletedUser = await prismaClient.user.delete({
      where: { email: user?.email },
    });

    return res.status(200).json({
      success: true,
      message: "deted user profile",
      user: deletedUser,
    });
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      message: "user deletion unsuccessfull",
    });
  }
}
