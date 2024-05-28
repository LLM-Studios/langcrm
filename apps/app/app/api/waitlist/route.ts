import { logger } from "@/lib/logger";
import prisma from "@repo/database/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();

  await prisma.user
    .create({
      data: {
        authId: "-",
        email,
        status: "WAITLIST",
      },
    })
    .catch((err: Error) => {
      logger.error(err);
      throw new Error(err.message, err);
    });

  return new Response(
    JSON.stringify({
      success: true,
      message: "User created",
    }),
    { status: 200, statusText: "User created" },
  );
}
