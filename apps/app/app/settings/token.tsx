"use client"

import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Plus, Copy, Trash2, Check, X } from "lucide-react";
import { useState } from "react";

export default function Token() {
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
  return <Card>
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
    </Card>;
}

