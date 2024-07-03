import { getUser } from "@/lib/supabase/utils";
import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const user = await getUser();
  const workspaceId = user?.workspaces[0]?.id;
  if (!workspaceId) {
    return NextResponse.json(
      { error: "No workspaceId provided" },
      { status: 400 },
    );
  }
  const tokens = await prisma.token
    .findMany({
      where: {
        userId: user!.id,
        workspaceId,
      },
      select: {
        id: true,
        value: true,
        createdAt: true,
      },
    });
  if (!tokens) {
    return NextResponse.json(
      { error: "Tokens not found" },
      { status: 404 },
    );
  }
  return NextResponse.json(
    {
      tokens,
    },
    {
      status: 200,
      statusText: "Tokens found",
    },
  );
}

export async function POST() {
  const user = await getUser();
  const workspaceId = user?.workspaces[0]?.id;
  if (!workspaceId) {
    return NextResponse.json(
      { error: "No workspaceId provided" },
      { status: 400 },
    );
  }
  const response = await fetch(
    `${process.env.API_URL}/token/${process.env.DOPPLER_ENVIRONMENT}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
  );
  if (!response.ok) {
    return NextResponse.json(
      { error: "Error generating token" },
      { status: 500 },
    );
  }
  const data = await response.json();
  const token = await prisma.token
    .create({
      data: {
        value: data.token,
        userId: user!.id,
        workspaceId,
      },
    });
  if (!token) {
    return NextResponse.json(
      { error: "Token not created" },
      { status: 500 },
    );
  }
  return NextResponse.json(token, {
    status: 200,
  });
}

export async function DELETE() {
  const user = await getUser();
  const workspaceId = user?.workspaces[0]?.id;
  if (!workspaceId) {
    return NextResponse.json(
      { error: "No workspaceId provided" },
      { status: 400 },
    );
  }
  const token = await prisma.token
    .findFirst({
      where: {
        userId: user!.id,
        workspaceId,
      },
    });
  if (!token) {
    return NextResponse.json(
      { error: "Token not found" },
      { status: 404 },
    );
  }
  const deletedToken = await prisma.token
    .delete({
      where: {
        id: token.id,
      },
    });
  if (!deletedToken) {
    return NextResponse.json(
      { error: "Token not found" },
      { status: 404 },
    );
  }
  return NextResponse.json(
    {
      success: true,
      message: "Token deleted",
    },
    {
      status: 200,
      statusText: "Token deleted",
    },
  );
}
