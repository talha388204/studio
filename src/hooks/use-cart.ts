"use client";

import { create } from 'zustand';
import { useUser, useFirestore } from '@/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, writeBatch } from 'firebase/firestore';
import { useEffect } from 'react';
import { useToast } from './use-toast';
import { Product } from '@/lib/products';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type CartItem = {
  id: string;
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

interface CartState {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setCartItems: (items: CartItem[]) => void;
  setCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  isCartOpen: false,
  total: 0,
  setCartItems: (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    set({ cartItems: items, total });
  },
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  // Dummy functions, will be replaced by Firebase-aware functions in the hook
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
}));


export const useCart = () => {
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const { cartItems, setCartItems, ...rest } = useCartStore();

    useEffect(() => {
        if (user && firestore) {
            const cartCollectionRef = collection(firestore, 'users', user.uid, 'cart');
            const unsubscribe = onSnapshot(cartCollectionRef, (snapshot) => {
                const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CartItem));
                setCartItems(items);
            }, (error) => {
                 console.error("Error fetching cart items:", error);
                 const contextualError = new FirestorePermissionError({
                    operation: 'list',
                    path: cartCollectionRef.path,
                });
                errorEmitter.emit('permission-error', contextualError);
            });

            return () => unsubscribe();
        } else {
            // Clear cart when user logs out
            setCartItems([]);
        }
    }, [user, firestore, setCartItems]);


    const addToCart = async (product: Product, quantity = 1) => {
        if (!user || !firestore) {
            toast({
                variant: 'destructive',
                title: 'Not logged in',
                description: 'You need to be logged in to add items to the cart.',
            });
            return;
        }

        const cartCollectionRef = collection(firestore, 'users', user.uid, 'cart');
        const existingItem = cartItems.find(item => item.productId === product.id);

        if (existingItem) {
            const itemRef = doc(firestore, 'users', user.uid, 'cart', existingItem.id);
            const newQuantity = existingItem.quantity + quantity;
            updateDoc(itemRef, { quantity: newQuantity }).catch(error => {
                const contextualError = new FirestorePermissionError({
                    path: itemRef.path,
                    operation: 'update',
                    requestResourceData: { quantity: newQuantity },
                });
                errorEmitter.emit('permission-error', contextualError);
            });
        } else {
            const newItem = {
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity,
            };
            addDoc(cartCollectionRef, newItem).catch(error => {
                const contextualError = new FirestorePermissionError({
                    path: cartCollectionRef.path,
                    operation: 'create',
                    requestResourceData: newItem,
                });
                errorEmitter.emit('permission-error', contextualError);
            });
        }
        toast({
            title: "Added to cart",
            description: `${product.title} has been added to your cart.`,
        })
    };
    
    const removeFromCart = async (itemId: string) => {
        if (!user || !firestore) return;
        const itemRef = doc(firestore, 'users', user.uid, 'cart', itemId);
        deleteDoc(itemRef).catch(error => {
            const contextualError = new FirestorePermissionError({
                path: itemRef.path,
                operation: 'delete',
            });
            errorEmitter.emit('permission-error', contextualError);
        });
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        if (!user || !firestore) return;
        if (quantity < 1) {
            removeFromCart(itemId);
            return;
        }
        const itemRef = doc(firestore, 'users', user.uid, 'cart', itemId);
        updateDoc(itemRef, { quantity }).catch(error => {
            const contextualError = new FirestorePermissionError({
                path: itemRef.path,
                operation: 'update',
                requestResourceData: { quantity },
            });
            errorEmitter.emit('permission-error', contextualError);
        });
    };

    const clearCart = async () => {
        if (!user || !firestore) return;
        
        const batch = writeBatch(firestore);
        cartItems.forEach(item => {
            const itemRef = doc(firestore, 'users', user.uid, 'cart', item.id);
            batch.delete(itemRef);
        });

        await batch.commit().catch(error => {
            // Simplified error handling for batch, can be improved
            console.error("Error clearing cart:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not clear the cart.',
            });
        });
    };

    return { ...rest, cartItems, setCartItems, addToCart, removeFromCart, updateQuantity, clearCart };
};
