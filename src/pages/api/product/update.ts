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
    let { id, name, price, status } = req.body;

    price = Number(price);

    const savedProduct = await prisma.product.update({
      where: {
        id: id,
      },
      data: { name, price, status },
    });

    return res.status(200).json({ savedProduct });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
