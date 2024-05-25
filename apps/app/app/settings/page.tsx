import Link from "next/link";
import TokenSection from "./TokenSection";
import { createServerComponentClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";


export default async function Settings() {
  const supabase = createServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Main />
      </main>
    </div>
  );
}

function Main() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start">
        <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
          <Link
            href="#"
            className="font-semibold text-gray-900 dark:text-gray-50"
          >
            Token
          </Link>
          <Link
            href="#"
            className="font-semibold text-gray-900 dark:text-gray-50"
          >
            Help
          </Link>
        </nav>
        <div className="grid gap-6">
          <TokenSection />
          <HelpSection />
        </div>
      </div>
    </>
  );
}

export function HelpSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Help</CardTitle>
        <CardDescription>Get in touch with the team</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant={"secondary"}
          className="flex flex-row gap-2"
        >
          <Mail className="h-4 w-4" />
          Contact
        </Button>
      </CardContent>
    </Card>
  );
}