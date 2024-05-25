import Link from "next/link";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardContent, Card } from "@/components/ui/card";
import { BookOpen, Calendar, DatabaseZap, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div key="1" className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center gap-2 font-semibold" href="/data">
          <DatabaseZap className="h-6 w-6" />
          <span className="">LangCRM</span>
        </Link>
        <nav className="hidden lg:flex gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Customers
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
        </nav>
        <div className="flex gap-2">
          <ThemeToggle />
          <Button className="hidden md:flex gap-2" variant="secondary">
            <BookOpen className="h-4 w-4" />
            Documentation
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16 xl:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock the Power of Conversational CRM
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Streamline your sales and support workflows with our
                    AI-powered CRM platform. Engage customers, automate tasks,
                    and drive growth.
                  </p>
                </div>
                <Button className="text-base font-medium flex gap-2">
                  <Calendar className="h-4 w-4" />
                  Book a Demo
                </Button>
                <div className="flex items-center gap-4">
                  <form className="flex items-center w-full gap-2">
                    <Input
                      className="flex-grow"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button variant="outline" className="flex gap-2">
                      <Mail className="h-4 w-4" />
                      Get in Touch
                    </Button>
                  </form>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 lg:py-16 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful Features for Your Business
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our AI-powered CRM platform offers a suite of features to
                  streamline your sales and support workflows.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-8 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Conversational AI
                </div>
                <h3 className="text-2xl font-bold">Intelligent Chatbots</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Engage customers with AI-powered chatbots that understand
                  natural language and provide personalized responses.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Automation
                </div>
                <h3 className="text-2xl font-bold">Streamlined Workflows</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Automate repetitive tasks and sales processes to increase
                  efficiency and free up your team to focus on high-value
                  activities.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Analytics
                </div>
                <h3 className="text-2xl font-bold">Insightful Reporting</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Gain valuable qualitative insights into your customer
                  interactions and sales performance with our robust reporting
                  and analytics tools.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from businesses that have transformed their sales and
                  support operations with our CRM platform.
                </p>
              </div>
              <div className="mx-auto max-w-2xl grid gap-6 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                <Card className="bg-white dark:bg-gray-950 shadow-lg rounded-lg">
                  <CardContent className="space-y-4">
                    <blockquote className="text-lg font-semibold leading-snug">
                      "The conversational AI chatbot has been a game-changer for
                      our customer support. It's able to handle a wide range of
                      inquiries and frees up our team to focus on more complex
                      issues."
                    </blockquote>
                    <div className="flex items-center justify-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          alt="Avatar"
                          src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">Jane Doe</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          CEO, Acme Inc.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-950 shadow-lg rounded-lg">
                  <CardContent className="space-y-4">
                    <blockquote className="text-lg font-semibold leading-snug">
                      "The automation features in the CRM have helped us
                      streamline our sales process and increase our conversion
                      rates. The reporting tools give us valuable insights to
                      optimize our strategy."
                    </blockquote>
                    <div className="flex items-center justify-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          alt="Avatar"
                          src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">John Doe</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Sales Manager, Acme Inc.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 lg:py-16 bg-white dark:bg-[#0f172a]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Pricing
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our Conversational CRM platform is available at a competitive
                  price. Get a quote to find the best plan for your business.
                </p>
              </div>
              <Button
                className="px-8 py-2 text-base font-medium rounded-md"
                variant="secondary"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Transform Your Business?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Book a demo with our sales team to see how our Conversational
                CRM platform can streamline your sales and support workflows.
              </p>
            </div>
            <Button
              className="px-8 py-2 text-base font-medium rounded-md"
              variant="secondary"
            >
              Book a Demo
            </Button>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Conversational CRM. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Imprint
          </Link>
        </nav>
      </footer>
    </div>
  );
}
