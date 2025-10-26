"use client";

import { SlidersHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "./ui/card";

export default function GameSettings() {
  return (
    <Card>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="text-xl font-headline flex items-center gap-2 p-6 [&[data-state=open]>svg]:text-primary hover:no-underline">
            <SlidersHorizontal /> Advanced Graphics Settings
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-0 space-y-6">
              <div className="space-y-2">
                  <Label htmlFor="resolution">Resolution Scale</Label>
                  <Slider id="resolution" defaultValue={[80]} max={100} step={5} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="texture">Texture Quality</Label>
                  <Slider id="texture" defaultValue={[75]} max={100} step={25} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="shadows">Shadow Quality</Label>
                  <Slider id="shadows" defaultValue={[50]} max={100} step={25} />
              </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
