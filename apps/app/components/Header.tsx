"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import {
  DatabaseZap,
  Menu,
  Table2,
  SettingsIcon,
  BookOpen,
  LogOut,
  Braces,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { createClient } from "@/lib/supabase/client";

export default function Header() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const items = [
    {
      icon: <BookOpen className="h-4 w-4" />,
      href: `${process.env.NEXT_PUBLIC_API_URL}/docs`,
      label: "Docs",
    },
    {
      icon: <Table2 className="h-4 w-4" />,
      href: "/data",
      label: "Data",
    },
    {
      icon: <Braces className="h-4 w-4" />,
      href: "/schema",
      label: "Schema",
    },
    {
      icon: <SettingsIcon className="h-4 w-4" />,
      href: "/settings",
      label: "Settings",
    },
  ];
  return (
    <header className="flex h-14 lg:h-[60px] items-center px-4 gap-4 border-b">
      <Link
        className="flex items-center gap-2 font-semibold"
        href="/data"
      >
        <DatabaseZap className="h-6 w-6" />
        <span className="hidden md:block">LangCRM</span>
      </Link>
      <div className="flex-1 overflow-auto py-2">
        <nav className="flex items-center justify-end text-sm font-medium gap-2">
          <ThemeToggle />
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="gap-2 p-2 rounded-lg" asChild>
                <Card>
                {items.map((item) => (
                    <DropdownMenuItem className="p-2" key={item.href}>
                      <Link
                        key={item.href}
                        className={`flex items-center gap-2`}
                        href={item.href}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                ))}
                </Card>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:flex md:flex-row gap-2">
            {items.map((item) => {
              const isPath = pathname === item.href;
              return (
                <Button key={item.href} variant={isPath ? "secondary" : "ghost"} asChild>
                  <Link
                    className={`flex items-center gap-2`}
                    href={item.href}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>
              );
            })}
            <Button
              variant={"destructive"}
              className="flex items-center gap-2"
              onClick={async () => {
                await supabase.auth.signOut();
                router.refresh();
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
