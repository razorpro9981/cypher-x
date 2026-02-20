
import React, { useState } from 'react';
import Image from 'next/image';
import CyberBorder from './CyberBorder';
import ShuffleText from './ShuffleText';
import GlitchText from './GlitchText';

interface MenuCategory {
  name: string;
  items: { name: string; price: string; note?: string }[];
}

const menuCategories: MenuCategory[] = [
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
    ]
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
    ]
  },
  {
    name: 'PIZZA',
    items: [
      { name: 'Margherita', price: '100' },
      { name: 'Pepperoni', price: '130' },
      { name: 'Spicy Chicken', price: '130' },
      { name: 'Vegetarian', price: '120' },
      { name: 'Chicken Mushroom', price: '110' },
    ]
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
    ]
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
    ]
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
    ]
  },
  {
    name: 'SALAD',
    items: [
      { name: 'Pasta Salad', price: '120' },
      { name: 'Greek Salad', price: '105' },
      { name: 'Chicken Caesar', price: '100' },
      { name: 'Tuna Pasta Salad', price: '100' },
      { name: 'Kale Fattoush Salad', price: '100' },
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  },
];

const RestaurantPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const categoryImages: Record<string, string> = {
    STARTERS: '/media/food/chicken.jpg',
    BURGERS: '/media/food/burgers.jpg',
    PIZZA: '/media/food/pizza.jpg',
    MAIN_COURSE: '/media/food/main.jpg',
    SANDWICHES: '/media/food/sandwich.jpg',
    PASTA__NOODLES: '/media/food/noodles.jpg',
    SALAD: '/media/food/salad.jpg',
    SIDERS: '/media/food/siders.jpg',
    BREAKFAST: '/media/food/breakfast.jpg',
    CAKES__PASTRIES: '/media/food/pastries.jpg',
    HOT_DRINKS: '/media/food/hot_drinks.jpg',
    DRINKS: '/media/food/drinks.jpg',
    SHISHA: '/media/food/shisha.jpg',
  };

  const filteredCategories = activeCategory === 'ALL'
    ? menuCategories
    : menuCategories.filter(cat => cat.name === activeCategory);

  const categoryNames = ['ALL', ...menuCategories.map(c => c.name)];

  return (
    <main className="relative pt-32 pb-20 min-h-screen bg-background-dark overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-grid-moving opacity-10 pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.05)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px w-8 md:w-12 bg-primary"></div>
              <span className="text-primary font-pixel text-[8px] md:text-[10px] tracking-widest uppercase">Gastro_Sync_System</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-pixel text-white leading-none tracking-tighter">
              <GlitchText text="NEON" color="white" persistent /><br/>
              <span className="text-secondary neon-glow-magenta"><ShuffleText text="BITES" delay={400} /></span>
            </h1>
            <p className="text-xs text-slate-500 font-pixel tracking-widest uppercase">All prices in GHC</p>
          </div>

          <div className="flex flex-wrap gap-2 max-w-lg">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 font-pixel text-[7px] tracking-[0.15em] border transition-all ${
                  activeCategory === cat
                    ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                    : 'border-white/10 text-slate-500 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'FULL_MENU' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Categories */}
        <div className="space-y-12">
          {filteredCategories.map((category, catIdx) => (
            <div
              key={category.name}
              className="animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${catIdx * 0.1}s` }}
            >
              <CyberBorder className="bg-black/40 border-white/5 overflow-hidden">
                {/* Category Image */}
                <div className="relative h-56 md:h-72 border-b border-white/10 overflow-hidden">
                  <Image
                    src={
                      categoryImages[category.name] ||
                      categoryImages[category.name.replace('&', '__')] ||
                      '/media/arcade/exterior-front.jpeg'
                    }
                    alt={category.name}
                    fill
                    className="object-cover scale-[1.05] saturate-150 contrast-115"
                    sizes="(min-width: 1024px) 1100px, 100vw"
                    priority={catIdx < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.15)_0%,transparent_55%)] pointer-events-none"></div>
                </div>

                {/* Category Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#00f3ff]"></div>
                    <h2 className="text-lg md:text-2xl font-display font-black text-white tracking-tight">
                      {category.name.replace(/_/g, ' ')}
                    </h2>
                  </div>
                  <div className="text-[8px] font-pixel text-slate-600 tracking-widest">
                    {category.items.length}_ITEMS
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-white/5">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group px-6 py-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-[8px] font-pixel text-slate-600 w-6">{String(idx + 1).padStart(2, '0')}</span>
                          <h3 className="text-sm md:text-base font-body font-bold text-slate-200 group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        {item.note && (
                          <p className="text-[10px] text-slate-500 font-body ml-9 mt-1">{item.note}</p>
                        )}
                      </div>
                      <div className="bg-white/5 border border-white/10 px-4 py-2 font-display font-black text-primary text-sm group-hover:border-primary/50 group-hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all">
                        ₵{item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </CyberBorder>
            </div>
          ))}
        </div>

        {/* Tactical Footer Readout */}
        <div className="mt-20 p-8 border border-dashed border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 border border-primary p-1 rounded-full group">
               <div className="w-full h-full bg-slate-900 flex items-center justify-center rounded-full group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-2xl">restaurant</span>
               </div>
            </div>
            <div>
              <div className="text-[10px] font-pixel text-primary mb-1 uppercase tracking-widest">Kitchen_Status</div>
              <p className="text-xs text-slate-400 font-body max-w-sm">
                Fresh ingredients prepared daily at Cypherzone HQ. From starters to shisha, we fuel your gaming sessions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-[8px] font-pixel text-slate-600 mb-2">KITCHEN_HEAT</div>
              <div className="w-40 h-1 bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-secondary w-3/4 animate-pulse"></div>
              </div>
            </div>
            <div className="px-4 py-2 bg-black border border-green-500/50 text-green-500 font-pixel text-[10px] animate-pulse">
              STATUS: SERVING
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default RestaurantPage;
