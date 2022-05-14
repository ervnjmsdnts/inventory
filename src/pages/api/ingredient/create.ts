import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function createIngredient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { id, name, quantity, status, categoryId } = req.body;

    quantity = Number(quantity);
    categoryId = Number(categoryId);

    const savedIngredient = await prisma.ingredient.create({
      data: { id, name, quantity, status, categoryId },
    });

    return res.status(200).json({ savedIngredient });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong oh noooo" });
  }
}
