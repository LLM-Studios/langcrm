import { apiFetch } from "@/lib/api";
import { getUser } from "@/lib/supabase/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUser();
  const token = user?.tokens[0]?.value;
  if (!token) {
    console.log("No token provided");
    return NextResponse.json(
      {
        success: false,
        error: "No token provided",
      },
      { status: 401 },
    );
  }
  return await apiFetch("/schema", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function POST(req: Request) {
  const user = await getUser();
  const token = user?.tokens[0]?.value;
  if (!token) {
    console.log("No token provided");
    return NextResponse.json(
      {
        success: false,
        error: "No token provided",
      },
      { status: 401 },
    );
  }
  const body = await req.json();
  return apiFetch("/schema", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

export async function PATCH(req: Request) {
  const user = await getUser();
  const token = user?.tokens[0]?.value;
  if (!token) {
    console.log("No token provided");
    return NextResponse.json(
      {
        success: false,
        error: "No token provided",
      },
      { status: 401 },
    );
  }
  const body = await req.json();
  return apiFetch("/schema/" + body.id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...body,
      id: undefined,
    }),
  });
}

export async function DELETE(req: Request) {
  const user = await getUser();
  const token = user?.tokens[0]?.value;
  if (!token) {
    console.log("No token provided");
    return NextResponse.json(
      {
        success: false,
        error: "No token provided",
      },
      { status: 401 },
    );
  }
  const { key } = await req.json();
  return apiFetch("/schema/" + key, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
