import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2'
import { PiPawPrintFill } from 'react-icons/pi'
import { BsShieldCheck  } from 'react-icons/bs'
import { MdLocalShipping, MdVolunteerActivism } from 'react-icons/md'

const stats = [
  { value: '500+',  label: 'Produtos disponíveis' },
  { value: '2000+', label: 'Clientes satisfeitos' },
  { value: '10',    label: 'Anos de experiência' },
  { value: '4.9',   label: 'Avaliação média' },
]

const values = [
  {
    icon: <BsShieldCheck size={28} />,
    title: 'Qualidade garantida',
    desc: 'Todos os produtos são testados e aprovados por veterinários antes de chegarem até você.',
  },
  {
    icon: <MdVolunteerActivism size={28} />,
    title: 'Bem-estar animal',
    desc: 'Acreditamos que todo animal merece viver com saúde, conforto e muito amor.',
  },
  {
    icon: <MdLocalShipping size={28} />,
    title: 'Entrega rápida',
    desc: 'Frete grátis para pedidos acima de R$150 e entrega expressa disponível.',
  },
  {
    icon: <PiPawPrintFill size={28} />,
    title: 'Feito por amantes de pets',
    desc: 'Nossa equipe é formada por tutores apaixonados que entendem as necessidades dos animais.',
  },
]

const team = [
  { name: 'Mônica',     role: 'Fundadora & CEO',        emoji: '👩',  pet: 'Tutora da Zoe 🐶' },
  { name: 'Talles Diniz', role: 'Veterinário Consultor',   emoji: '👨‍⚕️', pet: 'Tutor da Botinha 🐈' },
  { name: 'Amanda', role: 'Gerente de Produtos',     emoji: '👩‍💼', pet: 'Tutora do Tom 🐱 ' },
  { name: 'Jean', role: 'Atendimento ao Cliente',  emoji: '👨', pet: 'Tutor do Nemo 🐠' },
]

const faqs = [
  {
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo varia de 2 a 7 dias úteis dependendo da sua região. Entregas expressas estão disponíveis para capitais.',
  },
  {
    question: 'Como funciona a política de devolução?',
    answer: 'Você tem até 30 dias após o recebimento para solicitar a devolução. O produto deve estar em sua embalagem original e sem uso.',
  },
  {
    question: 'Os produtos são aprovados por veterinários?',
    answer: 'Sim! Todos os produtos passam pela análise do nosso veterinário consultor antes de serem adicionados ao catálogo.',
  },
  {
    question: 'Vocês têm loja física?',
    answer: 'Sim, estamos localizados em São Paulo. Funcionamos de segunda a sábado das 9h às 18h. Confira o endereço na seção abaixo.',
  },
  {
    question: 'Como escolher a ração certa para meu pet?',
    answer: 'Leve em conta a espécie, raça, idade e condição de saúde do seu animal. Em caso de dúvida, entre em contato e nosso veterinário te orienta gratuitamente.',
  },
]

const partners = ['Royal Canin', 'Pedigree', 'Whiskas', 'Golden', 'Premier', 'Purina']

