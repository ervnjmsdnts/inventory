import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function updateProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { id, name, price, status, ingredients } = req.body;

    price = Number(price);

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

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
