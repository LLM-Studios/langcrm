import { getUserWorkspace } from "@/lib/supabase/utils";
import { Token, prisma } from "@repo/database/prisma";

export async function GET() {
	const { user, workspace } = await getUserWorkspace();
	const tokens = await prisma.token
		.findMany({
			where: {
				userId: user!.id,
				workspaceId: workspace!.id,
			},
			select: {
				id: true,
				value: true,
				createdAt: true,
			},
		})
		.catch((err: Error) => {
			throw new Error(
				JSON.stringify({
					error: err,
				})
			);
		});
	return new Response(
		JSON.stringify({
			tokens,
		}),
		{
			status: 200,
			statusText: "Tokens found",
		}
	);
}

export async function POST() {
	const { user, workspace } = await getUserWorkspace();
	const response = await fetch(
		`${process.env.API_URL}/token/${process.env.DOPPLER_ENVIRONMENT}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.API_KEY}`,
			},
		}
	).catch((err: Error) => {
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
		}
	);
}
