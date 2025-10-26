import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 py-6 md:py-8">
      <div className="container max-w-screen-2xl flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <p className="text-sm font-bold font-headline">Ekta Game Studio</p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ekta Game Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
