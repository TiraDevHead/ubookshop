// This is an example of how to access a session from an API route
import type { NextApiRequest, NextApiResponse } from "next"



export default async (req: NextApiRequest, res: NextApiResponse) => {
  let body = JSON.parse(req.body)
  await db.collection("cart").deleteMany({})
  let books = body.map(b => {
    return { title: b }
  })
  if (books.length >= 1) {
    await db.collection("cart").insertMany(books)
  }


  res.send({ code: 0, cdn: process.env.CDN, pong: true })
  }
