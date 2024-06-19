"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
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
      <Link className="md:hidden" href="#">
        <DatabaseZap className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <Link
        className="hidden md:flex items-center gap-2 font-semibold"
        href="/data"
      >
        <DatabaseZap className="h-6 w-6" />
        <span className="">LangCRM</span>
      </Link>
      <div className="flex-1 overflow-auto py-2">
        <nav className="flex items-center justify-end text-sm font-medium gap-2">
          <ThemeToggle />
          <div className="md:hidden rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Menu className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link className="flex flex-row gap-4 p-2" href="#">
                    <Table2 className="h-4 w-4" />
                    Data
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link className="flex flex-row gap-4 p-2" href="#">
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:flex md:flex-row gap-2">
            {items.map((item) => {
              const isPath = pathname === item.href;
              return (
                <Button variant={isPath ? "secondary" : "ghost"} asChild>
                  <Link
                    key={item.href}
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
