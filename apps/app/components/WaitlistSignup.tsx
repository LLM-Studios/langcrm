"use client";

import { Loader2, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { prisma } from "@repo/database/prisma";
import { useState } from "react";

export default function WaitlistSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    setIsLoading(true);

    console.log("email", email);

    const response = await fetch("/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    if (data.success) {
      setEmail("");
    }

    setIsLoading(false);
  }

  return (
    <form className="flex items-center w-full gap-3">
      <Input
        className="flex-grow"
        placeholder="Enter your email"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="outline" className="flex gap-3" onClick={handleSubmit}>
        {isLoading ? (
          <Loader2 className="h-5 w-5" />
        ) : (
          <Mail className="h-5 w-5" />
        )}
        Join waitlist
      </Button>
    </form>
  );
}
