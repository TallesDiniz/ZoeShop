import { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { PiPawPrintFill } from 'react-icons/pi'
import { HiOutlineShoppingCart, HiOutlineHome, HiOutlineShoppingBag, HiOutlineInformationCircle, HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2'

type NavItem = {
  label: string
  to: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'Home',  to: '/',       icon: <HiOutlineHome size={16} /> },
  { label: 'Compre',  to: '/',       icon: <HiOutlineShoppingBag size={16} /> },
  { label: 'Sobre', to: '/sobre',  icon: <HiOutlineInformationCircle size={16} /> },
]

export function Header() {
  const navigate = useNavigate()
  const { cartCount } = useContext(CartContext)!
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-brown-light/30 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <button
          onClick={() => { navigate('/'); setMenuOpen(false) }}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer group"
        >
          <PiPawPrintFill size={26} className="text-brown-dark group-hover:text-brown-light transition-colors" />
          <span className="font-serif text-xl font-bold text-brown-dark tracking-tight">
            Zoe Shop
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'text-brown-dark' : 'text-brown hover:text-brown-dark'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={() => navigate('/cart')}
            className="relative flex items-center gap-2 bg-brown-dark hover:bg-brown text-white text-sm font-medium px-4 py-2.5 rounded-full transition-colors"
          >
            <HiOutlineShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brown-light text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-brown-light/30 text-brown-dark"
            
          >
            {menuOpen ? <HiOutlineXMark size={20} /> : <HiOutlineBars3 size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-brown-light/20 px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brown-dark/10 text-brown-dark'
                    : 'text-brown hover:bg-cream hover:text-brown-dark'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}