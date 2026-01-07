'use server';

/**
 * @fileOverview Masks an Aadhaar number, displaying only the last four digits.
 *
 * - maskAadhaarNumber - A function that masks the Aadhaar number.
 * - MaskAadhaarNumberInput - The input type for the maskAadhaarNumber function.
 * - MaskAadhaarNumberOutput - The return type for the maskAadhaarNumber function.
 */

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
  if (!input.aadhaarNumber) {
    return { maskedAadhaarNumber: '' };
  }
  const s = String(input.aadhaarNumber).replace(/\D/g, '');
  if (s.length <= 4) return { maskedAadhaarNumber: s };
  const maskedNumber = "X".repeat(s.length - 4) + s.slice(-4);
  return {maskedAadhaarNumber: maskedNumber};
}
