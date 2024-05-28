import prisma from "@repo/database/prisma";
import { createClient } from "./server";

export async function getUserWorkspace() {
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
    })
    .catch((err: Error) => {
      throw new Error("Error getting prisma user", err);
    });
  const workspace = await prisma.workspace
    .findFirst({
      where: {
        users: {
          some: {
            id: user!.id,
          },
        },
      },
    })
    .catch((err: Error) => {
      throw new Error("Error getting workspace", err);
    });
  return { user, workspace };
}
