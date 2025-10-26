"use client";

import { cn } from "@/lib/utils";
import { Home, Star } from "lucide-react";

const PlayerBase = ({ color, ringColor, pieces }: { color: string, ringColor: string, pieces: number }) => (
  <div className={cn("flex items-center justify-center p-4", color)}>
    <div className="grid h-24 w-24 grid-cols-2 grid-rows-2 gap-2 rounded-lg bg-white/80 p-2">
      {Array(pieces).fill(0).map((_, i) => (
        <div key={i} className={cn("h-full w-full rounded-full ring-4 ring-offset-2", ringColor)} />
      ))}
    </div>
  </div>
);

const PathCell = ({ className, isStar, isSafe }: { className?: string; isStar?: boolean; isSafe?: boolean; }) => (
  <div className={cn("relative flex items-center justify-center border border-black/10", className, isSafe && "bg-black/10")}>
    {isStar && <Star className="h-4 w-4 text-black/70 fill-black/70" />}
  </div>
);

const HomeColumn = ({ color }: { color: string }) => (
  <div className="grid grid-rows-6">
    <PathCell className={color} />
    <PathCell className={color} />
    <PathCell className={color} />
    <PathCell className={color} />
    <PathCell className={color} />
    <PathCell />
  </div>
);

export default function LudoKingBoard() {
  return (
    <div className="aspect-square w-full max-w-xl rounded-lg bg-gray-200 p-2 shadow-2xl">
      <div className="grid h-full w-full grid-cols-[6fr_3fr_6fr] grid-rows-[6fr_3fr_6fr] gap-0.5">
        
        {/* Top-left Green */}
        <PlayerBase color="bg-green-500" ringColor="ring-green-500" pieces={4} />
        
        {/* Top Path */}
        <div className="grid grid-cols-3 -rotate-90">
          <PathCell /><PathCell /><PathCell isStar isSafe />
          <HomeColumn color="bg-green-500" />
          <PathCell /><PathCell /><PathCell />
        </div>
        
        {/* Top-right Yellow */}
        <PlayerBase color="bg-yellow-400" ringColor="ring-yellow-400" pieces={4} />
        
        {/* Middle-left Path (Blue's) */}
        <div className="grid grid-rows-3 -rotate-180">
          <div className="grid grid-cols-6">
            <PathCell /><PathCell /><PathCell isStar isSafe /><PathCell /><PathCell /><PathCell />
          </div>
          <div className="grid grid-cols-6">
            <PathCell /><PathCell className="bg-blue-500" /><PathCell className="bg-blue-500" /><PathCell className="bg-blue-500" /><PathCell className="bg-blue-500" /><PathCell className="bg-blue-500" />
          </div>
          <div className="grid grid-cols-6">
            <PathCell /><PathCell /><PathCell /><PathCell /><PathCell isStar isSafe /><PathCell />
          </div>
        </div>

        {/* Center Home */}
        <div className="relative flex items-center justify-center bg-white">
          <div className="absolute h-full w-full">
            <div className="h-1/2 w-1/2 float-left bg-green-500" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}></div>
            <div className="h-1/2 w-1/2 float-right bg-yellow-400" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}></div>
            <div className="h-1/2 w-1/2 float-left bg-blue-500" style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}></div>
            <div className="h-1/2 w-1/2 float-right bg-red-500" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}></div>
          </div>
          <Home className="relative h-10 w-10 text-primary" />
        </div>

        {/* Middle-right Path (Yellow's) */}
        <div className="grid grid-rows-3">
          <div className="grid grid-cols-6">
            <PathCell /><PathCell isStar isSafe /><PathCell /><PathCell /><PathCell /><PathCell />
          </div>
          <div className="grid grid-cols-6">
            <PathCell className="bg-yellow-400" /><PathCell className="bg-yellow-400" /><PathCell className="bg-yellow-400" /><PathCell className="bg-yellow-400" /><PathCell className="bg-yellow-400" /><PathCell />
          </div>
          <div className="grid grid-cols-6">
            <PathCell /><PathCell /><PathCell /><PathCell isStar isSafe /><PathCell /><PathCell />
          </div>
        </div>

        {/* Bottom-left Blue */}
        <PlayerBase color="bg-blue-500" ringColor="ring-blue-500" pieces={4} />

        {/* Bottom Path */}
        <div className="grid grid-cols-3 rotate-90">
          <PathCell /><PathCell /><PathCell isStar isSafe />
          <HomeColumn color="bg-red-500" />
          <PathCell /><PathCell /><PathCell />
        </div>
        
        {/* Bottom-right Red */}
        <PlayerBase color="bg-red-500" ringColor="ring-red-500" pieces={4} />

      </div>
    </div>
  );
}
