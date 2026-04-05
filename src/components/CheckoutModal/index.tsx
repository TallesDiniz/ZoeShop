import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { HiOutlineXMark, HiOutlineCheckCircle } from 'react-icons/hi2'
import { MdLocalShipping } from 'react-icons/md'
import { BsShieldCheck, BsCreditCard } from 'react-icons/bs'
import { PiPawPrintFill } from 'react-icons/pi'
import { CartContext } from '../../context/CartContext'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
}

type Step = 'form' | 'success'

interface FormData {
  name: string
  email: string
  address: string
  city: string
  zip: string
  cardNumber: string
  cardName: string
  cardExpiry: string
  cardCvv: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvv: '',
}

export function CheckoutModal({ isOpen, onClose, total }: CheckoutModalProps) {
  const navigate = useNavigate()
  const { cart, clearCart } = useContext(CartContext)!
  const [step, setStep] = useState<Step>('form')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormData>(initialForm)
  const [activeSection, setActiveSection] = useState<'delivery' | 'payment'>('delivery')

  const items = Object.values(cart)

  if (!isOpen) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function formatCardNumber(value: string) {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(value: string) {
    return value.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/')
  }

  function validateForm(): boolean {
    const { name, email, address, city, zip, cardNumber, cardName, cardExpiry, cardCvv } = form
    if (!name || !email || !address || !city || !zip) {
      toast.error('Preencha todos os dados de entrega.')
      setActiveSection('delivery')
      return false
    }
    if (!email.includes('@')) {
      toast.error('Digite um e-mail válido.')
      setActiveSection('delivery')
      return false
    }
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
      toast.error('Preencha todos os dados do cartão.')
      setActiveSection('payment')
      return false
    }
    return true
  }

  async function handleSubmit() {
    if (!validateForm()) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    toast.success('Pagamento realizado com sucesso! 🐾', {
        duration: 4000,
        style: {
            background: '#5C3A1E',
            color: '#FDFAF6',
            fontFamily: '"DM Sans", sans-serif',
            borderRadius: '100px',
            padding: '12px 20px',
            fontSize: '14px',
        },
        iconTheme: {
            primary: '#C49A6C',
            secondary: '#FDFAF6',
        },
    })
    setStep('success')
    clearCart()
  }

  function handleClose() {
    if (step === 'success') {
      navigate('/')
    }
    setStep('form')
    setForm(initialForm)
    setActiveSection('delivery')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brown-dark/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-cream rounded-none md:rounded-3xl w-full md:max-w-2xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-cream border-b border-brown-light/20 px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <div className="flex items-center gap-2">
            <PiPawPrintFill size={22} className="text-brown-dark" />
            <h2 className="font-serif text-xl font-semibold text-brown-dark">
              {step === 'success' ? 'Pedido confirmado!' : 'Finalizar pedido'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-brown-light/30 text-brown hover:border-brown-dark hover:text-brown-dark transition-colors"
          >
            <HiOutlineXMark size={16} />
          </button>
        </div>

        {/* Success State */}
        {step === 'success' ? (
          <div className="px-8 py-16 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-full bg-brown-dark/10 flex items-center justify-center mb-2">
              <HiOutlineCheckCircle size={48} className="text-brown-dark" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-brown-dark">Pedido realizado!</h3>
            <p className="text-brown text-sm max-w-sm leading-relaxed">
              Obrigado, <strong>{form.name.split(' ')[0]}</strong>! Seu pedido foi confirmado e será enviado para <strong>{form.city}</strong> em breve.
            </p>
            <div className="bg-white border border-brown-light/30 rounded-2xl px-8 py-4 mt-2">
              <p className="text-xs text-brown uppercase tracking-widest mb-1">Total pago</p>
              <p className="font-serif text-2xl font-bold text-brown-dark">
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <p className="text-xs text-brown-light mt-2">
              Uma confirmação foi enviada para <strong>{form.email}</strong>
            </p>
            <button
              onClick={handleClose}
              className="mt-4 bg-brown-dark hover:bg-brown text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Voltar à loja →
            </button>
          </div>

        ) : (

          <div className="px-8 py-6 flex flex-col gap-6">

            {/* Order Summary */}
            <div className="bg-white border border-brown-light/30 rounded-2xl p-5">
              <p className="text-xs text-brown uppercase tracking-widest mb-3">Resumo do pedido</p>
              <div className="flex flex-col gap-2 max-h-32 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-brown-dark font-medium">{item.title}</span>
                      <span className="text-brown-light text-xs">x{item.qty}</span>
                    </div>
                    <span className="text-brown font-medium shrink-0">
                      {(item.price * item.qty).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-brown-light/20 mt-3 pt-3 flex justify-between">
                <span className="text-sm font-medium text-brown-dark">Total</span>
                <span className="font-serif text-lg font-bold text-brown-dark">
                  {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>

            {/* Section Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveSection('delivery')}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                  activeSection === 'delivery'
                    ? 'bg-brown-dark text-white border-brown-dark'
                    : 'bg-white text-brown border-brown-light/30 hover:border-brown'
                }`}
              >
                🚚 Entrega
              </button>
              <button
                onClick={() => setActiveSection('payment')}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                  activeSection === 'payment'
                    ? 'bg-brown-dark text-white border-brown-dark'
                    : 'bg-white text-brown border-brown-light/30 hover:border-brown'
                }`}
              >
                💳 Pagamento
              </button>
            </div>

            {/* Delivery Section */}
            {activeSection === 'delivery' && (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-brown uppercase tracking-widest flex items-center gap-1">
                  <MdLocalShipping size={14} /> Dados de entrega
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    value={form.name}
                    onChange={handleChange}
                    className="col-span-2 px-4 py-3 rounded-xl border border-brown-light/30 bg-white text-sm text-brown-dark placeholder:text-brown-light/60 outline-none focus:border-brown-light transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={form.email}
                    onChange={handleChange}
                    className="col-span-2 px-4 py-3 rounded-xl border border-brown-light/30 bg-white text-sm text-brown-dark placeholder:text-brown-light/60 outline-none focus:border-brown-light transition-colors"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Endereço"
                    value={form.address}
                    onChange={handleChange}
                    className="col-span-2 px-4 py-3 rounded-xl border border-brown-light/30 bg-white text-sm text-brown-dark placeholder:text-brown-light/60 outline-none focus:border-brown-light transition-colors"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Cidade"
                    value={form.city}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl border border-brown-light/30 bg-white text-sm text-brown-dark placeholder:text-brown-light/60 outline-none focus:border-brown-light transition-colors"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="CEP"
                    value={form.zip}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl border border-brown-light/30 bg-white text-sm text-brown-dark placeholder:text-brown-light/60 outline-none focus:border-brown-light transition-colors"
                  />
                </div>
                <button
                  onClick={() => setActiveSection('payment')}
                  className="w-full mt-2 bg-brown-dark hover:bg-brown text-white py-3 rounded-full font-medium text-sm transition-colors"
                >
                  Continuar para pagamento →
                </button>
              </div>
            )}

            {/* Payment Section */}
            {activeSection === 'payment' && (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-brown uppercase tracking-widest flex items-center gap-1">
                  <BsCreditCard size={14} /> Dados do cartão
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Número do cartão"
                    value={form.cardNumber}
                    onChange={(e) => setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                    className="col-span-2 px-4 py-3 rounded-xl border border-brown-light/30 bg-white text-sm text-brown-dark placeholder:text-brown-light/60 outline-none focus:border-brown-light transition-colors"
                  />
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Nome no cartão"
                    value={form.cardName}
                    onChange={handleChange}
                    className="col-span-2 px-4 py-3 rounded-xl border border-brown-light/30 bg-white text-sm text-brown-dark placeholder:text-brown-light/60 outline-none focus:border-brown-light transition-colors"
                  />
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="Validade (MM/AA)"
                    value={form.cardExpiry}
                    onChange={(e) => setForm((prev) => ({ ...prev, cardExpiry: formatExpiry(e.target.value) }))}
                    className="px-4 py-3 rounded-xl border border-brown-light/30 bg-white text-sm text-brown-dark placeholder:text-brown-light/60 outline-none focus:border-brown-light transition-colors"
                  />
                  <input
                    type="text"
                    name="cardCvv"
                    placeholder="CVV"
                    maxLength={3}
                    value={form.cardCvv}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl border border-brown-light/30 bg-white text-sm text-brown-dark placeholder:text-brown-light/60 outline-none focus:border-brown-light transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <BsShieldCheck size={14} className="text-brown-light" />
                  <p className="text-xs text-brown-light">Seus dados estão protegidos com criptografia SSL.</p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-2 bg-brown-dark hover:bg-brown disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-full font-medium text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Processando...
                    </>
                  ) : (
                    'Confirmar pedido →'
                  )}
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}