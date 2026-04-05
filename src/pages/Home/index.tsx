import { useState, useEffect, useContext } from 'react'
import { api } from '../../services/api'
import { CartContext } from '../../context/CartContext.ts'
import { type Product } from '../../types/index.ts'
import { HiOutlinePlus } from 'react-icons/hi2'
import toast from 'react-hot-toast'




export function Home() {
  const { addToCart } = useContext(CartContext)!
  const [products, setProducts] = useState<Product[]>([])
  const [addedId, setAddedId] = useState<number | null>(null)

  useEffect(() => {
    async function getProduct() {
      const response = await api.get('/products')
      setProducts(response.data)
    }
    getProduct()
  }, [])

  function handleCartItem(product: Product) {
    addToCart(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 800)
    toast.success(`${product.title} adicionado ao carrinho!`)
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <section className="relative bg-brown-dark text-white py-16 md:py-24 px-6 text-center overflow-hidden">

        <div className='absolute top-[50] left-1/2 -translate-x-1/2 text-[160px] md:text-[200px] opacity-5 pointer-events-none select-none'>
          🐾
        </div>

        <div className="relative z-10">
          <h1 className="font-serif text-5xl font-bold mb-4">
            Tudo que seu Pet ama
          </h1>
          <p className="text-brown-light text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Rações premium, brinquedos e acessórios para cães e gatos.
          </p>
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="cursor-pointer bg-brown hover:bg-brown-light text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Comprar agora
          </button>
          <p className="text-brown-light text-xs mt-4 uppercase tracking-widest">
            Frete grátis em pedidos acima de R$150
          </p>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-12">

        <div className="flex items-baseline justify-between mb-6 md:mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-stone-800">
            Nossos Produtos
          </h2>
          <span className="text-xs text-brown uppercase tracking-widest">
            {products.length} itens
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-brown-light/30 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
            >
              {/* Product Image */}
              <div className="h-32 md:h-44 w-full overflow-hidden bg-cream">
                <img
                  src={product.cover}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4">
                <h3 className="font-serif text-sm md:text-base font-semibold text-brown-dark mb-1 leading-snug line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs text-brown leading-relaxed mb-4">
                  {product.desc}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-sm md:text-lg font-medium text-brown-dark">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </strong>
                  <button
                    onClick={() => handleCartItem(product)}
                    className={`w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${addedId === product.id
                        ? "bg-brown-light text-white"
                        : "bg-brown-dark hover:bg-brown text-white"
                      }`}
                  >
                    <HiOutlinePlus size={16} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>



    </div>
  )
}