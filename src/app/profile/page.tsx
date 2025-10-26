import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="container max-w-screen-lg py-12">
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://picsum.photos/seed/user/200" alt="Gamer123" data-ai-hint="person avatar" />
          <AvatarFallback>G</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-headline font-bold">Gamer123</h1>
          <p className="text-muted-foreground">Joined 2023</p>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-headline font-semibold mb-4">My Preferences</h2>
            <Card>
                <CardContent className="p-6">
                    <p className="italic text-muted-foreground">"I love open-world RPGs like The Witcher 3, enjoy crafting systems, and prefer fantasy settings. I'm not a fan of horror games."</p>
                </CardContent>
            </Card>
        </div>
        <div>
            <h2 className="text-2xl font-headline font-semibold mb-4">Game Progress</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Cosmic Odyssey</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Main Quest: 78% Complete</p>
                        <p>Hours Played: 124</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">Cyber Runner</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Races Won: 56</p>
                        <p>Hours Played: 45</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
