import Image from "next/image";
import { games } from "@/lib/games";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import GameCard from "@/components/game-card";
import Recommendations from "@/components/recommendations";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-image");

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[50vh] md:h-[60vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative container max-w-screen-2xl h-full flex flex-col items-center justify-end text-center pb-12">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground drop-shadow-lg">
            Welcome to Ekta Game Studio
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80 font-body">
            Discover your next favorite game. Unparalleled adventures await.
          </p>
        </div>
      </section>

      <section id="recommendations" className="py-12 md:py-20 bg-background">
        <div className="container max-w-screen-2xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Personalized Picks</h2>
            <p className="mt-2 max-w-2xl text-md md:text-lg text-muted-foreground">
              Tell us what you like, and our AI will find games tailored just for you.
            </p>
          </div>
          <Recommendations />
        </div>
      </section>

      <section id="games" className="py-12 md:py-20 bg-muted/40">
        <div className="container max-w-screen-2xl">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Games</h2>
            <p className="mt-2 max-w-2xl text-md md:text-lg text-muted-foreground">
              A curated selection of titles for every kind of player.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
