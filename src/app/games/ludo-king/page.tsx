import LudoKingBoard from "@/components/games/ludo-king-board";

export default function LudoKingPage() {
    return (
        <div className="flex flex-col items-center justify-center bg-muted/40 py-12 md:py-20 min-h-[calc(100vh-112px)]">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Ludo King</h1>
                <p className="mt-2 text-lg text-muted-foreground">The classic game of strategy and luck.</p>
            </div>
            <LudoKingBoard />
        </div>
    );
}
