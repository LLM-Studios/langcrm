import { getUser } from "@/lib/supabase/utils";
import { prisma } from "@repo/database/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUser();
  const workspaceId = user?.workspaces[0]?.id;
  if (!workspaceId) {
    return NextResponse.json(
      { error: "No workspaceId provided" },
      { status: 400 },
    );
  }
  const data = await prisma.value.findMany({
    where: {
      workspaceId: workspaceId,
    },
    orderBy: {
      createdAt: "desc",
    },
    distinct: "keyId",
    include: {
      key: true,
    },
  });
  if (!data) {
    return NextResponse.json(
      {
        success: false,
        error: "Data not found",
      },
      {
        status: 404,
      },
    );
  }
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      status: 200,
    },
  );
}
