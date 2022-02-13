import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json({
    id: req.query.id,
    message: "Not implemented yet."
  });
}
