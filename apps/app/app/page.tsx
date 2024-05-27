import Link from "next/link";
import { Calendar, DatabaseZap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import DocumentationButton from "@/components/DocumentationButton";
import LinkButton from "@/components/LinkButton";

export default function Home() {
  return (
    <div key="1" className="flex flex-col min-h-[100dvh]">
      <header className="px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link className="flex items-center gap-3 font-semibold" href="#">
          <DatabaseZap className="h-7 w-7" />
          <span className="">LangCRM</span>
        </Link>
        {/* <nav className="hidden lg:flex gap-8">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#customers"
          >
            Customers
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#contact"
          >
            Contact
          </Link>
        </nav> */}
        <div className="flex gap-3">
          <ThemeToggle />
          <DocumentationButton />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full py-10 md:py-14 lg:py-18 xl:py-28">
          <div className="container px-6 md:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_600px] lg:gap-14 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl">
                    Powerful Insights from Every Interaction
                  </h1>
                  <p className="max-w-[650px] text-gray-500 md:text-xl dark:text-gray-400">
                    Discover insights to gain a deeper understanding of your
                    customers’ preferences, behaviors, and needs, enhancing your
                    ability to serve them effectively.
                  </p>
                </div>
                <LinkButton
                  className="text-base font-medium flex gap-3"
                  url={process.env.DEMO_CALENDAR_URL}
                >
                  <Calendar className="h-5 w-5" />
                  Book a Demo
                </LinkButton>
                {/* <div className="flex items-center gap-5">
                  <form className="flex items-center w-full gap-3">
                    <Input
                      className="flex-grow"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button variant="outline" className="flex gap-3">
                      <Mail className="h-5 w-5" />
                      Join waitlist
                    </Button>
                  </form>
                </div> */}
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent">
                  <iframe
                    width="100%"
                    height="100%"
                    src={process.env.DEMO_VIDEO_URL}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section id="features" className="w-full py-10 md:py-14 lg:py-18 bg-white dark:bg-gray-900">
          <div className="container px-6 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                  Powerful Features for Your Business
                </h2>
                <p className="max-w-[950px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our AI-powered CRM platform offers a suite of features to
                  streamline your sales and support workflows.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-8 py-10 lg:grid-cols-3 lg:gap-14">
              <div className="flex flex-col justify-center space-y-6 text-center">
                <div className="inline-block rounded-lg bg-gray-100 px-4 py-2 text-sm dark:bg-gray-800">
                  Conversational AI
                </div>
                <h3 className="text-3xl font-bold">Intelligent Chatbots</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Engage customers with AI-powered chatbots that understand
                  natural language and provide personalized responses.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-6 text-center">
                <div className="inline-block rounded-lg bg-gray-100 px-4 py-2 text-sm dark:bg-gray-800">
                  Automation
                </div>
                <h3 className="text-3xl font-bold">Streamlined Workflows</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Automate repetitive tasks and sales processes to increase
                  efficiency and free up your team to focus on high-value
                  activities.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-6 text-center">
                <div className="inline-block rounded-lg bg-gray-100 px-4 py-2 text-sm dark:bg-gray-800">
                  Analytics
                </div>
                <h3 className="text-3xl font-bold">Insightful Reporting</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Gain valuable qualitative insights into your customer
                  interactions and sales performance with our robust reporting
                  and analytics tools.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="customers" className="w-full py-10 md:py-14 lg:py-18">
          <div className="container px-6 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                  What Our Customers Say
                </h2>
                <p className="max-w-[950px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from businesses that have transformed their sales and
                  support operations with our CRM platform.
                </p>
              </div>
              <div className="mx-auto max-w-3xl grid gap-8 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                <Card className="bg-white dark:bg-gray-950 shadow-lg rounded-lg">
                  <CardContent className="space-y-6">
                    <blockquote className="text-xl font-semibold leading-snug">
                      "The conversational AI chatbot has been a game-changer for
                      our customer support. It's able to handle a wide range of
                      inquiries and frees up our team to focus on more complex
                      issues."
                    </blockquote>
                    <div className="flex items-center justify-center space-x-6">
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
                  <CardContent className="space-y-6">
                    <blockquote className="text-xl font-semibold leading-snug">
                      "The automation features in the CRM have helped us
                      streamline our sales process and increase our conversion
                      rates. The reporting tools give us valuable insights to
                      optimize our strategy."
                    </blockquote>
                    <div className="flex items-center justify-center space-x-6">
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
        <section id="pricing" className="w-full py-10 md:py-14 lg:py-18 bg-white dark:bg-gray-900">
          <div className="container px-6 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                  Pricing
                </h2>
                <p className="max-w-[950px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our Conversational CRM platform is available at a competitive
                  price. Get a quote to find the best plan for your business.
                </p>
              </div>
              <Button
                className="px-10 py-3 text-base font-medium rounded-md"
                variant="secondary"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-10 md:py-14 lg:py-18 bg-gray-100 dark:bg-gray-950">
          <div className="container px-6 md:px-8 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                Ready to Transform Your Business?
              </h2>
              <p className="max-w-[950px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Book a demo with our sales team to see how our Conversational
                CRM platform can streamline your sales and support workflows.
              </p>
            </div>
            <Button
              className="px-10 py-3 text-base font-medium rounded-md"
              variant="secondary"
            >
              Book a Demo
            </Button>
          </div>
        </section> */}
      </main>
      <footer className="flex flex-col gap-3 sm:flex-row py-6 w-full shrink-0 items-center px-6 md:px-8 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 LLM Studios. All rights reserved.
        </p>
        {/* <nav className="sm:ml-auto flex gap-6 sm:gap-8">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Imprint
          </Link>
        </nav> */}
      </footer>
    </div>
  );
}
