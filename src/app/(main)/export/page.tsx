import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, DownloadCloud } from "lucide-react";

export const metadata = {
  title: "Export Run-of-Show | LED Wall Visualizer Advisor",
  description: "Generate a PDF summary of your event's visual setup.",
};

export default function ExportPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">Export Run-of-Show PDF</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Generate a comprehensive PDF document summarizing your chosen tool, settings, and fallback plans.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-10 text-center">
          <FileText className="h-16 w-16 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">One-Click PDF Export</h3>
          <p className="text-muted-foreground mb-6">
            This feature will allow you to download a "Run-of-Show" PDF. It will include:
          </p>
          <ul className="list-disc list-inside text-left mt-4 text-muted-foreground space-y-1 mb-8">
            <li>Chosen visualizer tool details</li>
            <li>Key configuration settings</li>
            <li>Audio/Video input setup</li>
            <li>Resolution and performance notes</li>
            <li>Fallback plan information</li>
          </ul>
          <Button size="lg" disabled> {/* TODO: Enable when functionality is ready */}
            <DownloadCloud className="mr-2 h-5 w-5" />
            Generate & Download PDF (Coming Soon)
          </Button>
           <p className="mt-6 text-sm text-muted-foreground">
            PDF generation using <code>@react-pdf/renderer</code> is planned.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
