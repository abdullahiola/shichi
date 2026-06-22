export interface Costume {
  id: string;
  name: string;
  category: "avengers" | "anime" | "fantasy" | "scifi";
  emoji: string;
  prompt: string;
  accent: string;
  description: string;
}

export const COSTUME_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "avengers", label: "⚡ Avengers" },
  { id: "anime", label: "🌸 Anime" },
  { id: "fantasy", label: "🔮 Fantasy" },
  { id: "scifi", label: "🚀 Sci-Fi" },
] as const;

// Prompts written as FLUX Kontext edit instructions:
// "Dress the cat in X" — the model preserves the cat's identity and adds the costume

export const COSTUMES: Costume[] = [
  // Avengers
  {
    id: "iron-man",
    name: "Iron Man",
    category: "avengers",
    emoji: "🦾",
    accent: "#ef4444",
    description: "Red & gold nano-suit",
    prompt:
      "Dress the cat in a miniature Iron Man red and gold armored suit. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume clothing around the cat's body.",
  },
  {
    id: "thor",
    name: "Thor",
    category: "avengers",
    emoji: "⚡",
    accent: "#3b82f6",
    description: "God of Thunder armor",
    prompt:
      "Dress the cat in a miniature Thor Norse warrior costume with silver armor and a red cape. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume clothing around the cat.",
  },
  {
    id: "black-widow",
    name: "Black Widow",
    category: "avengers",
    emoji: "🕷️",
    accent: "#6b7280",
    description: "Elite spy suit",
    prompt:
      "Dress the cat in a miniature sleek black tactical spy suit with a utility belt. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume clothing around the cat.",
  },
  {
    id: "captain-america",
    name: "Captain America",
    category: "avengers",
    emoji: "🛡️",
    accent: "#1d4ed8",
    description: "Star-spangled suit",
    prompt:
      "Dress the cat in a miniature Captain America blue uniform with a white star on the chest and a small shield prop. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume around the cat.",
  },
  {
    id: "thanos",
    name: "Thanos",
    category: "avengers",
    emoji: "💜",
    accent: "#7c3aed",
    description: "Infinity Gauntlet",
    prompt:
      "Dress the cat in a miniature purple Thanos titan armor outfit and place a small golden Infinity Gauntlet on one paw. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume around the cat.",
  },
  {
    id: "spider-man",
    name: "Spider-Man",
    category: "avengers",
    emoji: "🕸️",
    accent: "#dc2626",
    description: "Web-slinger suit",
    prompt:
      "Dress the cat in a miniature Spider-Man red and blue suit with web patterns. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume clothing around the cat.",
  },

  // Anime
  {
    id: "naruto",
    name: "Naruto",
    category: "anime",
    emoji: "🍜",
    accent: "#f97316",
    description: "Hokage ninja outfit",
    prompt:
      "Dress the cat in a miniature Naruto orange and black ninja jumpsuit and place a small ninja headband on its head. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume around the cat.",
  },
  {
    id: "goku",
    name: "Goku",
    category: "anime",
    emoji: "🐉",
    accent: "#f59e0b",
    description: "Super Saiyan mode",
    prompt:
      "Dress the cat in a miniature orange Dragon Ball Z gi outfit with a blue belt. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume clothing around the cat.",
  },
  {
    id: "sailor-moon",
    name: "Sailor Moon",
    category: "anime",
    emoji: "🌙",
    accent: "#ec4899",
    description: "Magical girl uniform",
    prompt:
      "Dress the cat in a miniature Sailor Moon magical girl uniform with a white leotard, blue sailor collar, and red bow. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume around the cat.",
  },
  {
    id: "luffy",
    name: "Luffy",
    category: "anime",
    emoji: "🏴‍☠️",
    accent: "#ef4444",
    description: "Pirate King outfit",
    prompt:
      "Dress the cat in a miniature Monkey D. Luffy pirate outfit with a red vest and place a small straw hat on its head. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume around the cat.",
  },
  {
    id: "demon-slayer",
    name: "Tanjiro",
    category: "anime",
    emoji: "🌊",
    accent: "#0ea5e9",
    description: "Demon slayer uniform",
    prompt:
      "Dress the cat in a miniature green checkered haori cape and black demon slayer uniform from Demon Slayer. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume around the cat.",
  },
  {
    id: "vegeta",
    name: "Vegeta",
    category: "anime",
    emoji: "👑",
    accent: "#a855f7",
    description: "Saiyan Prince armor",
    prompt:
      "Dress the cat in a miniature Vegeta blue and white Saiyan armor from Dragon Ball Z. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume around the cat.",
  },

  // Fantasy
  {
    id: "wizard",
    name: "Dark Wizard",
    category: "fantasy",
    emoji: "🧙",
    accent: "#6366f1",
    description: "Ancient spell caster",
    prompt:
      "Dress the cat in a miniature dark wizard robe with mystical runes and place a tall pointed wizard hat with stars on its head. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume around the cat.",
  },
  {
    id: "vampire",
    name: "Vampire",
    category: "fantasy",
    emoji: "🧛",
    accent: "#dc2626",
    description: "Vampire cape",
    prompt:
      "Dress the cat in a miniature vampire costume with a black cape lined in red and a red collar ruff around the neck. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the cape costume around the cat.",
  },
  {
    id: "knight",
    name: "Knight",
    category: "fantasy",
    emoji: "⚔️",
    accent: "#9ca3af",
    description: "Shining plate armor",
    prompt:
      "Dress the cat in a miniature shining silver medieval knight plate armor outfit. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the armor costume around the cat.",
  },
  {
    id: "elven-ranger",
    name: "Elven Ranger",
    category: "fantasy",
    emoji: "🏹",
    accent: "#84cc16",
    description: "Forest guardian",
    prompt:
      "Dress the cat in a miniature green elven leather armor with leaf motifs and a small bow prop. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume around the cat.",
  },

  // Sci-Fi
  {
    id: "jedi",
    name: "Jedi Master",
    category: "scifi",
    emoji: "⚔️",
    accent: "#22d3ee",
    description: "Force wielder",
    prompt:
      "Dress the cat in a miniature Jedi Master brown hooded robe and place a small glowing blue lightsaber prop near its paw. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume around the cat.",
  },
  {
    id: "astronaut",
    name: "Astronaut",
    category: "scifi",
    emoji: "🚀",
    accent: "#64748b",
    description: "Space explorer",
    prompt:
      "Dress the cat in a miniature white NASA astronaut spacesuit. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the spacesuit costume around the cat.",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    category: "scifi",
    emoji: "🤖",
    accent: "#f43f5e",
    description: "Neon city hacker",
    prompt:
      "Dress the cat in a miniature futuristic neon cyberpunk jacket with glowing accents. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the costume clothing around the cat.",
  },
  {
    id: "mandalorian",
    name: "Mandalorian",
    category: "scifi",
    emoji: "🪖",
    accent: "#b45309",
    description: "Beskar armor warrior",
    prompt:
      "Dress the cat in a miniature Mandalorian beskar silver armor outfit and place a small T-visor helmet on its head. Keep the cat's face, fur, eyes, and body completely unchanged. Only add the armor costume around the cat.",
  },
];
