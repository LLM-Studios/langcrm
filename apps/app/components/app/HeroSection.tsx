import LinkButton from "@/components/LinkButton";
import WaitlistSignup from "@/components/WaitlistSignup";
import { Calendar } from "lucide-react";

export default function HeroSection({ ...props }) {
  return (
    <section
      className="min-h-screen w-full flex items-center justify-center py-10 md:py-14 lg:py-18 xl:py-28"
      {...props}
    >
      <div className="container px-6 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_600px] lg:gap-14 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl">
                Powerful Insights from Every Conversation
              </h1>
              <p className="max-w-[650px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover insights to gain a deeper understanding of your
                customers’ preferences, behaviors, and needs, enhancing your
                ability to serve them effectively.
              </p>
            </div>
            <LinkButton
              url={process.env.NEXT_PUBLIC_DEMO_CALENDAR_URL}
              className="text-base font-medium flex gap-3"
            >
              <Calendar className="h-5 w-5" />
              Book a Demo
            </LinkButton>
            <div className="flex items-center gap-5">
              <WaitlistSignup />
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent">
              <iframe
                width="100%"
                height="100%"
                src={process.env.NEXT_PUBLIC_DEMO_VIDEO_URL}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
