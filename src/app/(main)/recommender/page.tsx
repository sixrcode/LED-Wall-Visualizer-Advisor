import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ToolRecommenderClient from "./ToolRecommenderClient";

export const metadata = {
  title: "Tool Recommender | LED Wall Visualizer Advisor",
  description: "Get AI-powered recommendations for visualizer tools.",
};

export default function RecommenderPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Find Your Perfect Visualizer</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Tell us about your event, and our AI will recommend the best free/open-source tools for your LED wall.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToolRecommenderClient />
        </CardContent>
      </Card>
    </div>
  );
}
