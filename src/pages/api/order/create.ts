import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function createOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { id, customerName, productId, numberOfItems } = req.body;

    numberOfItems = Number(numberOfItems);
    productId = Number(productId);

    const savedOrder = await prisma.order.create({
      data: { id, customerName, productId, numberOfItems },
    });

    //deduct ingredients from stock
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: { ingredients: true },
    });

    const ingredients = product!.ingredients;

    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      const stock = await prisma.ingredient.findFirst({
        where: { id: ingredient.id },
      });

      const newStock = stock!.quantity - numberOfItems;

      await prisma.ingredient.update({
        where: { id: stock!.id },
        data: { quantity: newStock },
      });
    }

    return res.status(200).json({ savedOrder });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
