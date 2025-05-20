// src/ai/flows/rank-tools.ts
'use server';

/**
 * @fileOverview Ranks visualizer tools based on event type, tech constraints, and desired inputs.
 *
 * - rankTools - A function that ranks visualizer tools.
 * - RankToolsInput - The input type for the rankTools function.
 * - RankToolsOutput - The return type for the rankTools function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RankToolsInputSchema = z.object({
  eventType: z
    .string()
    .describe('The type of event (e.g., Silent Disco, Fashion Show).'),
  techConstraints: z.string().describe('Technical constraints (e.g., OS, bandwidth, budget).'),
  desiredInputs: z.string().describe('Desired inputs (e.g., line-in audio, mic, webcam).'),
});

export type RankToolsInput = z.infer<typeof RankToolsInputSchema>;

const RankToolsOutputSchema = z.array(
  z.object({
    name: z.string().describe('The name of the visualizer tool.'),
    description: z.string().describe('A short description of the tool.'),
    pros: z.string().describe('The pros of using this tool.'),
    cons: z.string().describe('The cons of using this tool.'),
    downloadLink: z.string().describe('The link to download the tool.'),
    launchLink: z.string().describe('The link to launch the tool.'),
    suitabilityScore: z
      .number()
      .describe('A score indicating the suitability of the tool for the given event.'),
  })
);

export type RankToolsOutput = z.infer<typeof RankToolsOutputSchema>;

export async function rankTools(input: RankToolsInput): Promise<RankToolsOutput> {
  return rankToolsFlow(input);
}

const rankToolsPrompt = ai.definePrompt({
  name: 'rankToolsPrompt',
  input: {schema: RankToolsInputSchema},
  output: {schema: RankToolsOutputSchema},
  prompt: `You are an expert event producer specializing in recommending visualizer tools for LED walls.

You will receive the event type, tech constraints, and desired inputs. Based on this information, you will recommend and rank open-source/free tools that are suitable for the event.

Consider factors such as cost, ease of use, compatibility, and features when ranking the tools. Provide a suitability score for each tool.

Event Type: {{{eventType}}}
Tech Constraints: {{{techConstraints}}}
Desired Inputs: {{{desiredInputs}}}

Format the output as a JSON array of visualizer tools with name, description, pros, cons, downloadLink, launchLink and suitabilityScore.
`,
});

const rankToolsFlow = ai.defineFlow(
  {
    name: 'rankToolsFlow',
    inputSchema: RankToolsInputSchema,
    outputSchema: RankToolsOutputSchema,
  },
  async input => {
    const {output} = await rankToolsPrompt(input);
    return output!;
  }
);
