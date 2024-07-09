import Link from "next/link";
import { BookOpen, DatabaseZap, LogIn } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LinkButton from "@/components/LinkButton";
import {
  FeaturesSection,
  HeroSection,
  PreviewSection,
  PricingSection,
} from "@/components/app";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3001";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "LangCRM - Conversational insights",
  description: "Get structured insights from your conversations",
};

export default function Home() {
  return (
    <div key="1" className="flex flex-col min-h-[100dvh]">
      <Header />
      <main>
        <HeroSection id="hero" />
        <FeaturesSection id="features" />
        <PreviewSection id="preview" />
        <PricingSection id="pricing" />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="px-6 lg:px-8 h-16 flex items-center justify-between">
      <Link className="flex items-center gap-3 font-semibold" href="#">
        <DatabaseZap className="h-7 w-7" />
        <span className="">LangCRM</span>
      </Link>
      <div className="flex gap-3">
        <ThemeToggle />
        <LinkButton
          url={`${process.env.NEXT_PUBLIC_API_URL}/../docs`}
          className="hidden md:flex gap-3"
          variant="outline"
          newWindow
        >
          <BookOpen className="h-5 w-5" />
          Docs
        </LinkButton>
        <LinkButton
          url="/login"
          className="hidden md:flex gap-3"
          variant="default"
        >
          <LogIn className="h-5 w-5" />
          Login
        </LinkButton>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col gap-3 sm:flex-row py-6 w-full shrink-0 items-center px-6 md:px-8 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 LLM Studios. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-6 sm:gap-8">
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
  );
}
