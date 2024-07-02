import { prisma } from "@repo/database/prisma";

export async function POST(req: Request) {
	const { email } = await req.json();

	console.log("email", email);

	await prisma.user
		.create({
			data: {
				authId: "-",
				email,
				status: "WAITLIST",
			},
		})
		.catch((err: Error) => {
			throw new Error(err.message, err);
		});

	return new Response(
		JSON.stringify({
			success: true,
			message: "User created",
		}),
		{ status: 200, statusText: "User created" }
	);
}
