export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string; // This was 'image', dummyjson uses 'thumbnail'
  rating: number; // This was an object, dummyjson uses a number
  stock: number;
  brand: string;
  thumbnail?: string; // Add this to handle both APIs
};

// The API response from dummyjson is an object with a 'products' array
type ProductsApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

// The API response for books from dummyjson
type BooksApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};


export async function getProducts(): Promise<Product[]> {
  try {
    // Fetching from dummyjson which has more products
    const res = await fetch('https://dummyjson.com/products?limit=100');
    if (!res.ok) {
      throw new Error('Failed to fetch products from API');
    }
    const data: ProductsApiResponse = await res.json();
    
    // Fetch books separately
    const booksRes = await fetch('https://dummyjson.com/products/category/books');
    let bookData: Product[] = [];
    if(booksRes.ok) {
        const booksApiResponse: BooksApiResponse = await booksRes.json();
        bookData = booksApiResponse.products;
    } else {
        // Add some mock books if the category doesn't exist or fetch fails
        bookData = [
            { id: 101, title: "The Great Gatsby", price: 10.99, description: "A novel by F. Scott Fitzgerald.", category: "books", image: "https://picsum.photos/seed/the-great-gatsby/600/400", rating: 4.5, stock: 50, brand: "Penguin Classics" },
            { id: 102, title: "To Kill a Mockingbird", price: 12.50, description: "A novel by Harper Lee.", category: "books", image: "https://picsum.photos/seed/to-kill-a-mockingbird/600/400", rating: 4.8, stock: 30, brand: "HarperCollins" },
            { id: 103, title: "1984", price: 9.99, description: "A dystopian social science fiction novel by George Orwell.", category: "books", image: "https://picsum.photos/seed/1984/600/400", rating: 4.7, stock: 60, brand: "Signet Classics" },
            { id: 104, title: "Pride and Prejudice", price: 8.99, description: "A romantic novel of manners by Jane Austen.", category: "books", image: "https://picsum.photos/seed/pride-and-prejudice/600/400", rating: 4.6, stock: 45, brand: "Modern Library" }
        ];
    }
    
    // Map the products to match our Product type, specifically 'image' and 'rating'
    const allProducts = data.products.map(p => ({
        ...p,
        image: p.thumbnail, // dummyjson uses 'thumbnail' and 'images' array. We'll use thumbnail.
        rating: p.rating // dummyjson rating is a direct number
    }));

    return [...allProducts, ...bookData];

  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) {
           // If not in main products, check if it's one of our mock books
           if (parseInt(id, 10) >= 101 && parseInt(id, 10) <= 104) {
               const mockBooks = [
                    { id: 101, title: "The Great Gatsby", price: 10.99, description: "A novel by F. Scott Fitzgerald.", category: "books", image: "https://picsum.photos/seed/the-great-gatsby/600/400", rating: 4.5, stock: 50, brand: "Penguin Classics" },
                    { id: 102, title: "To Kill a Mockingbird", price: 12.50, description: "A novel by Harper Lee.", category: "books", image: "https://picsum.photos/seed/to-kill-a-mockingbird/600/400", rating: 4.8, stock: 30, brand: "HarperCollins" },
                    { id: 103, title: "1984", price: 9.99, description: "A dystopian social science fiction novel by George Orwell.", category: "books", image: "https://picsum.photos/seed/1984/600/400", rating: 4.7, stock: 60, brand: "Signet Classics" },
                    { id: 104, title: "Pride and Prejudice", price: 8.99, description: "A romantic novel of manners by Jane Austen.", category: "books", image: "https://picsum.photos/seed/pride-and-prejudice/600/400", rating: 4.6, stock: 45, brand: "Modern Library" }
               ];
               return mockBooks.find(book => book.id.toString() === id) || null;
           }
           return null;
        }
        const productData = await res.json();

        // Map the product to match our Product type
        return {
            ...productData,
            image: productData.thumbnail,
            rating: productData.rating,
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}
