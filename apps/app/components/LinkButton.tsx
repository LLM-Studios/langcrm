"use client";

import { Button, ButtonProps } from "./ui/button";
import * as React from "react";

export default function LinkButton({
  children,
  url,
  ...props
}: {
  url: string | undefined;
  children: React.ReactNode;
} & ButtonProps) {
  return (
    <Button
      onClick={() => {
        if (url) {
          window.open(url, "_blank");
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
