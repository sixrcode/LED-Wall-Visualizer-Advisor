'use server';
/**
 * @fileOverview This file defines a Genkit flow to generate setup steps for a given visualizer tool.
 *
 * - generateSetupSteps - A function that generates setup steps for a visualizer tool.
 * - GenerateSetupStepsInput - The input type for the generateSetupSteps function.
 * - GenerateSetupStepsOutput - The return type for the generateSetupSteps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSetupStepsInputSchema = z.object({
  toolName: z.string().describe('The name of the visualizer tool.'),
  eventType: z.string().describe('The type of event for which the tool is being used (e.g., Silent Disco, Fashion Show).'),
  techConstraints: z.string().describe('Technical constraints such as OS, bandwidth, and budget.'),
  desiredInputs: z.string().describe('Desired input methods such as line-in audio, mic, or webcam.'),
});
export type GenerateSetupStepsInput = z.infer<typeof GenerateSetupStepsInputSchema>;

const GenerateSetupStepsOutputSchema = z.object({
  setupSteps: z.array(z.string()).describe('An array of setup steps for the visualizer tool.'),
});
export type GenerateSetupStepsOutput = z.infer<typeof GenerateSetupStepsOutputSchema>;

export async function generateSetupSteps(input: GenerateSetupStepsInput): Promise<GenerateSetupStepsOutput> {
  return generateSetupStepsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSetupStepsPrompt',
  input: {schema: GenerateSetupStepsInputSchema},
  output: {schema: GenerateSetupStepsOutputSchema},
  prompt: `You are an expert in configuring visualizer tools for various events. Based on the tool name, event type, technical constraints, and desired inputs, generate a list of specific setup steps required to configure the visualizer tool for an LED wall.

Tool Name: {{{toolName}}}
Event Type: {{{eventType}}}
Technical Constraints: {{{techConstraints}}}
Desired Inputs: {{{desiredInputs}}}

Setup Steps:
1.  `, // The numbering will be taken care of by the LLM
});

const generateSetupStepsFlow = ai.defineFlow(
  {
    name: 'generateSetupStepsFlow',
    inputSchema: GenerateSetupStepsInputSchema,
    outputSchema: GenerateSetupStepsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
