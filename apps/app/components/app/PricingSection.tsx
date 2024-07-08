/**
 * v0 by Vercel.
 * @see https://v0.dev/t/saoHaWq8vVL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LinkButton from "../LinkButton";

export default function PricingSection({ ...props }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" {...props}>
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="mx-auto grid max-w-2xl gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Pricing
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Choose the plan that works best for you.
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl gap-6 lg:grid-cols-2 lg:gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Hobby tier</CardTitle>
              <CardDescription>
                Perfect to get started with development.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <p>Bring your own OpenAI key</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <p>Max 100 user profiles</p>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <LinkButton url="#hero" className="w-full">
                Get started
              </LinkButton>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Standard tier</CardTitle>
              <CardDescription>
                Use our managed solution to get the most out of your data.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <p>No API keys required</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <p>No limitations</p>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}