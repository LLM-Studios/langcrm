"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Code, Terminal } from "lucide-react";
import LinkButton from "@/components/LinkButton";
import Image from "next/image";

export default function PreviewSection({ ...props }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" {...props}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Preview
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Easy to integrate
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Integrate our service into your existing workflows with ease.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-xl py-12">
          <Card>
            <CardHeader>
              <Code className="h-6 w-6" />
              <h3 className="text-xl font-bold">REST API</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Just one request to our API and we'll handle the rest.
              </p>
            </CardContent>
            <CardContent>
              <Image
                className="rounded-lg shadow-xl"
                src="/images/curl.png"
                alt="Curl command to ingest data"
                width={1000}
                height={500}
              />
            </CardContent>
            <CardFooter>
              <LinkButton url="https://langcrm.com/docs" className="gap-2">
                <Terminal className="h-4 w-4" />
                Documentation
              </LinkButton>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
