export type GameCategory = 'ACTION' | 'HORROR' | 'RHYTHM' | 'SIM';

export interface Game {
  id: string;
  title: string;
  category: GameCategory;
  players: string;
  intensity: 'LOW' | 'MED' | 'HIGH' | 'MAX';
  image: string;
  description: string;
  syncLevel: string;
  price: string;
}

export type NewsCategory = 'SYSTEM_UPDATE' | 'EVENT' | 'INTEL' | 'CLASSIFIED';
export type NewsClearance = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'OVERRIDE';

export interface NewsItem {
  id: string;
  date: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  clearance: NewsClearance;
}

export interface MenuItem {
  name: string;
  price: string;
  note?: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface PricingData {
  card: { name: string; price: string; description: string };
  topups: { name: string; credits: number; price: string; bonus: string; recommended?: boolean }[];
  gameRates: { title: string; cost: string }[];
}

export interface SiteData {
  hero: { title1: string; title2: string; tagline: string };
  pricing: PricingData;
  systemStatus: string;
  games: Game[];
  news: NewsItem[];
  menu: MenuCategory[];
}

export const defaultGames: Game[] = [
  {
    id: 'g1',
    title: 'VR_360',
    category: 'SIM',
    players: '1-4',
    intensity: 'HIGH',
    image: '/media/games/1.png',
    description: 'Full 360-degree immersive VR experience. Rotate, spin, and dive into virtual worlds.',
    syncLevel: '98%',
    price: '55',
  },
  {
    id: 'g2',
    title: 'FLYING_RIDE',
    category: 'SIM',
    players: '1-2',
    intensity: 'HIGH',
    image: '/media/games/2.png',
    description: 'Soar through breathtaking aerial landscapes in a fully enclosed flight simulator.',
    syncLevel: '99%',
    price: '55',
  },
  {
    id: 'g3',
    title: 'SPEED_RIDER',
    category: 'ACTION',
    players: '1',
    intensity: 'MAX',
    image: '/media/games/3.png',
    description: 'High-speed motorcycle racing through neon-lit cyberpunk cityscapes. Feel every turn.',
    syncLevel: '97%',
    price: '40',
  },
  {
    id: 'g4',
    title: 'TAKE_OFF_NOW',
    category: 'SIM',
    players: '1-4',
    intensity: 'MED',
    image: '/media/games/4.png',
    description: 'Free-roam VR adventure with full-body tracking. Walk, run, and explore virtual dimensions.',
    syncLevel: '94%',
    price: '55',
  },
  {
    id: 'g5',
    title: 'FLYING_CAR',
    category: 'ACTION',
    players: '1-4',
    intensity: 'HIGH',
    image: '/media/games/5.png',
    description: 'Multi-seat flying vehicle simulator. Navigate aerial combat zones with your squad.',
    syncLevel: '95%',
    price: '45',
  },
  {
    id: 'g6',
    title: '7D_CINEMA',
    category: 'SIM',
    players: '2-8',
    intensity: 'MED',
    image: '/media/games/6.png',
    description: 'Next-gen cinematic experience with motion seats, wind, and sensory effects.',
    syncLevel: '100%',
    price: '90',
  },
  {
    id: 'g7',
    title: 'SPEED_RACER',
    category: 'ACTION',
    players: '1',
    intensity: 'MAX',
    image: '/media/games/7.png',
    description: 'Professional racing simulator with full cockpit controls. G-force feedback enabled.',
    syncLevel: '96%',
    price: '40',
  },
  {
    id: 'g8',
    title: 'GUN_FIGHT_HERO',
    category: 'ACTION',
    players: '1-2',
    intensity: 'HIGH',
    image: '/media/games/8.png',
    description: 'Arcade-style shooting experience. Test your aim and reflexes in intense combat scenarios.',
    syncLevel: '92%',
    price: '40',
  },
  {
    id: 'g9',
    title: 'PLAYSTATION_ZONE',
    category: 'SIM',
    players: '1-4',
    intensity: 'LOW',
    image: '/media/games/9.png',
    description: 'Premium gaming lounge with latest PlayStation consoles and racing sim setups.',
    syncLevel: '100%',
    price: '40',
  },
];

export const defaultNews: NewsItem[] = [
  {
    id: '1',
    date: '2026.02.14',
    category: 'EVENT',
    title: "VALENTINE'S DAY SPECIALS",
    excerpt: '5 exclusive couples packages from ₵350 to ₵850. VR experiences + dining combos for 2-4 people.',
    content:
      "Celebrate love at Cypherzone! Package 1: First Date Reloaded (₵350) - 1 VR game + 2 Burgers/Pizza + Fries + 2 Soft Drinks. Package 2: Love & Adrenaline (₵450) - 2 VR games + Combo Platter + Pizza + 2 Drinks. Package 3: Escape Reality (₵550) - Flying Ride + VR 360 + Mozzarella Sticks + 2 Burgers + 2 Ice Creams. Package 4: Forever Mode (₵750) - Any 3 VR games + Chicken Tenders + Jollof & Fried Chicken + 2 Drinks. Package 5: Double Date Chaos (₵850 for 4 people) - Flying Ride + Battle Cage + Flying Car + 7D Cinema + 2 Pizzas + 4 Pcs Broasted Chicken + 4 Ice Creams + 4 Drinks. Call +233 26 011 6116 to book!",
    image: '/media/vals.png',
    clearance: 'LEVEL_1',
  },
  {
    id: '2',
    date: '2026.02.10',
    category: 'SYSTEM_UPDATE',
    title: '9 VR EXPERIENCES NOW LIVE',
    excerpt: 'Full game lineup deployed. Speed Rider, VR 360, Flying Ride, 7D Cinema, Speed Racer and more.',
    content:
      'All 9 VR stations are now fully operational. Prices range from ₵40 to ₵90 per person per game. Speed Rider (₵40), Gun Fight Hero (₵40), Race Simulator (₵40), VR 360 (₵55), Take Off Now (₵55), Battle Cage (₵45 each), Flying Ride (₵55), 4x4 Adventures (₵45), Cinema 7D (₵90).',
    image: '/media/games/7.png',
    clearance: 'LEVEL_1',
  },
  {
    id: '3',
    date: '2026.02.05',
    category: 'INTEL',
    title: 'NEON_BITES FULL MENU',
    excerpt: 'Complete restaurant menu now serving. Burgers, pizza, shawarma, broasted chicken, shisha and more.',
    content:
      'Our Neon Bites kitchen is fully operational with 13 menu categories. Starters from ₵40, Burgers from ₵115, Pizza from ₵100, Main Course dishes, Sandwiches, Pasta & Noodles, Salads, Breakfast, Cakes & Pastries, Hot Drinks, Cold Drinks, Shakes, and Shisha. All freshly prepared daily at Cypherzone HQ.',
    image: '/media/arcade/exterior-front.jpeg',
    clearance: 'LEVEL_1',
  },
  {
    id: '4',
    date: '2026.02.01',
    category: 'SYSTEM_UPDATE',
    title: 'BATTLE_CAGE ACTIVATED',
    excerpt: 'The Starship Troopers VR combat arena is now open. Gear up and go to war.',
    content:
      'Our indoor combat zone featuring the Starship Troopers experience is now fully online. ₵45 per person. Full-body immersion with squad-based gameplay. Walk-ins welcome.',
    image: '/media/arcade/interior-starship.jpeg',
    clearance: 'LEVEL_2',
  },
  {
    id: '5',
    date: '2026.01.20',
    category: 'INTEL',
    title: 'PLAYSTATION_ZONE OPEN',
    excerpt: 'Premium gaming lounge with the latest PlayStation consoles and racing sim setups.',
    content:
      'Relax in our dedicated PlayStation Zone. Multiple stations with the latest consoles, racing simulators, and comfortable seating. Perfect for casual gaming between VR sessions.',
    image: '/media/games/9.png',
    clearance: 'LEVEL_1',
  },
  {
    id: '6',
    date: '2026.01.15',
    category: 'EVENT',
    title: 'GRAND OPENING',
    excerpt: 'Cypherzone VR Universe is officially open in Ghana. Redefine your reality.',
    content:
      "We are proud to announce the grand opening of Cypherzone VR Universe - Ghana's premier VR entertainment destination. Featuring 9 immersive VR experiences, a full-service restaurant, and a premium gaming lounge. Visit us today!",
    image: '/media/arcade/exterior-side.jpeg',
    clearance: 'LEVEL_1',
  },
];

export const defaultMenu: MenuCategory[] = [
  {
    name: 'STARTERS',
    items: [
      { name: 'Mac & Cheese', price: '80' },
      { name: 'Chicken Wings', price: '80' },
      { name: 'Chicken Tenders', price: '90', note: 'Plain, BBQ, Buffalo' },
      { name: 'Loaded Fries', price: '120' },
      { name: 'Fried Plantain (Kelewele)', price: '40' },
      { name: 'Mozzarella Sticks 6pcs', price: '90' },
      { name: 'Shrimp Dynamite', price: '120' },
      { name: 'Loaded Nachos', price: '105' },
      { name: 'Sliders', price: '85', note: '3 Mini Burgers' },
      { name: 'Combo Platter (Sharing)', price: '215', note: 'Wings, Tenders, Mozzarella, Kelewele, Shrimps, Fries' },
    ],
  },
  {
    name: 'BURGERS',
    items: [
      { name: 'Classic Burger', price: '115' },
      { name: "Grill'd Chicken Burger", price: '130', note: 'Buffalo Dipped' },
      { name: 'Southern Fried Chicken', price: '140' },
      { name: 'Mushroom Burger', price: '140' },
      { name: 'BBQ Burger', price: '145' },
      { name: 'Smashed Burger', price: '125' },
      { name: 'Waffle Burger', price: '135' },
    ],
  },
  {
    name: 'PIZZA',
    items: [
      { name: 'Margherita', price: '100' },
      { name: 'Pepperoni', price: '130' },
      { name: 'Spicy Chicken', price: '130' },
      { name: 'Vegetarian', price: '120' },
      { name: 'Chicken Mushroom', price: '110' },
    ],
  },
  {
    name: 'MAIN_COURSE',
    items: [
      { name: '4 Pcs Broasted Chicken', price: '63' },
      { name: '6 Pcs Broasted Chicken', price: '88' },
      { name: '9 Pcs Broasted Chicken', price: '123' },
      { name: '12 Pcs Broasted Chicken', price: '175' },
      { name: 'Roasted Chicken (Full)', price: '200' },
      { name: 'Half Roasted Chicken', price: '105' },
      { name: 'Jollof & Fried Fish Fillet', price: '120' },
      { name: 'Jollof & Fried Chicken', price: '100' },
      { name: 'Waakye', price: '95' },
      { name: 'Tilapia with Jollof', price: '150' },
      { name: 'Mix Grilled Platter', price: '170' },
      { name: 'Sweet & Sour Chicken', price: '110' },
      { name: 'Stir Fry Beef', price: '150' },
    ],
  },
  {
    name: 'SANDWICHES',
    items: [
      { name: 'Philly Steak', price: '85' },
      { name: 'Chicken Shawarma', price: '80' },
      { name: 'Beef Shawarma', price: '80' },
      { name: 'Tawouk Sandwich', price: '80' },
      { name: 'Chicken Fajita Sandwich', price: '95' },
      { name: 'Classic Falafel', price: '65' },
      { name: 'Hot Dogs (Texas)', price: '65' },
    ],
  },
  {
    name: 'PASTA__NOODLES',
    items: [
      { name: 'Spaghetti Bolognese', price: '120' },
      { name: 'Fettucini Alfredo', price: '130' },
      { name: 'Penne Arabiatta', price: '90' },
      { name: 'Spicy Beef Noodles', price: '90' },
      { name: 'Spicy Chicken Noodles', price: '90' },
      { name: 'Vegetable Noodles', price: '90' },
    ],
  },
  {
    name: 'SALAD',
    items: [
      { name: 'Pasta Salad', price: '120' },
      { name: 'Greek Salad', price: '105' },
      { name: 'Chicken Caesar', price: '100' },
      { name: 'Tuna Pasta Salad', price: '100' },
      { name: 'Kale Fattoush Salad', price: '100' },
    ],
  },
  {
    name: 'SIDERS',
    items: [
      { name: 'Fries', price: '50' },
      { name: 'Shrimps Fried Rice', price: '100' },
      { name: 'Beef Fried Rice', price: '100' },
      { name: 'Chicken Fried Rice', price: '80' },
      { name: "Grill'd Chicken Breast", price: '40' },
      { name: 'Jollof Rice', price: '45' },
      { name: 'Steamed Rice', price: '25' },
      { name: 'Side Salad', price: '35' },
      { name: 'Extra Eggs 3 Pcs', price: '25' },
      { name: 'Sauces', price: '5' },
      { name: 'Extra Cheese', price: '15' },
    ],
  },
  {
    name: 'BREAKFAST',
    items: [
      { name: 'Cheese & Vegetable Omelette', price: '60' },
      { name: 'Turkey & Cheese', price: '85' },
      { name: 'Spicy Cheese', price: '75' },
      { name: 'Zaatar & Cheese', price: '75' },
      { name: 'Sausage & Eggs', price: '70' },
      { name: 'Croissant', price: '45', note: 'Plain 30 GHC / Cheese, Thyme, Chocolate' },
      { name: 'Waffles', price: '75' },
      { name: 'Pancakes', price: '75' },
    ],
  },
  {
    name: 'CAKES__PASTRIES',
    items: [
      { name: 'Cheese Cake Cups', price: '55' },
      { name: 'San Sebastian', price: '55' },
      { name: 'Cupcakes', price: '35' },
      { name: 'Tiramisu Cups', price: '55' },
      { name: 'Brownies', price: '65' },
      { name: 'Muffins', price: '35' },
      { name: 'Donuts', price: '25' },
    ],
  },
  {
    name: 'HOT_DRINKS',
    items: [
      { name: 'Tea', price: '30' },
      { name: 'Espresso', price: '30' },
      { name: 'Double Espresso', price: '45' },
      { name: 'Cappuccino', price: '50' },
      { name: 'Latte', price: '55' },
      { name: 'American Coffee', price: '40' },
    ],
  },
  {
    name: 'DRINKS',
    items: [
      { name: 'Slushie', price: '35', note: 'Lemon, Mix Fruits, Mango, Pineapple, Tangerine' },
      { name: 'Vanilla Shake', price: '65' },
      { name: 'Strawberry Shake', price: '65' },
      { name: 'Chocolate Shake', price: '65' },
      { name: 'Oreo Shake', price: '65' },
      { name: 'Soft Drinks', price: '15' },
      { name: 'Water', price: '10' },
      { name: 'Ice Cream (Gelato) Per Scoop', price: '25' },
      { name: 'Ice Cream Cone', price: '25' },
      { name: 'Cotton Candy', price: '15' },
    ],
  },
  {
    name: 'SHISHA',
    items: [
      { name: 'Gum & Mint', price: '100' },
      { name: 'Lemon & Mint', price: '100' },
      { name: 'Mint', price: '100' },
      { name: 'Love', price: '105' },
      { name: 'Apple', price: '105' },
      { name: 'Blueberry', price: '105' },
    ],
  },
];

export const defaultSiteData: SiteData = {
  hero: {
    title1: 'CYPHER',
    title2: 'ZONE',
    tagline: "Ghana's premier reality-bending neural simulation arena.",
  },
  pricing: {
    card: { name: 'ARCADE_CARD', price: '50', description: 'Lifetime member card. Mandatory for all players.' },
    topups: [
      { name: 'STARTER_PACK', credits: 50, price: '50', bonus: '0' },
      { name: 'POPULAR_PACK', credits: 120, price: '120', bonus: '20', recommended: true },
      { name: 'PRO_PACK', credits: 300, price: '250', bonus: '50' },
    ],
    gameRates: [
      { title: 'SPEED_RIDER', cost: '40' },
      { title: 'GUN_FIGHT_HERO', cost: '40' },
      { title: 'RACE_SIMULATOR', cost: '40' },
      { title: 'VR_360', cost: '55' },
      { title: 'TAKE_OFF_NOW', cost: '55' },
      { title: 'BATTLE_CAGE', cost: '45' },
      { title: 'FLYING_RIDE', cost: '55' },
      { title: '4X4_ADVENTURES', cost: '45' },
      { title: 'CINEMA_7D', cost: '90' },
    ],
  },
  systemStatus: 'INTEGRITY: OPTIMAL\nNEURAL_LINK: ACTIVE\nLOCATION: SECTOR_7G',
  games: defaultGames,
  news: defaultNews,
  menu: defaultMenu,
};

export const STORAGE_KEY = 'cypherzone_config';

export const mergeSiteData = (raw: Partial<SiteData> | undefined | null): SiteData => {
  if (!raw || typeof raw !== 'object') return defaultSiteData;

  return {
    hero: { ...defaultSiteData.hero, ...(raw.hero || {}) },
    pricing: {
      ...defaultSiteData.pricing,
      ...(raw.pricing || {}),
      card: { ...defaultSiteData.pricing.card, ...(raw.pricing?.card || {}) },
      topups: raw.pricing?.topups ?? defaultSiteData.pricing.topups,
      gameRates: raw.pricing?.gameRates ?? defaultSiteData.pricing.gameRates,
    },
    systemStatus: raw.systemStatus ?? defaultSiteData.systemStatus,
    games: raw.games ?? defaultSiteData.games,
    news: raw.news ?? defaultSiteData.news,
    menu: raw.menu ?? defaultSiteData.menu,
  };
};
