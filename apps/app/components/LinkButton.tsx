"use client";

import { Button } from "./ui/button";
import * as React from "react";

export default function LinkButton({
  children,
  url,
  className,
}: {
  url: string | undefined;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      className={className}
      onClick={() => {
        if (url) {
          window.open(url, "_blank");
        }
      }}
    >
      {children}
    </Button>
  );
}
