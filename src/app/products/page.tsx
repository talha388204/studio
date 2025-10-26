"use client";

import { useState, useEffect, Suspense, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts, type Product } from '@/lib/products';
import ProductCard from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const INITIAL_LOAD = 20;
const LOAD_MORE_COUNT = 20;

function ProductsPageContent() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  
  const observer = useRef<IntersectionObserver>();
  const lastProductElementRef = useCallback((node: HTMLDivElement) => {
    if (loading || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            loadMoreProducts();
        }
    });
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore]);


  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts();
        setAllProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let tempProducts = allProducts;

    if (category) {
        tempProducts = tempProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (searchTerm) {
        tempProducts = tempProducts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    const sorted = [...tempProducts].sort((a, b) => {
        if (sortOrder === 'price-asc') {
            return a.price - b.price;
        }
        if (sortOrder === 'price-desc') {
            return b.price - a.price;
        }
        if (sortOrder === 'rating-desc') {
            return b.rating - a.rating;
        }
        return 0;
    });

    setFilteredProducts(sorted);
    setDisplayedProducts(sorted.slice(0, INITIAL_LOAD));
    setHasMore(sorted.length > INITIAL_LOAD);

  }, [allProducts, category, searchTerm, sortOrder]);

  const loadMoreProducts = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
        const currentLength = displayedProducts.length;
        const newProducts = filteredProducts.slice(currentLength, currentLength + LOAD_MORE_COUNT);
        setDisplayedProducts(prev => [...prev, ...newProducts]);
        if (currentLength + LOAD_MORE_COUNT >= filteredProducts.length) {
            setHasMore(false);
        }
        setLoadingMore(false);
    }, 500); // Simulate network delay
  };


  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl md:text-4xl font-headline font-bold">
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
            </h1>
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search..." 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="rating-desc">Top Rated</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[250px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedProducts.map((product, index) => {
                if (displayedProducts.length === index + 1) {
                    return <div ref={lastProductElementRef} key={product.id}><ProductCard product={product} /></div>
                } else {
                    return <ProductCard key={product.id} product={product} />
                }
            })}
            </div>
            {loadingMore && (
                <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}
            {!hasMore && displayedProducts.length > 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    <p>You've reached the end of the list.</p>
                </div>
            )}
            {displayedProducts.length === 0 && !loading && (
                 <div className="text-center py-20 col-span-full">
                    <p className="text-muted-foreground text-lg">No products found.</p>
                </div>
            )}
        </>
      )}
    </div>
  );
}


export default function ProductsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductsPageContent />
        </Suspense>
    )
}
