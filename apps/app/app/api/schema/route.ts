import { logger } from "@/lib/logger";
import { getUserWorkspace } from "@/lib/supabase/utils";
import prisma from "@repo/database/prisma";

export async function GET() {
    const { workspace } = await getUserWorkspace();
    const keys = await prisma.key.findMany({
        where: {
            workspaceId: workspace!.id
        }
    })
    .catch((err: Error) => {
        console.log(err);
      return new Response(
        JSON.stringify({
          error: err,
        }),
        {
          status: 200,
          statusText: "Keys not found",
        },
      );
    });
    return new Response(JSON.stringify(keys), {
        status: 200,
        statusText: "Keys found",
    });
}

export async function POST(req: Request) {
    const { workspace } = await getUserWorkspace();
    const { key, description, type, priority,  } = await req.json();
    const schema = await prisma.key.create({
        data: {
            id: key,
            description,
            type,
            priority,
            workspaceId: workspace!.id,
            
            }
    })
    .catch((err: Error) => {
        console.log(err);
        return new Response(
          JSON.stringify({
            error: err,
          }),
          {
            status: 200,
            statusText: "Key not created",
          },
        );
    });
    return new Response(JSON.stringify(schema), {
        status: 200,
        statusText: "Key created",
    });
}

export async function DELETE(req: Request) {
    const { workspace } = await getUserWorkspace();
    const { key } = await req.json();
    const schema = await prisma.key.delete({
        where: {
            id: key,
            workspaceId: workspace!.id,
        }
    })
    .catch((err: Error) => {
        console.log(err);
        return new Response(
          JSON.stringify({
            error: err,
          }),
          {
            status: 200,
            statusText: "Key not deleted",
          },
        );
    });
    return new Response(JSON.stringify(schema), {
        status: 200,
        statusText: "Key deleted",    });
}