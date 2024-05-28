import prisma from "@repo/database/prisma";
import { getUserWorkspace } from "@/lib/supabase/utils";

export async function GET() {
  const { user, workspace } = await getUserWorkspace();
  const token = await prisma.token
    .findFirst({
      where: {
        userId: user!.id,
        workspaceId: workspace!.id,
      },
    })
    .catch((err: Error) => {
      return new Response(
        JSON.stringify({
          error: err,
        }),
        {
          status: 200,
          statusText: "Token not found",
        },
      );
    });
  return new Response(
    JSON.stringify({
      token,
    }),
    {
      status: 200,
      statusText: "Token found",
    },
  );
}

export async function POST() {
  const { user, workspace } = await getUserWorkspace();
  const response = await fetch(`${process.env.API_URL}/token/local`, {
    headers: {
      Authorization: `Bearer ${process.env.API_URL}`,
    },
  }).catch((err: Error) => {
    throw new Error("Error generating token", err);
  });
  const data = await response.json();
  const token = await prisma.token
    .create({
      data: {
        value: data.token,
        userId: user!.id,
        workspaceId: workspace!.id,
      },
    })
    .catch((err: Error) => {
      throw new Error("Error creating token", err);
    });
  return new Response(JSON.stringify(token), {
    status: 200,
    statusText: "Token created",
  });
}

export async function DELETE() {
  const { user, workspace } = await getUserWorkspace();
  const token = await prisma.token
    .findFirst({
      where: {
        userId: user!.id,
        workspaceId: workspace!.id,
      },
    })
    .catch((err: Error) => {
      throw new Error("Error getting token", err);
    });
  await prisma.token
    .delete({
      where: {
        id: token!.id,
      },
    })
    .catch((err: Error) => {
      throw new Error("Error deleting token", err);
    });
  return new Response(
    JSON.stringify({
      success: true,
      message: "Token deleted",
    }),
    {
      status: 200,
      statusText: "Token deleted",
    },
  );
}
