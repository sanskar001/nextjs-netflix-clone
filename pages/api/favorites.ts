import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const {
      currentUser: { favoriteIds = [] },
    } = await serverAuth(req);

    if (!favoriteIds.length) {
      return res.status(200).json([]);
    }

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: favoriteIds,
        },
      },
    });

    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log("Favorites Api", error);
    return res.status(400).end();
  }
}
