'use server';

/**
 * @fileOverview Masks an Aadhaar number, displaying only the last four digits.
 *
 * - maskAadhaarNumber - A function that masks the Aadhaar number.
 * - MaskAadhaarNumberInput - The input type for the maskAadhaarNumber function.
 * - MaskAadhaarNumberOutput - The return type for the maskAadhaarNumber function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MaskAadhaarNumberInputSchema = z.object({
  aadhaarNumber: z
    .string()
    .describe('The Aadhaar number to mask.'),
});
export type MaskAadhaarNumberInput = z.infer<typeof MaskAadhaarNumberInputSchema>;

const MaskAadhaarNumberOutputSchema = z.object({
  maskedAadhaarNumber: z
    .string()
    .describe('The masked Aadhaar number with only the last four digits visible.'),
});
export type MaskAadhaarNumberOutput = z.infer<typeof MaskAadhaarNumberOutputSchema>;

export async function maskAadhaarNumber(input: MaskAadhaarNumberInput): Promise<MaskAadhaarNumberOutput> {
  return maskAadhaarNumberFlow(input);
}

const maskAadhaarNumberPrompt = ai.definePrompt({
  name: 'maskAadhaarNumberPrompt',
  input: {schema: MaskAadhaarNumberInputSchema},
  output: {schema: MaskAadhaarNumberOutputSchema},
  prompt: `Mask the following Aadhaar number, displaying only the last four digits:

   Aadhaar Number: {{{aadhaarNumber}}}
`,
});

const maskAadhaarNumberFlow = ai.defineFlow(
  {
    name: 'maskAadhaarNumberFlow',
    inputSchema: MaskAadhaarNumberInputSchema,
    outputSchema: MaskAadhaarNumberOutputSchema,
  },
  async input => {
    if (!input.aadhaarNumber) {
      return { maskedAadhaarNumber: '' }; // Handle empty input
    }
    const s = String(input.aadhaarNumber).replace(/\D/g, '');
    if (s.length <= 4) return { maskedAadhaarNumber: s };
    const maskedNumber = "X".repeat(s.length - 4) + s.slice(-4);
    return {maskedAadhaarNumber: maskedNumber};
  }
);
