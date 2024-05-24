import prisma from "@repo/database/prisma";
import { createServerComponentClient } from "@/lib/supabase/server-client";

export async function getUserWorkspace() {
    const supabase = createServerComponentClient();
    const authId = (await supabase.auth.getUser().catch((err) => {
        throw new Error("Error getting auth user", err);
    })).data.user?.id;
    const user = await prisma.user.findFirst({
        where: {
            authId
        }
    }).catch((err) => {
        throw new Error("Error getting prisma user", err);
    });
    const workspace = await prisma.workspace.findFirst({
        where: {
            users: {
                some: {
                    id: user!.id
                }
            }
        }
    }).catch((err) => {
        throw new Error("Error getting workspace", err);
    });
    return { user, workspace };
}

export async function GET() {
    const { user, workspace } = await getUserWorkspace();
    const token = await prisma.token.findFirst({
        where: {
            userId: user!.id,
            workspaceId: workspace!.id
        }
    }).catch((err) => {
        return new Response(
            JSON.stringify({
                success: false,
                error: err
            }), {
                status: 200,
                statusText: "Token not found",
            }
        );
    });
    return new Response(
        JSON.stringify({
            success: true,
            token
        }), {
            status: 200,
            statusText: "Token found"
        }
    );
}

export async function POST() {
    const { user, workspace } = await getUserWorkspace();
    const response = await fetch("http://localhost:3000/token/local", {
      headers: {
        "Authorization": `Bearer ${process.env.API_URL}`,
      },
    }).catch((err) => {
        throw new Error("Error generating token", err);
    });
    const data = await response.json();
    const token = await prisma.token.create({
      data: {
        value: data.token,
        userId: user!.id,
        workspaceId: workspace!.id
      }
    }).catch((err) => {
        throw new Error("Error creating token", err);
    });
    return new Response(
        JSON.stringify(token), {
            status: 200,
            statusText: "Token created"
        }
    );
}

export async function DELETE() {
    const { user, workspace } = await getUserWorkspace();
    const token = await prisma.token.findFirst({
        where: {
            userId: user!.id,
            workspaceId: workspace!.id
        }
    }).catch((err) => {
        throw new Error("Error getting token", err);
    });
    await prisma.token.delete({
        where: {
            id: token!.id
        }
    }).catch((err) => {
        throw new Error("Error deleting token", err);
    });
    return new Response(
        JSON.stringify({
            success: true,
            message: "Token deleted"
        }), {
            status: 200,
            statusText: "Token deleted"
        }
    );
}
