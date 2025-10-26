export type Game = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  genre: string;
  platforms: string[];
};

export const games: Game[] = [
  {
    id: "cosmic-odyssey",
    slug: "cosmic-odyssey",
    name: "Cosmic Odyssey",
    description: "Explore galaxies in this epic space adventure.",
    longDescription: "Embark on a journey across the stars in Cosmic Odyssey. Pilot your own starship, discover uncharted planets, and trade with alien civilizations. With a dynamic universe and endless possibilities, your adventure is just beginning.",
    genre: "Sci-Fi RPG",
    platforms: ["PC", "PlayStation 5", "Xbox Series X"],
  },
  {
    id: "cyber-runner",
    slug: "cyber-runner",
    name: "Cyber Runner",
    description: "Race through neon-lit cities in a high-speed future.",
    longDescription: "In the sprawling metropolis of Neo-Kyoto, speed is everything. As a Cyber Runner, you'll take on dangerous delivery missions, outrun corporate security, and upgrade your hoverbike to be the fastest on the streets. Features a stunning synthwave soundtrack and breathtaking visuals.",
    genre: "Racing",
    platforms: ["PC", "Android", "iOS"],
  },
  {
    id: "mystic-quest",
    slug: "mystic-quest",
    name: "Mystic Quest",
    description: "Uncover ancient secrets in a world of magic.",
    longDescription: "The land of Eldoria is shrouded in mystery. As the chosen hero, you must delve into forgotten dungeons, solve ancient puzzles, and wield powerful magic to stop the encroaching darkness. A classic fantasy RPG with a modern twist.",
    genre: "Fantasy RPG",
    platforms: ["PC", "Nintendo Switch"],
  },
  {
    id: "ludo-king",
    slug: "ludo-king",
    name: "Ludo King",
    description: "The classic board game, reimagined for the digital age.",
    longDescription: "Gather your friends and family for a game of Ludo King! This digital version of the beloved classic supports up to 4 players online or locally. With fun animations and customizable rules, it's the perfect game for any occasion.",
    genre: "Board Game",
    platforms: ["Android", "iOS", "Web"],
  },
];
