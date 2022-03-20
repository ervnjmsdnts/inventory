import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function deleteIngredient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const ingredient = req.body;

    const savedIngredient = await prisma.ingredient.update({
      where: {
        id: ingredient.id,
      },
      data: { isActive: false },
    });

    return res.status(200).json({ savedIngredient });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
