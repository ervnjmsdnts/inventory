import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function updateOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { id, customerName, productId, numberOfItems } = req.body;

    numberOfItems = Number(numberOfItems);
    productId = Number(productId);

    const oldOrder = await prisma.order.findFirst({
      where: {
        id: Number(id),
      },
    });

    const savedOrder = await prisma.order.update({
      where: {
        id: id,
      },
      data: { customerName, productId, numberOfItems },
    });

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

      const newStock =
        stock!.quantity - Math.abs(numberOfItems - oldOrder!.numberOfItems);

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
