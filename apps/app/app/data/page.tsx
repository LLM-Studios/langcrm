import Link from "next/link";
import {
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  Settings as SettingsIcon,
  DatabaseZap,
  Menu,
  Table2,
} from "lucide-react";
import DataTable from "./DataTable";

export default function Data() {
  return (
    <div className="min-h-screen w-full">
      <header className="flex h-14 lg:h-[60px] items-center px-4 gap-4 border-b bg-gray-100/40 dark:bg-gray-800/40">
        <Header />
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <DataTable />
      </main>
    </div>
  );
}

function Header() {
  return (
    <>
      <Link className="md:hidden" href="#">
        <DatabaseZap className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </Link>
      <Link
        className="hidden md:flex items-center gap-2 font-semibold"
        href="#"
      >
        <DatabaseZap className="h-6 w-6" />
        <span className="">LangCRM</span>
      </Link>
      <div className="flex-1 overflow-auto py-2">
        <nav className="flex items-center justify-end text-sm font-medium">
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
          <div className="hidden md:flex md:flex-row">
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/data"
            >
              <Table2 className="h-4 w-4" />
              Data
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/settings"
            >
              <SettingsIcon className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
