import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function updateIngredient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { id, name, quantity, status, categoryId } = req.body;

    quantity = Number(quantity);

    const savedIngredient = await prisma.ingredient.update({
      where: {
        id,
      },
      data: { name, quantity, status, categoryId },
    });

    return res.status(200).json({ savedIngredient });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
