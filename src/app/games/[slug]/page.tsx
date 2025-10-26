import Image from "next/image";
import { notFound } from "next/navigation";
import { games } from "@/lib/games";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import GameSettings from "@/components/game-settings";
import CompatibilityCheck from "@/components/compatibility-check";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);

  if (!game) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === game.id);

  return (
    <div className="container max-w-screen-2xl py-8 md:py-12">
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
        <div className="md:col-span-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={game.name}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                priority
              />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
          </div>
          <div className="mt-8">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">{game.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground font-body">{game.longDescription}</p>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="sticky top-20 flex flex-col gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Download className="mr-2" /> Download Game
                </Button>
                <div>
                  <h3 className="font-semibold font-headline text-lg">Genre</h3>
                  <Badge variant="outline" className="mt-1">{game.genre}</Badge>
                </div>
                <div>
                  <h3 className="font-semibold font-headline text-lg">Platforms</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {game.platforms.map(platform => <Badge key={platform}>{platform}</Badge>)}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <CompatibilityCheck />
            <GameSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
