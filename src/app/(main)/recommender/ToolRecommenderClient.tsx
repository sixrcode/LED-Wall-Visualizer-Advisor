"use client";

import type { RankToolsInput, RankToolsOutput } from '@/ai/flows/rank-tools';
import { rankTools as rankToolsAction } from '@/ai/flows/rank-tools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Download, ExternalLink, CheckCircle, XCircle, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  eventType: z.string().min(1, 'Event type is required.'),
  techConstraints: z.string().min(1, 'Technical constraints are required.'),
  desiredInputs: z.string().min(1, 'Desired inputs are required.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ToolRecommenderClient() {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<RankToolsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventType: 'Silent Disco',
      techConstraints: 'Windows 10/11, modern GPU, stable internet for download, budget $0.',
      desiredInputs: 'Line-in audio from DJ mixer, or microphone input.',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setError(null);
    setResults(null);
    startTransition(async () => {
      try {
        const rankToolsInput: RankToolsInput = {
          eventType: data.eventType,
          techConstraints: data.techConstraints,
          desiredInputs: data.desiredInputs,
        };
        const response = await rankToolsAction(rankToolsInput);
        setResults(response);
      } catch (e) {
        console.error(e);
        setError('Failed to get recommendations. Please try again.');
      }
    });
  };

  const renderStars = (score: number) => {
    const totalStars = 5;
    const fullStars = Math.round(score / 2); // Assuming score is 0-10, map to 0-5 stars
    return (
      <div className="flex">
        {Array(totalStars).fill(0).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < fullStars ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
        ))}
      </div>
    );
  };


  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Event Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Silent Disco">Silent Disco</SelectItem>
                    <SelectItem value="Fashion Show">Fashion Show</SelectItem>
                    <SelectItem value="Concert">Concert</SelectItem>
                    <SelectItem value="Art Installation">Art Installation</SelectItem>
                    <SelectItem value="Corporate Event">Corporate Event</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  E.g., AfroVerse Silent Disco, Nerd Fest Fashion Show.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techConstraints"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Technical Constraints</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="E.g., OS (Windows, macOS, Linux), bandwidth, budget (e.g., $0 for free tools)"
                    {...field}
                    rows={3}
                  />
                </FormControl>
                <FormDescription>
                  Specify OS, hardware limitations, internet access, and budget constraints.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="desiredInputs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Desired Inputs</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="E.g., line-in audio, microphone, webcam, MIDI controller"
                    {...field}
                    rows={3}
                  />
                </FormControl>
                <FormDescription>
                  What sources will drive the visuals? (Audio, video, etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} size="lg" className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Getting Recommendations...
              </>
            ) : (
              'Recommend Tools'
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results && results.length > 0 && (
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-center">Recommended Tools</h2>
          <Separator />
          {results.map((tool, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader className="bg-card-foreground/5 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-primary">{tool.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{tool.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    {renderStars(tool.suitabilityScore)}
                    <Badge variant="outline" className="mt-1 text-xs">Score: {tool.suitabilityScore}/10</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Pros</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{tool.pros}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 flex items-center"><XCircle className="h-5 w-5 text-red-500 mr-2" />Cons</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{tool.cons}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-card-foreground/5 p-6 flex flex-wrap gap-3 justify-end">
                {tool.downloadLink && tool.downloadLink !== "N/A" && (
                  <Button variant="outline" asChild size="sm">
                    <a href={tool.downloadLink} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </a>
                  </Button>
                )}
                {tool.launchLink && tool.launchLink !== "N/A" && (
                   <Button variant="default" asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                     <a href={tool.launchLink} target="_blank" rel="noopener noreferrer">
                       <ExternalLink className="mr-2 h-4 w-4" /> Launch / Learn More
                     </a>
                   </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
       {results && results.length === 0 && !isPending && (
        <Alert>
          <AlertTitle>No Tools Found</AlertTitle>
          <AlertDescription>
            We couldn't find any tools matching your criteria. Try adjusting your inputs.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
