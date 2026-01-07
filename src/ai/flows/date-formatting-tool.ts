'use server';

/**
 * @fileOverview Converts a date string to a textual format (e.g., 'January 21, 2024').
 *
 * - formatDateToWords - A function that converts date strings to a more readable textual format.
 * - DateFormatInput - The input type for the formatDateToWords function, a date string.
 * - DateFormatOutput - The return type for the formatDateToWords function, a formatted date string.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DateFormatInputSchema = z.string().describe('The date string to format.');
export type DateFormatInput = z.infer<typeof DateFormatInputSchema>;

const DateFormatOutputSchema = z.string().describe('The formatted date string.');
export type DateFormatOutput = z.infer<typeof DateFormatOutputSchema>;

export async function formatDateToWords(input: DateFormatInput): Promise<DateFormatOutput> {
  return dateFormatFlow(input);
}

const dateFormatPrompt = ai.definePrompt({
  name: 'dateFormatPrompt',
  input: {schema: DateFormatInputSchema},
  output: {schema: DateFormatOutputSchema},
  prompt: `Convert the following date into a textual format (e.g., January 21, 2024): {{{date}}}`,
});

const dateFormatFlow = ai.defineFlow(
  {
    name: 'dateFormatFlow',
    inputSchema: DateFormatInputSchema,
    outputSchema: DateFormatOutputSchema,
  },
  async date => {
    const {output} = await dateFormatPrompt({date});
    return output!;
  }
);
