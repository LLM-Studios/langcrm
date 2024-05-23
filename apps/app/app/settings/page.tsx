"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Settings as SettingsIcon, DatabaseZap, Menu, Table2, Plus, Copy, Trash2, Check, X } from "lucide-react";
import { useState } from "react"
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog"

export default function Settings() {
  const [token, setToken] = useState("");

  async function handleGenerateToken() {
    console.log("Generate token");
    try {
      const response = await fetch("http://localhost:3000/token/local", {
        headers: {
          "Authorization": `Bearer ${process.env.API_URL}`,
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      setToken(data.token);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCopyToken() {
    console.log("Copy token");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(token).then(() => {
        console.log("Token copied to clipboard successfully!");
      }).catch(err => {
        console.error("Failed to copy token to clipboard", err);
      });
    } else {
      console.error("Clipboard API not available");
    }
  }

  function handleDeleteToken() {
    console.log("Delete token");
    setToken("");
  }

  return (
    <div className="min-h-screen w-full">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
          </div>
          <div className="grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] items-start">
            <nav className="text-sm text-gray-500 grid gap-4 dark:text-gray-400">
              <Link href="#" className="font-semibold text-gray-900 dark:text-gray-50" >Token</Link>
            </nav>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Token</CardTitle>
                  <CardDescription>Your API token</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <Input placeholder="LANGCRM_API_TOKEN" value={token} readOnly/>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-row gap-4 border-t p-6">
                    <Button className="flex flex-row gap-2" onClick={handleGenerateToken} disabled={token !== ""}>
                        <Plus className="h-4 w-4" />
                        Generate
                    </Button>
                    <Button variant={"outline"} className="flex flex-row gap-2" onClick={handleCopyToken} disabled={token === ""}>
                        <Copy className="h-4 w-4" />
                        Copy
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={"destructive"} className="flex flex-row gap-2" disabled={token === ""}>
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="flex flex-row gap-4 items-center">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction onClick={handleDeleteToken}>
                            <Check />
                          </AlertDialogAction>
                          <AlertDialogCancel>
                            <X />
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
  )
}

function Header() {
  return <header className="flex h-14 lg:h-[60px] items-center px-4 gap-4 border-b bg-gray-100/40 dark:bg-gray-800/40">
      <Link className="md:hidden" href="#">
          <DatabaseZap className="h-6 w-6" />
          <span className="sr-only">Home</span>
      </Link>
      <Link className="hidden md:flex items-center gap-2 font-semibold" href="#">
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
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      href="#"
                  >
                    <Table2 className="h-4 w-4" />
                      Data
                  </Link>
                  <Link
                      className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                      href="#"
                  >
                      <SettingsIcon className="h-4 w-4" />
                      Settings
                  </Link>
              </div>
          </nav>
      </div>
  </header>;
}