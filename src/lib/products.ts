export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number; 
  stock: number;
  brand: string | null;
  thumbnail?: string;
};

type DummyJSONProduct = Omit<Product, 'rating' | 'image' | 'brand'> & {
    rating: number;
    thumbnail: string;
    brand: string;
};

type FakeStoreProduct = Omit<Product, 'rating' | 'stock' | 'brand'> & {
    rating: { rate: number; count: number };
};


type ProductsApiResponse = {
  products: DummyJSONProduct[];
  total: number;
  skip: number;
  limit: number;
};

type BooksApiResponse = {
  products: DummyJSONProduct[];
  total: number;
  skip: number;
  limit: number;
};


export async function getProducts(): Promise<Product[]> {
  try {
    const [dummyjsonRes, fakestoreRes, booksRes] = await Promise.all([
        fetch('https://dummyjson.com/products?limit=100'),
        fetch('https://fakestoreapi.com/products'),
        fetch('https://dummyjson.com/products/category/books')
    ]);

    let allProducts: Product[] = [];

    // Process DummyJSON products
    if (dummyjsonRes.ok) {
        const data: ProductsApiResponse = await dummyjsonRes.json();
        const dummyProducts = data.products.map(p => ({
            ...p,
            id: p.id,
            image: p.thumbnail,
            rating: p.rating,
        }));
        allProducts = allProducts.concat(dummyProducts);
    } else {
        console.error('Failed to fetch from dummyjson');
    }

    // Process FakeStoreAPI products
    if (fakestoreRes.ok) {
        const data: FakeStoreProduct[] = await fakestoreRes.json();
        const fakeStoreProducts = data.map(p => ({
            ...p,
            // Assign a unique ID to avoid conflicts with dummyjson
            id: p.id + 200, 
            rating: p.rating.rate,
            stock: p.rating.count, // Using rating count as stock for variety
            brand: null, // fakestoreapi doesn't provide brand
        }));
        allProducts = allProducts.concat(fakeStoreProducts);
    } else {
        console.error('Failed to fetch from fakestoreapi');
    }
    
    // Process books
    let bookData: Product[] = [];
    if(booksRes.ok) {
        const booksApiResponse: BooksApiResponse = await booksRes.json();
        bookData = booksApiResponse.products.map(p => ({
            ...p,
            id: p.id + 300, // Ensure unique IDs
            image: p.thumbnail,
            rating: p.rating,
        }));
    } else {
        // Add some mock books if the category doesn't exist or fetch fails
        bookData = [
            { id: 401, title: "The Great Gatsby", price: 10.99, description: "A novel by F. Scott Fitzgerald.", category: "books", image: "https://picsum.photos/seed/the-great-gatsby/600/400", rating: 4.5, stock: 50, brand: "Penguin Classics" },
            { id: 402, title: "To Kill a Mockingbird", price: 12.50, description: "A novel by Harper Lee.", category: "books", image: "https://picsum.photos/seed/to-kill-a-mockingbird/600/400", rating: 4.8, stock: 30, brand: "HarperCollins" },
            { id: 403, title: "1984", price: 9.99, description: "A dystopian social science fiction novel by George Orwell.", category: "books", image: "https://picsum.photos/seed/1984/600/400", rating: 4.7, stock: 60, brand: "Signet Classics" },
            { id: 404, title: "Pride and Prejudice", price: 8.99, description: "A romantic novel of manners by Jane Austen.", category: "books", image: "https://picsum.photos/seed/pride-and-prejudice/600/400", rating: 4.6, stock: 45, brand: "Modern Library" }
        ];
    }
    
    allProducts = allProducts.concat(bookData);

    // Remove duplicates by title, preferring dummyjson/books
    const uniqueProducts = Array.from(new Map(allProducts.map(item => [item.title, item])).values());

    return uniqueProducts;

  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
    try {
        const allProducts = await getProducts();
        const productId = parseInt(id, 10);
        const product = allProducts.find(p => p.id === productId);

        if (product) {
            return product;
        }

        // Fallback to fetch directly if not found in the combined list (e.g., direct link)
        let res: Response;
        let isFakeStore = false;

        // A simple check to decide which API to hit. This could be more robust.
        if (productId > 200 && productId < 300) {
             res = await fetch(`https://fakestoreapi.com/products/${productId - 200}`);
             isFakeStore = true;
        } else if (productId > 300 && productId < 400) {
             res = await fetch(`https://dummyjson.com/products/${productId - 300}`);
        } else if (productId > 400) {
             const mockBooks = [
                { id: 401, title: "The Great Gatsby", price: 10.99, description: "A novel by F. Scott Fitzgerald.", category: "books", image: "https://picsum.photos/seed/the-great-gatsby/600/400", rating: 4.5, stock: 50, brand: "Penguin Classics" },
                { id: 402, title: "To Kill a Mockingbird", price: 12.50, description: "A novel by Harper Lee.", category: "books", image: "https://picsum.photos/seed/to-kill-a-mockingbird/600/400", rating: 4.8, stock: 30, brand: "HarperCollins" },
                { id: 403, title: "1984", price: 9.99, description: "A dystopian social science fiction novel by George Orwell.", category: "books", image: "https://picsum.photos/seed/1984/600/400", rating: 4.7, stock: 60, brand: "Signet Classics" },
                { id: 404, title: "Pride and Prejudice", price: 8.99, description: "A romantic novel of manners by Jane Austen.", category: "books", image: "https://picsum.photos/seed/pride-and-prejudice/600/400", rating: 4.6, stock: 45, brand: "Modern Library" }
           ];
           return mockBooks.find(book => book.id === productId) || null;
        } else {
            res = await fetch(`https://dummyjson.com/products/${id}`);
        }

        if (!res.ok) {
           return null;
        }

        if (isFakeStore) {
            const productData: FakeStoreProduct = await res.json();
            return {
                ...productData,
                id: productData.id + 200,
                rating: productData.rating.rate,
                stock: productData.rating.count,
                brand: null,
            };
        } else {
             const productData: DummyJSONProduct = await res.json();
             return {
                ...productData,
                image: productData.thumbnail,
                rating: productData.rating,
            };
        }

    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}
