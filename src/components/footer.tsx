import { Package2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted py-6 md:py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Package2 className="h-6 w-6 text-primary" />
          <p className="text-sm font-bold font-headline">E-Commerce by Talha</p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} E-Commerce by Talha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
