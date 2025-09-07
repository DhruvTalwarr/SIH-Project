'use server';
/**
 * @fileOverview A flow that digitizes handwritten prescriptions using AI to extract medication details.
 *
 * - digitizePrescription - A function that handles the prescription digitization process.
 * - DigitizePrescriptionInput - The input type for the digitizePrescription function.
 * - DigitizePrescriptionOutput - The return type for the digitizePrescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DigitizePrescriptionInputSchema = z.object({
  prescriptionImage: z
    .string()
    .describe(
      "A photo of a handwritten prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DigitizePrescriptionInput = z.infer<typeof DigitizePrescriptionInputSchema>;

const DigitizePrescriptionOutputSchema = z.object({
  medicationDetails: z
    .string()
    .describe('The extracted medication details from the prescription.'),
});
export type DigitizePrescriptionOutput = z.infer<typeof DigitizePrescriptionOutputSchema>;

export async function digitizePrescription(input: DigitizePrescriptionInput): Promise<DigitizePrescriptionOutput> {
  return digitizePrescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'digitizePrescriptionPrompt',
  input: {schema: DigitizePrescriptionInputSchema},
  output: {schema: DigitizePrescriptionOutputSchema},
  prompt: `You are an expert pharmacist specializing in deciphering handwritten prescriptions for livestock.

You will use this information to extract the medication details, including the drug name, dosage, frequency, and duration.

Extract all the details from the prescription and return them in a single string.

Prescription Image: {{media url=prescriptionImage}}`,
});

const digitizePrescriptionFlow = ai.defineFlow(
  {
    name: 'digitizePrescriptionFlow',
    inputSchema: DigitizePrescriptionInputSchema,
    outputSchema: DigitizePrescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
