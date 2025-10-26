"use client";

import Link from "next/link";
import { ShoppingCart, Package2, Search, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "./ui/badge";

export default function Header() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const { setCartOpen, cartItems } = useCart();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
            router.push('/');
        } catch (error) {
            console.error("Logout Error:", error);
            toast({
                variant: "destructive",
                title: "Logout Failed",
                description: "An error occurred during logout. Please try again.",
            });
        }
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
                <Package2 className="h-7 w-7 text-primary" />
                <span className="font-bold font-headline text-xl">E-Commerce</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <Link href="/" className="transition-colors hover:text-primary">Home</Link>
                <Link href="/products" className="transition-colors hover:text-primary">All Products</Link>
            </nav>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-end gap-2">
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9 bg-muted/50 focus:bg-background" />
            </div>
            <Button variant="ghost" size="icon" className="group relative" onClick={() => setCartOpen(true)}>
                <ShoppingCart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                {totalItems > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs">
                        {totalItems}
                    </Badge>
                )}
                <span className="sr-only">Cart</span>
            </Button>
            {!isUserLoading && (
                user ? (
                    <Button variant="ghost" size="icon" className="group" onClick={handleLogout}>
                        <LogOut className="h-5 w-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                        <span className="sr-only">Logout</span>
                    </Button>
                ) : (
                    <Button asChild variant="ghost" size="icon" className="group">
                        <Link href="/login">
                            <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="sr-only">Account</span>
                        </Link>
                    </Button>
                )
            )}
        </div>

        <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" className="group relative" onClick={() => setCartOpen(true)}>
                <ShoppingCart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                {totalItems > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs">
                        {totalItems}
                    </Badge>
                )}
                <span className="sr-only">Cart</span>
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-background/95 backdrop-blur-lg">
                    <nav className="grid gap-6 text-lg font-medium mt-8">
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                            <Package2 className="h-6 w-6 text-primary" />
                            <span>E-Commerce</span>
                        </Link>
                        <Link href="/" className="hover:text-primary text-muted-foreground">Home</Link>
                        <Link href="/products" className="hover:text-primary text-muted-foreground">All Products</Link>
                         <div className="flex items-center gap-4 mt-4">
                             {!isUserLoading && (
                                user ? (
                                    <Button variant="ghost" size="icon" className="group" onClick={handleLogout}>
                                        <LogOut className="h-5 w-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                                        <span className="sr-only">Logout</span>
                                    </Button>
                                ) : (
                                    <Button asChild variant="ghost" size="icon" className="group">
                                        <Link href="/login">
                                            <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                            <span className="sr-only">Account</span>
                                        </Link>
                                    </Button>
                                )
                            )}
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
