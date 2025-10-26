"use client";

import { useState, useEffect } from 'react';
import { getProduct, type Product } from '@/lib/products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage({ params: { id } }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const fetchedProduct = await getProduct(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
        <div className="container mx-auto py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                <div>
                    <Skeleton className="aspect-square w-full rounded-lg" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-10 w-1/4" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-12 w-1/2" />
                </div>
            </div>
        </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-destructive">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <div className="container mx-auto py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-lg shadow-lg flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                />
            </div>
        </div>
        <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit mb-3">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline font-bold">{product.title}</h1>
            <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-bold text-lg">{product.rating.rate}</span>
                </div>
                <span className="text-muted-foreground">({product.rating.count} reviews)</span>
            </div>
            <Separator className="my-6" />
            <p className="text-4xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground leading-relaxed text-base">{product.description}</p>
            
            <div className="mt-8">
                 <Button size="lg" className="w-full md:w-auto group bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105">
                    <ShoppingCart className="mr-2 group-hover:rotate-12 transition-transform" /> Add to Cart
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}