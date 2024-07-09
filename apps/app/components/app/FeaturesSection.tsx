import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Filter, Lightbulb, ScatterChart } from "lucide-react";

export default function FeaturesSection({ ...props }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" {...props}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get to know your customers
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Gain deeper insights into the conversations with your users.{" "}
              <br />
              Understand their intentions by contextualizing them with a
              dynamically evolving profile.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-2xl items-start gap-8 py-12 lg:grid-cols-2 lg:gap-12">
          <Card>
            <CardHeader>
              <Lightbulb className="h-6 w-6" />
              <h3 className="text-xl font-bold">Insights</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Build a dynamic profile of your users based on the messages they
                send. Extract insights from every conversation on a per-user
                basis.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <ScatterChart className="h-6 w-6" />
              <h3 className="text-xl font-bold">Patterns</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Identify recurring patterns in the conversations with your
                users. Gather broader statistical insights across all users.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardTitle className="px-2 py-1">
              <Badge>Coming Soon</Badge>
            </CardTitle>
            <CardHeader>
              <Filter className="h-6 w-6" />
              <h3 className="text-xl font-bold">Filters</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Filter your data to focus on specific conversations or users.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardTitle className="px-2 py-1">
              <Badge>Coming Soon</Badge>
            </CardTitle>
            <CardHeader>
              <BarChart className="h-6 w-6" />
              <h3 className="text-xl font-bold">Charts</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Visualize your data with charts and graphs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
