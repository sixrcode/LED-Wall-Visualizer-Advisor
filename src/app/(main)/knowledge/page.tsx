import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LibraryBig } from "lucide-react";

export const metadata = {
  title: "Knowledge Base | LED Wall Visualizer Advisor",
  description: "Essential tips and tricks for event visuals.",
};

const knowledgeItems = [
  { 
    title: "Vibrant & Balanced Colors for LED Walls", 
    description: "Leverage bright, saturated colors for eye-catching content, ensuring high contrast for visibility." 
  },
  { 
    title: "Camera Placement & Lighting for Interactive Visuals", 
    description: "Position cameras thoughtfully and ensure good lighting contrast for clear silhouettes and interactive effects." 
  },
  { 
    title: "Matching LED Wall Resolution & Aspect Ratio", 
    description: "Design visuals at the LED wall’s native resolution or aspect ratio to avoid blurriness or stretching." 
  },
  { 
    title: "Ensuring Smooth Motion & Transitions", 
    description: "Aim for fluid animations and subtle beat-synced movements; avoid overly rapid changes." 
  },
  { 
    title: "Rehearsal and Calibration Best Practices", 
    description: "Conduct dry runs with the LED wall to tweak audio sensitivity, interactive thresholds, and visual cues." 
  },
  { 
    title: "LED Brightness & Safety", 
    description: "Manage LED wall brightness for audience comfort, visual clarity, and equipment longevity." 
  },
  { 
    title: "Troubleshooting Common Visualizer Issues", 
    description: "Quick fixes for frequent problems with visualizer software and hardware connections." 
  },
];

export default function KnowledgePage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card className="shadow-2xl mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Knowledge Base</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Quick guides and best practices for stunning LED wall visuals. Markdown content will be editable via Firestore.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {knowledgeItems.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <LibraryBig className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </CardContent>
            {/* Future: Add a "Read More" button or make card clickable to show full Markdown content */}
          </Card>
        ))}
      </div>
       <p className="text-center mt-8 text-sm text-muted-foreground">
        More knowledge cards and detailed content coming soon!
      </p>
    </div>
  );
}
