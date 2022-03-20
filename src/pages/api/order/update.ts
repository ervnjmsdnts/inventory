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

    const savedOrder = await prisma.order.update({
      where: {
        id: id,
      },
      data: { customerName, productId, numberOfItems },
    });

    return res.status(200).json({ savedOrder });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
