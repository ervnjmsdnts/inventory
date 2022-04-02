import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { prisma } from "../../../../lib/prisma";
import { sign } from "jsonwebtoken";

type UserInput = {
  username: string;
  password: string;
};

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user: UserInput = req.body;

    const savedUser = await prisma.user.findFirst({
      where: {
        username: user.username,
      },
    });

    if (!savedUser) {
      return res.json({ message: "Invalid credentials" });
    }

    compare(user.password, savedUser!.password, (err, result) => {
      if (result) {
        const payload = {
          name: savedUser?.firstName,
          role: savedUser?.role,
        };
        const token = sign(payload, "secret");

        return res.status(200).json({ authToken: token });
      }

      return res.json({ message: "Invalid credentials" });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
