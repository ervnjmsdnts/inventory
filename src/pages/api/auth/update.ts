import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user = req.body;

    const savedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });

    return res.status(200).json({ savedUser });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
