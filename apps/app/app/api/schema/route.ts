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
  const response = await apiFetch("/schema", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return NextResponse.json(await response.json());
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
  const response = await apiFetch("/schema", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await response.json());
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
  const response = await apiFetch("/schema/" + body.id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...body,
      id: undefined,
    }),
  });
  return NextResponse.json(await response.json());
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
  const response = await apiFetch("/schema/" + key, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return NextResponse.json(await response.json());
}
