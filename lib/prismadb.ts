import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient();

if (process.env.NODE_ENV === "production") {
  global.prismadb = client;
}

// Here we are storing prisma client in global because re-current creation of client due to nextjs Hot module reload.

export default client;
