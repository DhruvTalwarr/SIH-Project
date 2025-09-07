'use server';
/**
 * @fileOverview An AI agent that assesses livestock health based on images.
 *
 * - assessLivestockHealth - A function that handles the livestock health assessment process.
 * - AssessLivestockHealthInput - The input type for the assessLivestockHealth function.
 * - AssessLivestockHealthOutput - The return type for the assessLivestockHealth function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessLivestockHealthInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the livestock, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  species: z.string().describe('The species of the livestock (e.g., cow, pig, sheep).'),
  additionalDetails: z.string().optional().describe('Any additional details about the livestock or potential health concerns.'),
});
export type AssessLivestockHealthInput = z.infer<typeof AssessLivestockHealthInputSchema>;

const AssessLivestockHealthOutputSchema = z.object({
  healthAssessment: z.string().describe('A detailed assessment of the livestock health based on the image.'),
  potentialIssues: z.array(z.string()).describe('A list of potential health issues identified in the image.'),
  confidenceLevel: z.number().describe('A confidence level (0-1) for the health assessment.'),
});
export type AssessLivestockHealthOutput = z.infer<typeof AssessLivestockHealthOutputSchema>;

export async function assessLivestockHealth(input: AssessLivestockHealthInput): Promise<AssessLivestockHealthOutput> {
  return assessLivestockHealthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessLivestockHealthPrompt',
  input: {schema: AssessLivestockHealthInputSchema},
  output: {schema: AssessLivestockHealthOutputSchema},
  prompt: `You are an expert veterinarian specializing in assessing livestock health based on images.

You will analyze the provided image of the livestock, taking into account the species and any additional details, to identify potential health issues.

Based on your analysis, provide a detailed health assessment, list any potential issues identified, and provide a confidence level for your assessment.

Species: {{{species}}}
Additional Details: {{{additionalDetails}}}
Photo: {{media url=photoDataUri}}
`,
});

const assessLivestockHealthFlow = ai.defineFlow(
  {
    name: 'assessLivestockHealthFlow',
    inputSchema: AssessLivestockHealthInputSchema,
    outputSchema: AssessLivestockHealthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