export function AboutPage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [email, setEmail] = useState('')

  function handleNewsletter() {
    if (!email || !email.includes('@')) {
      toast.error('Digite um e-mail válido.')
      return
    }
    toast.success('Inscrição realizada com sucesso!')
    setEmail('')
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <section className="relative bg-brown-dark text-white py-24 px-8 text-center overflow-hidden">
        <div className="absolute -top-[50] left-1/2 -translate-x-1/2 text-[180px] opacity-5 pointer-events-none select-none">
          🐾
        </div>
        <div className="relative z-10">
          <p className="text-brown-light text-xs uppercase tracking-widest mb-4">Quem somos</p>
          <h1 className="font-serif text-5xl font-bold mb-4">Feito para quem<br />ama seu pet</h1>
          <p className="text-brown-light/80 text-base max-w-xl mx-auto leading-relaxed">
            Desde 2022 levando produtos de qualidade, saúde e felicidade para pets e seus tutores em todo o Brasil.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border border-brown-light/30 rounded-2xl p-6 text-center">
              <p className="font-serif text-4xl font-bold text-brown-dark mb-1">{stat.value}</p>
              <p className="text-xs text-brown uppercase tracking-widest leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-4xl mx-auto px-8 pb-16">
        <div className="bg-white border border-brown-light/30 rounded-2xl p-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="text-[100px] shrink-0 select-none">🐾</div>
          <div>
            <p className="text-xs text-brown-light uppercase tracking-widest mb-2">Nossa história</p>
            <h2 className="font-serif text-3xl font-semibold text-brown-dark mb-4">
              Nascemos do amor pelos animais
            </h2>
            <p className="text-sm text-brown leading-relaxed mb-3">
              A Zoe Shop nasceu em 2022 quando Mônica, tutora da Shitzu Zoe, não encontrava produtos de qualidade para sua pet no mercado local. Frustrada com a falta de opções, ela decidiu criar a própria solução.
            </p>
            <p className="text-sm text-brown leading-relaxed">
              Hoje somos um dos maiores pet shops online do Brasil, com mais de 500 produtos cuidadosamente selecionados e uma equipe apaixonada por animais. Nossa missão é simples: fazer seu pet tão feliz quanto ele te faz.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brown-dark py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-brown-light text-xs uppercase tracking-widest text-center mb-2">O que nos guia</p>
          <h2 className="font-serif text-3xl font-semibold text-white text-center mb-10">
            Nossos valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 items-start">
                <span className="text-brown-light shrink-0">{value.icon}</span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-1">{value.title}</h3>
                  <p className="text-sm text-brown-light/70 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-4xl mx-auto px-8 py-16">
        <p className="text-brown-light text-xs uppercase tracking-widest text-center mb-2">Pessoas por trás da Pawsome</p>
        <h2 className="font-serif text-3xl font-semibold text-brown-dark text-center mb-10">
          Nosso time
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="bg-white border border-brown-light/30 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-cream border border-brown-light/30 flex items-center justify-center text-4xl mx-auto mb-4">
                {member.emoji}
              </div>
              <h3 className="font-serif text-base font-semibold text-brown-dark">{member.name}</h3>
              <p className="text-xs text-brown uppercase tracking-wider mt-1 mb-2">{member.role}</p>
              <p className="text-xs text-brown-light">{member.pet}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="bg-white border-y border-brown-light/20 py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-brown-light text-xs uppercase tracking-widest text-center mb-8">
            Marcas que trabalhamos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {partners.map((partner) => (
              <span
                key={partner}
                className="bg-cream border border-brown-light/30 text-brown font-medium text-sm px-6 py-2.5 rounded-full"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-8 py-16">
        <p className="text-brown-light text-xs uppercase tracking-widest text-center mb-2">Dúvidas frequentes</p>
        <h2 className="font-serif text-3xl font-semibold text-brown-dark text-center mb-10">
          FAQ
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-brown-light/30 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium text-brown-dark text-sm">{faq.question}</span>
                <span className="text-brown-light shrink-0 ml-4">
                  {openFaq === index
                    ? <HiOutlineChevronUp size={18} />
                    : <HiOutlineChevronDown size={18} />
                  }
                </span>
              </button>
              {openFaq === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-brown leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brown-dark py-16 px-8">
        <div className="max-w-xl mx-auto text-center">
          <PiPawPrintFill size={32} className="text-brown-light mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-semibold text-white mb-3">
            Fique por dentro das novidades
          </h2>
          <p className="text-brown-light/70 text-sm mb-8 leading-relaxed">
            Receba promoções exclusivas, dicas para seu pet e lançamentos em primeira mão.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-brown-light/50 text-sm outline-none focus:border-brown-light transition-colors"
            />
            <button
              onClick={handleNewsletter}
              className="bg-brown-light hover:bg-brown text-white px-6 py-3 rounded-full font-medium text-sm transition-colors shrink-0"
            >
              Inscrever
            </button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="max-w-4xl mx-auto px-8 py-16">
        <p className="text-brown-light text-xs uppercase tracking-widest text-center mb-2">Venha nos visitar</p>
        <h2 className="font-serif text-3xl font-semibold text-brown-dark text-center mb-10">
          Nossa loja
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-brown-light/30 rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">📍</span>
            <h3 className="font-serif text-base font-semibold text-brown-dark mb-1">Endereço</h3>
            <p className="text-sm text-brown leading-relaxed">Rua dos Pets, 123<br />São Paulo, SP</p>
          </div>
          <div className="bg-white border border-brown-light/30 rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">🕐</span>
            <h3 className="font-serif text-base font-semibold text-brown-dark mb-1">Horário</h3>
            <p className="text-sm text-brown leading-relaxed">Seg – Sex: 9h às 18h<br />Sábado: 9h às 14h</p>
          </div>
          <div className="bg-white border border-brown-light/30 rounded-2xl p-6 text-center">
            <span className="text-3xl mb-3 block">📞</span>
            <h3 className="font-serif text-base font-semibold text-brown-dark mb-1">Contato</h3>
            <p className="text-sm text-brown leading-relaxed">(11) 99999-9999<br />contato@zoeshop.com.br</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-brown-dark hover:bg-brown text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Ver produtos →
          </button>
        </div>
      </section>

    </div>
  )
}