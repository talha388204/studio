import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/games";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === game.id);

  return (
    <Link href={`/games/${game.slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={game.name}
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint={image.imageHint}
              />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2">{game.genre}</Badge>
          <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{game.name}</CardTitle>
          <CardDescription className="mt-2 font-body">{game.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
