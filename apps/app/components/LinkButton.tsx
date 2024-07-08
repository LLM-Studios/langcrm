"use client";

import { Button, ButtonProps } from "./ui/button";
import * as React from "react";

export default function LinkButton({
  children,
  url,
  newWindow = false,
  ...props
}: {
  url: string | undefined;
  children: React.ReactNode;
  newWindow?: boolean;
} & ButtonProps) {
  return (
    <Button
      onClick={() => {
        if (url) {
          window.open(url, newWindow ? "_blank" : "_self");
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
