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

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    const ingredient = await prisma.ingredient.findFirst({
      where: {
        id: product?.ingredientId,
      },
    });

    const newQuantity = ingredient!.quantity - numberOfItems;

    await prisma.ingredient.update({
      where: {
        id: ingredient?.id,
      },
      data: {
        quantity: newQuantity,
      },
    });

    return res.status(200).json({ savedOrder });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
