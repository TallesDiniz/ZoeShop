import { MdLocalShipping } from 'react-icons/md'
import { BsShieldCheck, BsArrowRepeat, BsCreditCard } from 'react-icons/bs'

export function Footer() {

    const trustBadges = [
      { icon: <MdLocalShipping size={24} />, label: "Frete grátis acima de R$150" },
      { icon: <BsShieldCheck size={24} />,   label: "Produtos aprovados por vets" },
      { icon: <BsArrowRepeat size={24} />,   label: "Devoluções em 30 dias" },
      { icon: <BsCreditCard size={24} />,    label: "Pagamento seguro" },
    ]

    return(

      <footer className="bg-stone-800 py-10 px-6 mt-8">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center text-center gap-2">
              <span className="text-stone-400">{badge.icon}</span>
              <span className="text-stone-400 text-xs leading-snug">{badge.label}</span>
            </div>
          ))}
        </div>
      </footer>
    )
}