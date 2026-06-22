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
      "a cat wearing a detailed Iron Man red and gold armor suit, Arc reactor on chest, superhero costume, cinematic lighting, high detail, 8k, cute cat face visible",
  },
  {
    id: "thor",
    name: "Thor",
    category: "avengers",
    emoji: "⚡",
    accent: "#3b82f6",
    description: "God of Thunder armor",
    prompt:
      "a cat dressed as Thor the Avenger, wearing Norse warrior armor with red cape and holding Mjolnir, lightning in background, cinematic, 8k, adorable cat face",
  },
  {
    id: "black-widow",
    name: "Black Widow",
    category: "avengers",
    emoji: "🕷️",
    accent: "#6b7280",
    description: "Elite spy suit",
    prompt:
      "a cat wearing a sleek black tactical spy suit like Black Widow, red hourglass emblem, utility belt, SHIELD badge, cinematic dark lighting, 8k cute cat",
  },
  {
    id: "captain-america",
    name: "Captain America",
    category: "avengers",
    emoji: "🛡️",
    accent: "#1d4ed8",
    description: "Star-spangled suit",
    prompt:
      "a cat wearing Captain America blue uniform with star emblem on chest, holding a vibranium shield with star, patriotic Avenger costume, 8k, detailed, cute cat",
  },
  {
    id: "thanos",
    name: "Thanos",
    category: "avengers",
    emoji: "💜",
    accent: "#7c3aed",
    description: "Infinity Gauntlet",
    prompt:
      "a cat wearing Thanos purple titan armor, golden Infinity Gauntlet on paw with all infinity stones glowing, powerful villain costume, epic cinematic lighting, 8k",
  },
  {
    id: "spider-man",
    name: "Spider-Man",
    category: "avengers",
    emoji: "🕸️",
    accent: "#dc2626",
    description: "Web-slinger suit",
    prompt:
      "a cat wearing Spider-Man red and blue suit with web pattern, shooting webs from paw, New York City in background, dynamic pose, Marvel superhero, 8k detail",
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
      "a cat wearing Naruto Uzumaki orange and black ninja jumpsuit from Naruto anime, ninja headband, whisker marks on face, Konoha leaf village symbol, 8k anime art style",
  },
  {
    id: "goku",
    name: "Goku",
    category: "anime",
    emoji: "🐉",
    accent: "#f59e0b",
    description: "Super Saiyan mode",
    prompt:
      "a cat dressed as Goku from Dragon Ball Z, wearing orange gi with blue belt, Super Saiyan golden spiky hair, power aura energy, Dragon Ball, 8k anime style",
  },
  {
    id: "sailor-moon",
    name: "Sailor Moon",
    category: "anime",
    emoji: "🌙",
    accent: "#ec4899",
    description: "Magical girl uniform",
    prompt:
      "a cat wearing Sailor Moon magical girl uniform, white leotard with blue sailor collar and red bow, crescent moon tiara, blonde pigtails wig, 8k cute anime style",
  },
  {
    id: "luffy",
    name: "Luffy",
    category: "anime",
    emoji: "🏴‍☠️",
    accent: "#ef4444",
    description: "Pirate King outfit",
    prompt:
      "a cat wearing Monkey D. Luffy outfit from One Piece, red vest, blue shorts, straw hat on head, pirate ship ocean background, Gear 5 transformation, 8k anime",
  },
  {
    id: "demon-slayer",
    name: "Tanjiro",
    category: "anime",
    emoji: "🌊",
    accent: "#0ea5e9",
    description: "Demon slayer uniform",
    prompt:
      "a cat wearing Tanjiro Kamado's green checkered haori and black demon slayer uniform from Kimetsu no Yaiba, holding nichirin blade, scar on forehead, 8k anime style",
  },
  {
    id: "vegeta",
    name: "Vegeta",
    category: "anime",
    emoji: "👑",
    accent: "#a855f7",
    description: "Saiyan Prince armor",
    prompt:
      "a cat wearing Vegeta Saiyan Prince blue armor from Dragon Ball Z, spiky widow's peak hair, white gloves and boots, power aura, royal proud pose, 8k anime",
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
      "a cat wearing a dark wizard robe with glowing arcane runes, tall pointed hat with stars, holding a glowing magical staff, spell book, mystical forest, 8k fantasy art",
  },
  {
    id: "knight",
    name: "Knight",
    category: "fantasy",
    emoji: "⚔️",
    accent: "#9ca3af",
    description: "Shining plate armor",
    prompt:
      "a cat wearing full shining medieval plate armor as a noble knight, holding a sword and shield with coat of arms, castle in background, dramatic lighting, 8k fantasy",
  },
  {
    id: "dragon-rider",
    name: "Dragon Rider",
    category: "fantasy",
    emoji: "🐲",
    accent: "#10b981",
    description: "Rider of dragons",
    prompt:
      "a cat wearing dragon rider leather armor and helmet, riding a majestic dragon in the sky, epic fantasy world, clouds, mountains below, 8k ultra detailed art",
  },
  {
    id: "elven-ranger",
    name: "Elven Ranger",
    category: "fantasy",
    emoji: "🏹",
    accent: "#84cc16",
    description: "Forest guardian",
    prompt:
      "a cat dressed as a graceful elven ranger, wearing green leather armor with leaf motifs, holding a bow, pointed ears, enchanted forest background, 8k fantasy art",
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
      "a cat dressed as a Jedi Master from Star Wars, wearing brown hooded robes, holding a glowing blue lightsaber, Death Star in background, cinematic lighting, 8k",
  },
  {
    id: "astronaut",
    name: "Astronaut",
    category: "scifi",
    emoji: "🚀",
    accent: "#64748b",
    description: "Space explorer",
    prompt:
      "a cat wearing a NASA astronaut space suit with helmet, floating in outer space with Earth visible below, stars and nebula, realistic space photography style, 8k",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    category: "scifi",
    emoji: "🤖",
    accent: "#f43f5e",
    description: "Neon city hacker",
    prompt:
      "a cat wearing a futuristic cyberpunk outfit, neon holographic jacket, cyber implants glowing, Night City neon lights background, rain, Blade Runner aesthetic, 8k",
  },
  {
    id: "mandalorian",
    name: "Mandalorian",
    category: "scifi",
    emoji: "🪖",
    accent: "#b45309",
    description: "Beskar armor warrior",
    prompt:
      "a cat wearing Mandalorian beskar armor from The Mandalorian Star Wars series, iconic helmet, jetpack, blaster holster, desert planet, 8k ultra detailed cinematic",
  },
];
