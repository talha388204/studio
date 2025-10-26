import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Badge variant="secondary" className="mb-2">{product.category}</Badge>
          <CardTitle className="text-base font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">{product.title}</CardTitle>
          <CardDescription className="mt-2 text-sm line-clamp-2">{product.description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 flex items-center justify-between">
            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
            <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
                <span className="text-sm text-muted-foreground">{product.rating.rate} ({product.rating.count})</span>
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
