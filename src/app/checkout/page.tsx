'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const addressSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  address: z.string().min(5, { message: 'Address is required.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  postalCode: z.string().min(4, { message: 'Postal code is required.' }),
  country: z.string().min(2, { message: 'Country is required.' }),
});

type AddressForm = z.infer<typeof addressSchema>;

export default function CheckoutPage() {
  const { cartItems, total, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  const handlePlaceOrder = async (data: AddressForm) => {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to place an order.' });
      return;
    }
    if (cartItems.length === 0) {
      toast({ variant: 'destructive', title: 'Empty Cart', description: 'Your cart is empty.' });
      return;
    }
    
    setIsPlacingOrder(true);
    
    const orderData = {
      userId: user.uid,
      items: cartItems,
      total,
      shippingAddress: data,
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    try {
      const ordersCollectionRef = collection(firestore, 'orders');
      await addDoc(ordersCollectionRef, orderData);
      
      clearCart();

      toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase. Your order is being processed.',
      });
      router.push('/');
    } catch (error) {
      console.error("Order placement error:", error);
      toast({
        variant: 'destructive',
        title: 'Order Failed',
        description: 'There was a problem placing your order. Please try again.',
      });
    } finally {
        setIsPlacingOrder(false);
    }
  };

  return (
    <div className="container mx-auto py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-center">Checkout</h1>
      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handlePlaceOrder)} id="checkout-form" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register('name')} />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" {...register('address')} />
                  {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
                </div>
                <div className="flex gap-4">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" {...register('city')} />
                      {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" {...register('postalCode')} />
                      {errors.postalCode && <p className="text-sm text-destructive">{errors.postalCode.message}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" {...register('country')} />
                  {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
                </div>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium line-clamp-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" form="checkout-form" className="w-full" size="lg" disabled={isPlacingOrder}>
                {isPlacingOrder ? <Loader2 className="animate-spin" /> : 'Place Order'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">Your cart is empty. Nothing to check out.</p>
          <Button onClick={() => router.push('/products')} className="mt-4">
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}
