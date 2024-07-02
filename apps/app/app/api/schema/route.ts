import { apiFetch } from "@/lib/api";
import { getUser, getUserWorkspace } from "@/lib/supabase/utils";
import { NextResponse } from "next/server";

export async function GET() {
	const user = await getUser();
	return apiFetch("/schema", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${user?.tokens[0]?.value}`,
		},
	}).catch((err: Error) => {
		return NextResponse.json(
			{ error: "Could not fetch keys" },
			{ status: 500 }
		);
	});
}

export async function POST(req: Request) {
	const user = await getUser();
	const { id, description, type, priority, tags } = await req.json();
	console.log(
		"body",
		JSON.stringify({
			id,
			description,
			type,
			priority,
			tags,
		})
	);

	return apiFetch("/schema", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${user?.tokens[0]?.value}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id,
			description,
			type,
			priority,
			tags,
		}),
	});
}

export async function PATCH(req: Request) {
	const user = await getUser();
	const { id, description, type, priority, tags } = await req.json();

	return apiFetch("/schema/" + id, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${user?.tokens[0]?.value}`,
		},
		body: JSON.stringify({
			description,
			type,
			priority,
			tags,
		}),
	});
}

export async function DELETE(req: Request) {
	const user = await getUser();
	const { key } = await req.json();

	return apiFetch("/schema/" + key, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${user?.tokens[0]?.value}`,
			"Content-Type": "application/json",
		},
	});
}
