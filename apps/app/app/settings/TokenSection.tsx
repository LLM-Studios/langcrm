"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import { Plus, Copy, Trash2, Check, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function TokenSection() {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  async function getToken() {
    setIsLoading(true);
    const response = await fetch("api/token");
    if (!response.ok) {
      throw new Error("Error getting token");
    }
    const data = await response.json();
    if (data.token) {
      setToken(data.token.value);
    }
    setIsLoading(false);
  }

  async function postToken() {
    setIsLoading(true);
    const response = await fetch("api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error generating token");
    }
    const data = await response.json();
    setToken(data.value);
    setIsLoading(false);
  }

  function copyToken() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(token).catch((err: Error) => {
        throw new Error("Error copying token to clipboard", err);
      });
    } else {
      console.error("Clipboard API not available");
    }
  }

  async function deleteToken() {
    setIsLoading(true);
    const response = await fetch("api/token", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error deleting token");
    }
    setToken("");
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token</CardTitle>
        <CardDescription>Your API token</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Input
            placeholder="LANGCRM_API_TOKEN"
            value={token}
            readOnly
            type="password"
          />
        </form>
      </CardContent>
      <CardFooter className="flex flex-row gap-4 border-t p-6">
        <Button
          className="flex flex-row gap-2"
          onClick={postToken}
          disabled={token !== "" || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Generate
        </Button>
        <Button
          variant={"outline"}
          className="flex flex-row gap-2"
          onClick={copyToken}
          disabled={token === ""}
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"destructive"}
              className="flex flex-row gap-2"
              disabled={token === ""}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="flex flex-row gap-4 items-center">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={deleteToken}>
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
  );
}
