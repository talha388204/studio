import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
        <Image
          src="https://picsum.photos/seed/ecommerce-hero-dark/1800/1200"
          alt="Modern gadgets on a sleek background"
          fill
          className="object-cover opacity-20"
          priority
          data-ai-hint="modern gadgets"
        />
        <div className="relative container mx-auto h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-headline font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-white drop-shadow-lg">
            E-Commerce by Talha
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-foreground/70">
            Discover the future of tech and style. Premium quality for a seamless modern life.
          </p>
          <Button asChild size="lg" className="mt-8 group bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105">
            <Link href="/products">
              Explore Collection <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Categories</h2>
            <p className="mt-2 text-muted-foreground text-lg">Explore our most popular collections</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {['smartphones', 'laptops', 'books', 'skincare'].map(category => (
                <div key={category} className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2">
                    <Link href={`/products?category=${encodeURIComponent(category.toLowerCase())}`}>
                        <Image
                          src={`https://picsum.photos/seed/${category.replace(/ /g, '-')}/600/400`}
                          alt={category}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={category.toLowerCase().split(' ')[0]}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-start p-6">
                          <h3 className="text-2xl font-headline font-bold text-white">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        </div>
                    </Link>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Choose Us?</h2>
            <p className="mt-2 text-muted-foreground text-lg mb-12">Service and quality you can trust.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Truck, title: 'Fast Shipping', description: 'Get your orders delivered to your doorstep in no time.' },
                  { icon: ShieldCheck, title: 'Quality Products', description: 'We source the best products to ensure your satisfaction.' },
                  { icon: Zap, title: '24/7 Support', description: 'Our team is here to help you anytime, anywhere.' },
                ].map(feature => (
                    <Card key={feature.title} className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/10">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-primary/10 rounded-full">
                                <feature.icon className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                        <p className="mt-2 text-muted-foreground">{feature.description}</p>
                    </Card>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
