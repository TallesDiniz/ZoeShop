import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { HiOutlineTrash, HiOutlineMinus, HiOutlinePlus, HiOutlineShoppingBag } from 'react-icons/hi2'
import { MdLocalShipping } from 'react-icons/md'
import toast from 'react-hot-toast'
import { CheckoutModal } from '../../components/CheckoutModal'

export function CartPage() {
  const navigate = useNavigate()
  const { cart, removeFromCart, changeQty, cartTotal } = useContext(CartContext)!
  const items = Object.values(cart)
  const shipping = cartTotal >= 150 ? 0 : 18.90
  const total = cartTotal + shipping
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen flex flex-col items-center justify-center gap-4 text-brown">
        <HiOutlineShoppingBag size={64} className="text-brown-light/40" />
        <p className="text-lg text-brown">Seu carrinho está vazio.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-brown-dark hover:bg-brown text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Ver produtos
        </button>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-12">

        {/* Title */}
        <h1 className="font-serif text-4xl font-bold text-brown-dark mb-8">
          Seu Carrinho
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-brown-light/30 rounded-2xl p-5 flex items-center gap-4"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-xl bg-cream overflow-hidden shrink-0">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="font-serif text-base font-semibold text-brown-dark">
                    {item.title}
                  </p>
                 

                  {/* Qty controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      className="w-7 h-7 rounded-full border border-brown-light/40 flex items-center justify-center text-brown hover:border-brown-dark transition-colors"
                    >
                      <HiOutlineMinus size={13} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center text-brown-dark">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      className="w-7 h-7 rounded-full border border-brown-light/40 flex items-center justify-center text-brown hover:border-brown-dark transition-colors"
                    >
                      <HiOutlinePlus size={13} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <p className="text-base font-medium text-brown-dark shrink-0">
                  {(item.price * item.qty).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>

                {/* Remove */}
                <button
                  onClick={() => { removeFromCart(item.id); toast.error(`${item.title} removido do carrinho!`); }}
                  className="text-brown-light/50 hover:text-brown-dark transition-colors ml-1"
                  
               >
                  <HiOutlineTrash size={16} />
                </button>

              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-brown-light/30 rounded-2xl p-6 sticky top-24">
            <h2 className="font-serif text-xl font-semibold text-brown-dark mb-5">
              Resumo do Pedido
            </h2>

            <div className="flex justify-between text-sm text-brown mb-3">
              <span>Subtotal</span>
              <span>{cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>

            <div className="flex justify-between text-sm text-brown mb-1">
              <span className="flex items-center gap-1">
                <MdLocalShipping size={14} />
                Frete
              </span>
              <span className={shipping === 0 ? 'text-brown-dark font-medium' : ''}>
                {shipping === 0
                  ? 'Grátis!'
                  : shipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-brown-light mb-3">
                Adicione {(150 - cartTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} para frete grátis
              </p>
            )}

            <hr className="border-brown-light/20 my-4" />

            <div className="flex justify-between text-base font-medium text-brown-dark mb-5">
              <span>Total</span>
              <span>
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                total={total}
            />

            <button
            onClick={() => setIsModalOpen(true)} 
            className="w-full bg-brown-dark hover:bg-brown text-white py-3 rounded-full font-medium transition-colors">
              Finalizar Pedido →
            </button>

            <input
              type="text"
              placeholder="Código promocional"
              className="w-full mt-3 px-4 py-2.5 border border-brown-light/30 rounded-full text-sm outline-none focus:border-brown-light transition-colors bg-cream text-brown-dark placeholder:text-brown-light/60"
            />
          </div>

        </div>
      </div>

     

    </div>
  )
}