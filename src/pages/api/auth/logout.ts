import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    })
  );
  return res.status(200).json({ message: "Logged out" });
}
