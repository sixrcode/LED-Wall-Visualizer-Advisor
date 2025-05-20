import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Setup Wizard | LED Wall Visualizer Advisor",
  description: "Step-by-step configuration for your chosen visualizer tool.",
};

export default function WizardPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Setup Wizard</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Configure your visualizer tool step-by-step for a flawless performance.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-10 text-center">
           <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Wizard Under Construction</h3>
          <p className="text-muted-foreground">
            This interactive setup wizard is coming soon! It will guide you through:
          </p>
          <ul className="list-disc list-inside text-left mt-4 text-muted-foreground space-y-1">
            <li>Selecting your visualizer tool</li>
            <li>Audio routing configuration</li>
            <li>Matching display resolution</li>
            <li>Color and pattern testing</li>
            <li>Performance (FPS) checks</li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            Progress will be saved automatically.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
