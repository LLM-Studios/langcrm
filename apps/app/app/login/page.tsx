import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@repo/database/prisma";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(`/login?message=${error.message}`);
    }

    return redirect("/settings");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect(`/login?message=${error.message}`);
    }

    if (!data.user) {
      throw new Error("User not found");
    }

    await prisma.user
      .create({
        data: {
          authId: data.user.id,
          email,
          workspaces: {
            create: {
              name: `${data.user.email?.split("@")[0]}'s Workspace`,
            },
          },
        },
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Error creating user");
      })
      .then(() => {
        return redirect("/settings");
      });
  };

  return (
    <form className="h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="jane@doe.com"
              required
              type="email"
            />
          </div>
          <div className="relative grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" required type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <SubmitButton className="w-full" formAction={signIn}>
            Sign in
          </SubmitButton>
          <SubmitButton
            className="w-full"
            variant="outline"
            formAction={signUp}
          >
            Sign up
          </SubmitButton>
          <p className="text-red-500 m-2">{searchParams.message}</p>
        </CardFooter>
      </Card>
    </form>
  );
}
