import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function deleteProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const product = req.body;

    const savedProduct = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: { isActive: false },
    });

    return res.status(200).json({ savedProduct });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
