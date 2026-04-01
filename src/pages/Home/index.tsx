import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { type Product } from "../../types";
import { HiOutlinePlus, HiOutlineTag } from "react-icons/hi2";
import { PiDogFill, PiCatFill, PiBirdFill, PiFishFill } from "react-icons/pi";
import { MdLocalShipping } from "react-icons/md";
import { BsShieldCheck, BsArrowRepeat, BsCreditCard } from "react-icons/bs";

const categoryIcons: Record<string, React.ReactNode> = {
  Dogs: <PiDogFill size={13} />,
  Cats: <PiCatFill size={13} />,
  Birds: <PiBirdFill size={13} />,
  Fish: <PiFishFill size={13} />,
};

const products: Product[] = [
  { id: 1, name: "Premium Dry Dog Food", category: "Dogs", desc: "Grain-free formula with real chicken.", price: 89.90, emoji: "🐕", badge: "Best Seller" },
  { id: 2, name: "Cat Dental Treats", category: "Cats", desc: "Keeps teeth clean while satisfying snack cravings.", price: 34.50, emoji: "🐱", badge: null },
  { id: 3, name: "Interactive Feather Wand", category: "Cats", desc: "Crinkle feathers and bells for entertainment.", price: 29.90, emoji: "🪶", badge: null },
  { id: 4, name: "Orthopedic Dog Bed", category: "Dogs", desc: "Memory foam support for senior and large breeds.", price: 199.90, emoji: "🛏️", badge: "New" },
  { id: 5, name: "Bird Seed Mix", category: "Birds", desc: "Nutritious blend of millet, sunflower and oat.", price: 24.90, emoji: "🦜", badge: null },
  { id: 6, name: "Dog Rope Tug Toy", category: "Dogs", desc: "Durable braided cotton rope for playtime.", price: 22.50, emoji: "🪢", badge: null },
  { id: 7, name: "Stainless Steel Bowl Set", category: "All Pets", desc: "Non-slip, dishwasher safe. Includes 2 bowls.", price: 49.90, emoji: "🥣", badge: null },
  { id: 8, name: "Aquarium Starter Kit", category: "Fish", desc: "10L tank with filter, pump and LED lighting.", price: 149.90, emoji: "🐠", badge: "New" },
];

const categories = ["All", ...new Set(products.map((p) => p.category))];

const trustBadges = [
  { icon: <MdLocalShipping size={24} />, label: "Free shipping above R$150" },
  { icon: <BsShieldCheck size={24} />, label: "Vet-approved products" },
  { icon: <BsArrowRepeat size={24} />, label: "Easy 30-day returns" },
  { icon: <BsCreditCard size={24} />, label: "Secure checkout" },
];

export function Home() {
  const { addToCart } = useContext(CartContext)!;
  const [activeFilter, setActiveFilter] = useState("All");
  const [addedId, setAddedId] = useState<number | null>(null);

  const filtered = activeFilter === "All"
    ? products
    : products.filter((p) => p.category === activeFilter);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 800);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-stone-800 text-white py-20 px-8 text-center">
        <h1 className="font-serif text-5xl font-bold mb-4">Everything your pet loves</h1>
        <p className="text-stone-400 text-base max-w-lg mx-auto mb-8 leading-relaxed">
          Premium food, toys, and accessories for dogs, cats, birds, and more.
        </p>
        <button
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Shop now
        </button>
        <p className="text-stone-500 text-xs mt-4 uppercase tracking-widest">
          Free delivery on orders over R$150
        </p>
      </section>

      {/* Products */}
      <section id="products" className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-serif text-3xl font-semibold text-stone-800">Our Products</h2>
          <span className="text-xs text-stone-400 uppercase tracking-widest">{filtered.length} items</span>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                activeFilter === cat
                  ? "bg-stone-800 text-white border-stone-800"
                  : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
              }`}
            >
              {categoryIcons[cat] ?? null}
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
            >
              <div className="h-40 flex items-center justify-center bg-stone-50 relative">
                <span className="text-6xl">{product.emoji}</span>
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-stone-800 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    <HiOutlineTag size={10} />
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-1">
                  {categoryIcons[product.category]}
                  {product.category}
                </div>
                <h3 className="font-serif text-base font-semibold text-stone-800 mb-1 leading-snug">{product.name}</h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-4">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-stone-800">R${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAdd(product)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      addedId === product.id
                        ? "bg-amber-500 text-white"
                        : "bg-stone-800 hover:bg-stone-700 text-white"
                    }`}
                  >
                    <HiOutlinePlus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-stone-800 py-10 px-8">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center text-center gap-2">
              <span className="text-stone-400">{badge.icon}</span>
              <span className="text-stone-400 text-xs leading-snug">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}