'use server';

/**
 * @fileOverview A personalized game recommendation AI agent.
 *
 * - getPersonalizedGameRecommendations - A function that returns game recommendations based on user preferences.
 * - PersonalizedGameRecommendationsInput - The input type for the getPersonalizedGameRecommendations function.
 * - PersonalizedGameRecommendationsOutput - The return type for the getPersonalizedGameRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedGameRecommendationsInputSchema = z.object({
  userGamePreferences: z
    .string()
    .describe(
      'A description of the user game preferences, including preferred genres, game mechanics, and examples of games the user enjoys.'
    ),
  numberOfRecommendations: z
    .number()
    .default(3)
    .describe('The number of game recommendations to return.'),
});
export type PersonalizedGameRecommendationsInput = z.infer<
  typeof PersonalizedGameRecommendationsInputSchema
>;

const PersonalizedGameRecommendationsOutputSchema = z.object({
  gameRecommendations: z.array(
    z.object({
      gameName: z.string().describe('The name of the recommended game.'),
      gameDescription: z
        .string()
        .describe('A short description of the recommended game.'),
      genre: z.string().describe('The genre of the recommended game.'),
    })
  ).describe('A list of personalized game recommendations.'),
});
export type PersonalizedGameRecommendationsOutput = z.infer<
  typeof PersonalizedGameRecommendationsOutputSchema
>;

export async function getPersonalizedGameRecommendations(
  input: PersonalizedGameRecommendationsInput
): Promise<PersonalizedGameRecommendationsOutput> {
  return personalizedGameRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedGameRecommendationsPrompt',
  input: {schema: PersonalizedGameRecommendationsInputSchema},
  output: {schema: PersonalizedGameRecommendationsOutputSchema},
  prompt: `You are an expert game recommendation system. Based on the user's game preferences, you will recommend games that the user might enjoy. The user has requested {{numberOfRecommendations}} recommendations.

User Game Preferences: {{{userGamePreferences}}}

Please provide the game recommendations in the following JSON format:
{{$jsonOutput: PersonalizedGameRecommendationsOutputSchema}}`,
});

const personalizedGameRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedGameRecommendationsFlow',
    inputSchema: PersonalizedGameRecommendationsInputSchema,
    outputSchema: PersonalizedGameRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
