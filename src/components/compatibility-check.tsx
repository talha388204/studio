"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Smartphone, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CompatibilityCheck() {
  const [device, setDevice] = useState("");
  const [result, setResult] = useState<"compatible" | "incompatible" | "checking" | null>(null);
  
  const handleCheck = () => {
    if (!device) return;
    setResult("checking");
    // Simulate an API call
    setTimeout(() => {
        // Simple logic for demo purposes
        const isCompatible = Math.random() > 0.3;
        setResult(isCompatible ? "compatible" : "incompatible");
    }, 1500);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Smartphone /> Compatibility Check
        </CardTitle>
        <CardDescription>
            Enter your device model to see if it's supported.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="e.g., Samsung Galaxy S23" 
            value={device}
            onChange={(e) => {
              setDevice(e.target.value);
              setResult(null);
            }}
          />
          <Button onClick={handleCheck} disabled={!device || result === "checking"}>
            {result === "checking" ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Check'}
          </Button>
        </div>
        {result === "compatible" && (
            <div className="flex items-center text-green-600 font-medium">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Congratulations! Your device is compatible.
            </div>
        )}
        {result === "incompatible" && (
            <div className="flex items-center text-red-600 font-medium">
                <XCircle className="mr-2 h-4 w-4" />
                Unfortunately, your device is not supported yet.
            </div>
        )}
      </CardContent>
    </Card>
  );
}
