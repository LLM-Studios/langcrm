"use client";

import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";

export default function DocumentationButton() {
  return (
    <Button
      className="hidden md:flex gap-3"
      variant="secondary"
      onClick={() => window.open(`${process.env.API_URL}/docs`, "_blank")}
    >
      <BookOpen className="h-5 w-5" />
      Documentation
    </Button>
  );
}
