import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function deleteOrder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const order = req.body;

    const savedOrder = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: { isActive: false },
    });

    return res.status(200).json({ savedOrder });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
