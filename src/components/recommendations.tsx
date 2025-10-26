"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wand2, Loader2 } from "lucide-react";
import {
  getPersonalizedGameRecommendations,
  type PersonalizedGameRecommendationsOutput,
} from "@/ai/flows/personalized-game-recommendations";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const FormSchema = z.object({
  preferences: z.string().min(10, "Please describe your preferences in at least 10 characters."),
});

type FormValues = z.infer<typeof FormSchema>;

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<PersonalizedGameRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      preferences: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const result = await getPersonalizedGameRecommendations({
        userGamePreferences: data.preferences,
        numberOfRecommendations: 3,
      });
      setRecommendations(result);
    } catch (e) {
      setError("Sorry, we couldn't generate recommendations at this time. Please try again later.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <Card className="bg-muted/40 border-2 border-primary/20 shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Your Gaming DNA</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I love open-world RPGs like The Witcher 3, enjoy crafting systems, and prefer fantasy settings. I'm not a fan of horror games.'"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base font-bold">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && (
        <div className="mt-8">
            <h3 className="text-2xl font-headline font-bold text-center mb-6">Here are your custom picks:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.gameRecommendations.map((game) => (
                    <Card key={game.gameName} className="flex flex-col">
                        <CardHeader>
                            <Badge variant="secondary" className="mb-2 w-fit">{game.genre}</Badge>
                            <CardTitle className="font-headline">{game.gameName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground font-body">{game.gameDescription}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
