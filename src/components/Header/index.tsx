import { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { PiPawPrintFill } from "react-icons/pi";
import { HiOutlineShoppingCart, HiOutlineHome, HiOutlineShoppingBag, HiOutlineInformationCircle } from "react-icons/hi2";

type NavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: <HiOutlineHome size={16} /> },
  { label: "Compre", to: "/", icon: <HiOutlineShoppingBag size={16} /> },
  { label: "Sobre", to: "/sobre", icon: <HiOutlineInformationCircle size={16} /> },
];

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useContext(CartContext)!;

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer group"
        >
          <PiPawPrintFill
            size={28}
            className="text-brown-dark group-hover:text-brown-light transition-colors"
          />
          <span className="font-serif text-2xl font-bold text-stone-800 tracking-tight">
            Zoe Shop
          </span>
        </button>

        {/* Nav Links */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive && location.pathname === item.to
                    ? "text-stone-800"
                    : "text-stone-500 hover:text-stone-800"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Cart Button */}
        <button
          onClick={() => navigate("/cart")}
          className="relative flex items-center gap-2 bg-brown-dark hover:bg-brown text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
        >
          <HiOutlineShoppingCart size={18} />
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-brown-light text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
}