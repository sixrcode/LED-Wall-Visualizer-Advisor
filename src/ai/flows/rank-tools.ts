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
    description: z.string().describe('A short description of the tool and its key features relevant to the query.'),
    pros: z.string().describe('Pros of using this tool, highlighting its strengths for the given scenario.'),
    cons: z.string().describe('Cons or limitations, e.g., learning curve, resolution limits, platform restrictions.'),
    downloadLink: z.string().describe('A direct link if universally applicable, or instructions like "Search on Steam Store" or "Visit official website". Use "N/A" if not applicable or a general search is better.'),
    launchLink: z.string().describe('Link to launch a web-based tool, or learn more/documentation. Use "N/A" if not applicable.'),
    suitabilityScore: z
      .number()
      .describe('A score from 0-10 indicating the suitability of the tool for the given event, constraints, and inputs.'),
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
  prompt: `You are an expert event producer specializing in recommending visualizer tools for LED walls, focusing on free or low-cost options.
You will receive the event type, tech constraints, and desired inputs. Based on this information, you will recommend and rank open-source/free tools that are suitable for the event.

When generating recommendations, draw upon your knowledge of tools like:
- **Butterchurn (Web Visualizer/Milkdrop):** Runs in browser, reacts to mic/audio. Ideal for quick, psychedelic, music-responsive visuals. Link: https://butterchurnviz.com
- **Kauna (Windows):** Lightweight app, renders system sound/mic. Multiple modes (spectrographic bars, waves, plasma). Link: Search "Kauna" on Microsoft Store.
- **AI VJ (Steam):** Free VJ software, auto-syncs to music (Ableton Link/live audio), curated generative visuals. Link: Search "AI VJ" on Steam.
- **Hydra:** Open-source browser-based live-coding video synth. For generative visuals, camera effects, audio reactivity. Requires some coding/learning. Link: Search "Hydra Synth" online.
- **TouchDesigner (Non-Commercial):** Professional node-based tool, free for non-commercial (1280x1280 limit). Excellent for audio reactivity and interactive video. Steeper learning curve. Link: Search "TouchDesigner Derivative" online.
- **Processing / p5.js:** Free creative coding frameworks (Java/JavaScript). Total creative freedom for custom visuals, audio/video input. Requires programming. Link: Search "Processing org" or "p5js org" online.
- **Magic Music Visuals (Home Edition):** Low-cost (~$40) node-based visualizer, supports audio and live video. Good for more control if budget allows. Link: Search "Magic Music Visuals" online.

Consider factors such as:
- **Cost:** Prioritize free tools. Mention if a tool has a relevant free tier or is very low-cost.
- **Ease of Use & Setup:** Minimal setup tools vs. those requiring coding/learning.
- **Input Types:** Microphone, line-in audio, system audio, webcam, MIDI.
- **Visual Style:** Generative, psychedelic, geometric, particle systems, video effects.
- **Interactivity:** Sound-reactive, motion-reactive (webcam).
- **Platform/Compatibility:** Web-based, Windows, Steam.
- **Output Quality & Resolution:** Suitability for LED walls (consider TouchDesigner's free tier limit).

Event Type: {{{eventType}}}
Tech Constraints: {{{techConstraints}}}
Desired Inputs: {{{desiredInputs}}}

Format the output as a JSON array of visualizer tools. Each tool object should include:
- name: string (The name of the visualizer tool)
- description: string (A short description of the tool and its key features relevant to the query)
- pros: string (Pros of using this tool, highlighting its strengths for the given scenario)
- cons: string (Cons or limitations, e.g., learning curve, resolution limits, platform restrictions)
- downloadLink: string (A direct link if universally applicable, or instructions like "Search on Steam Store" or "Visit official website". Use "N/A" if not applicable or a general search is better.)
- launchLink: string (Link to launch a web-based tool, or learn more/documentation. Use "N/A" if not applicable.)
- suitabilityScore: number (A score from 0-10 indicating the suitability of the tool for the given event, constraints, and inputs. Base this on your overall assessment.)
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
