import ValuesTable from "./ValuesTable";
import { createServerComponentClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

export default async function Data() {
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
        <ValuesTable />
      </main>
    </div>
  );
}