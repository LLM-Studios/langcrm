import { PrismaClient } from "@prisma/client";
import supabase from "../supabase/admin";
import { parseArgs } from "util";
import * as jose from "jose";

const prisma = new PrismaClient();

async function main() {
	await supabase.auth.admin
		.createUser({
			email: "admin@llmstudios.de",
			email_confirm: true,
			password: "admin",
		})
		.catch((e) => {
			console.warn(e);
		});

	const adminAuthUser = await supabase.auth.admin
		.listUsers({
			perPage: 100,
		})
		.then((res) => {
			console.log(res.data.users);

			return res.data.users.find(
				(user) => user.email === "admin@llmstudios.de"
			);
		});

	if (!adminAuthUser || !adminAuthUser.email) {
		throw new Error("Admin user not found");
	}

	const admin = await prisma.user.upsert({
		where: { authId: adminAuthUser.id },
		update: {},
		create: {
			authId: adminAuthUser.id,
			email: adminAuthUser.email,
			role: "ADMIN",
			workspaces: {
				connectOrCreate: {
					where: {
						id: "admin",
						name: "test",
					},
					create: {
						id: "admin",
						name: "test",
					},
				},
			},
		},
	});

	const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "secret");
	const jwt = await new jose.SignJWT({
		id: "admin",
		createdAt: new Date().toISOString(),
	})
		.setProtectedHeader({ alg: "HS256" })
		.sign(SECRET);

	const token = await prisma.token.upsert({
		where: {
			id: "admin",
		},
		update: {},
		create: {
			userId: admin.id,
			value: jwt,
			workspaceId: "admin",
			id: "admin",
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
