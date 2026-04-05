<div align="center">

# 🐾 ZoeShop

### A modern, fully responsive pet shop built with React, TypeScript and Tailwind CSS

[![Deploy](https://img.shields.io/badge/deploy-vercel-black?style=flat-square&logo=vercel)](https://zoe-shop.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

[Live Demo](https://zoe-shop.vercel.app) · [Report Bug](https://github.com/TallesDiniz/ZoeShop/issues) · [Request Feature](https://github.com/TallesDiniz/ZoeShop/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Pages](#-pages)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 About

ZoeShop is a full-featured pet shop e-commerce application built as a front-end project. It features a product catalog, shopping cart, checkout flow with form validation, and an about page and fully responsive for mobile and desktop.

---

## ✨ Features

- 🛒 **Shopping cart** with quantity controls and real-time totals
- 💳 **Checkout modal** with delivery and payment form validation
- 🔔 **Toast notifications** for cart actions and order confirmation
- 📱 **Fully responsive** with animated hamburger menu for mobile
- 🌐 **Client-side routing** with React Router DOM
- 🔄 **Global cart state** managed with Context API
- 🎨 **Custom design system** with a warm brown/cream palette via Tailwind CSS v4

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Icons | React Icons |
| Bundler | Vite 8 |
| Mock API | JSON Server |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TallesDiniz/ZoeShop.git
cd ZoeShop
```

2. Install dependencies:
```bash
npm install
```

3. Start the mock API (JSON Server):
```bash
npx json-server --watch db.json --port 3000
```

4. In a separate terminal, start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
ZoeShop/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Sticky header with animated mobile menu
│   │   └── CheckoutModal.tsx   # Multi-step checkout modal
│   ├── context/
│   │   ├── CartContext.ts      # Cart context definition
│   │   └── CartProvider.tsx    # Cart state and actions provider
│   ├── pages/
│   │   ├── Home.tsx            # Product listing page
│   │   ├── CartPage.tsx        # Cart and order summary page
│   │   └── AboutPage.tsx       # About, FAQ and newsletter page
│   ├── services/
│   │   └── api.ts              # Axios instance configuration
│   ├── types/
│   │   └── index.ts            # Shared TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # Tailwind v4 theme configuration
├── db.json                     # Mock API data
├── package.json
└── vite.config.ts
```

---

## 📄 Pages

### Home `/`
- Hero banner with paw background
- Responsive product grid (2 → 4 columns)
- Add to cart with visual feedback
- Trust badges footer

### Cart `/cart`
- List of cart items with image, quantity controls, and line totals
- Free shipping threshold indicator
- Order summary panel (sticky on desktop, full-width on mobile)
- Promo code input
- Opens checkout modal on confirm

### Checkout Modal
- Step 1: Delivery — name, email, address, city, ZIP
- Step 2: Payment — card number (auto-formatted), name, expiry, CVV
- Form validation with toast error messages
- Loading spinner during submission
- Success screen with order confirmation

### About `/sobre`
- Brand story section
- Stats counters
- Values grid
- Team cards
- Partner brand pills
- Animated FAQ accordion
- Newsletter signup with validation
- Store location and contact info

---

## 🔐 Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_URL=http://localhost:3000
```

Then update `src/services/api.ts`:

```ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
```

---

## 📜 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/TallesDiniz">Talles Diniz</a>
</div>
