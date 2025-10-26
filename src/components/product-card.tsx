import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
        <div className="relative aspect-square w-full p-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="flex-grow p-4 pt-0 flex flex-col">
          <Badge variant="secondary" className="mb-2 w-fit">{product.category}</Badge>
          <h3 className="text-base font-bold leading-tight line-clamp-2 flex-grow group-hover:text-primary transition-colors">{product.title}</h3>
        </CardContent>
        <CardFooter className="p-4 flex items-center justify-between">
            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                <span>{product.rating.rate}</span>
                <span className="hidden sm:inline">({product.rating.count})</span>
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}