import Link from "next/link";
import TokenSection from "./TokenSection";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import LinkButton from "@/components/LinkButton";

export default async function Settings() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen w-full">
      <Header />
      <Main />
    </div>
  );
}

function Main() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start">
        <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
          <Link
            href="#token"
            className="font-semibold text-gray-900 dark:text-gray-50"
          >
            Token
          </Link>
          <Link
            href="#help"
            className="font-semibold text-gray-900 dark:text-gray-50"
          >
            Help
          </Link>
        </nav>
        <div className="grid gap-6">
          <TokenSection id="token" />
          <HelpSection id="help" />
        </div>
      </div>
    </main>
  );
}

function HelpSection({ ...props }) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Help</CardTitle>
        <CardDescription>Get in touch with the team</CardDescription>
      </CardHeader>
      <CardContent>
        <LinkButton
          url="mailto:support@langcrm.com"
          variant={"secondary"}
          className="flex flex-row gap-2"
        >
          <Mail className="h-4 w-4" />
          Contact
        </LinkButton>
      </CardContent>
    </Card>
  );
}
