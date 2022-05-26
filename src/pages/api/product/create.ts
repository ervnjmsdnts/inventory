import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function createProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { name, price, status, ingredients } = req.body;

    price = Number(price);

    const savedProduct = await prisma.product.create({
      data: {
        name,
        price,
        status,
        ingredients: {
          connect: ingredients.map((ingredient: any) => {
            return {
              id: Number(ingredient.ingredientId),
            };
          }),
        },
      },
    });

    return res.status(200).json({ savedProduct });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
