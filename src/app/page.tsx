import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh] bg-gradient-to-r from-primary to-accent">
        <Image
          src="https://picsum.photos/seed/ecommerce-hero/1800/1200"
          alt="Modern gadgets on a sleek background"
          fill
          className="object-cover opacity-30"
          priority
          data-ai-hint="modern gadgets"
        />
        <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center text-primary-foreground p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">
            E-Commerce by Talha
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/80">
            Discover the latest in tech and style. Quality products for a modern life.
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-white/90">
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Categories</h2>
            <p className="mt-2 text-muted-foreground text-lg">Explore our most popular collections</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Electronics', 'Jewelery', 'Men\'s Clothing', 'Women\'s Clothing'].map(category => (
                <div key={category} className="group relative overflow-hidden rounded-lg shadow-lg">
                    <Link href={`/products?category=${encodeURIComponent(category.toLowerCase())}`}>
                        <Image
                        src={`https://picsum.photos/seed/${category.replace(/ /g, '-')}/600/400`}
                        alt={category}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        data-ai-hint={category.toLowerCase().split(' ')[0]}
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <h3 className="text-2xl font-headline font-bold text-white">{category}</h3>
                        </div>
                    </Link>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted/40">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Choose Us?</h2>
            <p className="mt-2 text-muted-foreground text-lg mb-8">Service and quality you can trust.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6">
                    <h3 className="text-xl font-bold font-headline">Fast Shipping</h3>
                    <p className="mt-2 text-muted-foreground">Get your orders delivered to your doorstep in no time.</p>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold font-headline">Quality Products</h3>
                    <p className="mt-2 text-muted-foreground">We source the best products to ensure your satisfaction.</p>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold font-headline">24/7 Support</h3>
                    <p className="mt-2 text-muted-foreground">Our team is here to help you anytime, anywhere.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
