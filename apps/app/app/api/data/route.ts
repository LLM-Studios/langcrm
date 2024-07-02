import { getUserWorkspace } from "@/lib/supabase/utils";
import { prisma } from "@repo/database/prisma";

export async function GET() {
	const workspace = await getUserWorkspace();
	const data = await prisma.value
		.findMany({
			where: {
				workspaceId: workspace!.id,
			},
			orderBy: {
				createdAt: "desc",
			},
			distinct: "keyId",
			include: {
				key: true,
			},
		})
		.catch((err: Error) => {
			return new Response(
				JSON.stringify({
					success: false,
					error: err,
				}),
				{
					status: 200,
					statusText: "Data not found",
				}
			);
		});
	return new Response(
		JSON.stringify({
			success: true,
			data,
		}),
		{
			status: 200,
			statusText: "Data found",
		}
	);
}
