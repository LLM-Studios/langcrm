import { prisma } from "@repo/database/prisma";
import { createClient } from "./server";

export async function getUser() {
	const supabase = createClient();
	const authId = (
		await supabase.auth.getUser().catch((err: Error) => {
			throw new Error("Error getting auth user", err);
		})
	).data.user?.id;
	const user = await prisma.user
		.findFirst({
			where: {
				authId,
			},
			include: {
				tokens: true,
				workspaces: true,
			},
		})
		.catch((err: Error) => {
			throw new Error("Error getting prisma user", err);
		});

	return user;
}

export async function getUserWorkspace() {
	const user = await getUser();
	const workspace = user?.workspaces[0];

	if (!workspace) {
		throw new Error("No workspace found for user");
	}

	return workspace;
}
