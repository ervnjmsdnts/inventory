import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { prisma } from "../../../../lib/prisma";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user: User = req.body;

    const password = await hash(user.password, 10);

    const savedUser = await prisma.user.create({
      data: {
        ...user,
        password,
      },
    });

    return res.status(200).json({ savedUser });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
