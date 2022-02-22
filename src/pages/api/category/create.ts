import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function createCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const category = req.body;

    const savedCategory = await prisma.category.create({
      data: category,
    });

    return res.status(200).json({ savedCategory });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
