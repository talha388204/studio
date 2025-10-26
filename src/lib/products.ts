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
};

// The API response from dummyjson is an object with a 'products' array
type ProductsApiResponse = {
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
    
    // Map the products to match our Product type, specifically 'image' and 'rating'
    return data.products.map(p => ({
        ...p,
        image: p.thumbnail, // dummyjson uses 'thumbnail' and 'images' array. We'll use thumbnail.
        rating: p.rating // dummyjson rating is a direct number
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) {
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
