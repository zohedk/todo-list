import { User } from "@prisma/client";
import { Response } from "express";
import { z } from "zod";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import { PrismaSingleton } from "../../clients/db";
import { signAsync } from "../../helpers";

const prismaClient = PrismaSingleton.getInstance().prisma;

export const userInput = z.object({
  name: z.string().max(30).optional(),
  email: z.string().max(40),
  password: z.string().max(30),
});

// env var's
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const secret = process.env.JWT_SECRET;

export async function signupUser(
  req: {
    body: Partial<User>;
  },
  res: Response
) {
  try {
    const reqBody = req.body;
    const parsedInput = userInput.safeParse(reqBody);

    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { name, email, password } = parsedInput.data;

    const validEmail = await emailValidator.validate(email);

    if (!validEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }

    // hashing password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userInDb = await prismaClient.user.findUnique({ where: { email } });

    if (userInDb) {
      return res.status(401).json({
        success: false,
        message: "user already present",
      });
    }

    const user = await prismaClient.user.create({
      data: {
        name: name!,
        email,
        password: hashedPassword,
      },
    });

    const signedToken = await signAsync({ email: user.email, secret });

    // deleting user password before sending as a response
    user.password = "";
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      user,
      token: signedToken,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
