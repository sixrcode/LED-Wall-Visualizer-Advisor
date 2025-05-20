import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker } from "lucide-react";

export const metadata = {
  title: "Live Preview | LED Wall Visualizer Advisor",
  description: "Test your visualizers in a live sandbox environment.",
};

export default function PreviewPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Live Preview Sandbox</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Test drive visualizers with your mic/line-in audio before going live.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-10 text-center">
          <Beaker className="h-16 w-16 text-cyan-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Sandbox Experimentation Zone</h3>
          <p className="text-muted-foreground">
            The Live Preview Sandbox is currently under development. Soon, you'll be able to:
          </p>
          <ul className="list-disc list-inside text-left mt-4 text-muted-foreground space-y-1">
            <li>Stream microphone or line-in audio via Web Audio API.</li>
            <li>Embed visualizers like Butterchurn or custom p5.js sketches.</li>
            <li>Quickly test proof-of-concept visuals.</li>
            <li>Toggle a full-screen "LED feed" mode for a second monitor.</li>
          </ul>
           <p className="mt-4 text-muted-foreground">
            Stay tuned for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
