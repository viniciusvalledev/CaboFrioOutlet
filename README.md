# Cabo Frio Outlet — MVP E-commerce de Vestuário Urbano

MVP de e-commerce (React + TypeScript + Tailwind CSS) focado em bermudas,
calças, camisas e bonés, com carrinho de compras funcional no lado do cliente.

## 🚀 Como rodar localmente

Pré-requisitos: [Node.js](https://nodejs.org/) 18+ instalado.

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar o servidor de desenvolvimento
npm run dev
```

Depois é só abrir o endereço mostrado no terminal (geralmente
`http://localhost:5173`) no navegador.

## 🧪 Testando antes de commitar

Como pedido, teste sempre localmente antes de subir qualquer commit:

```bash
npm run dev      # testar em modo desenvolvimento (hot reload)
npm run build    # garantir que o build de produção (TypeScript + Vite) não quebra
npm run preview  # servir o build de produção localmente para conferência final
```

Se `npm run build` apontar erros de tipo, corrija antes de commitar — o
`tsconfig.json` está com `strict: true`.

## 📁 Estrutura do projeto

```
src/
  components/     → Componentes de UI reutilizáveis
  context/        → CartContext (useCart) e ToastContext (useToast)
  data/           → mockData.ts — fonte única de produtos (fácil de trocar por API)
  types/          → Interfaces TypeScript (Product, CartItem)
  App.tsx         → Composição principal da página
  main.tsx        → Entry point React
  index.css       → Diretivas Tailwind + estilos globais
```

## 🔌 Integrando com um backend real

Toda a listagem de produtos vem de `src/data/mockData.ts`, que exporta um
array tipado `Product[]`. Para plugar um backend real, basta:

1. Criar uma função `fetchProducts(): Promise<Product[]>` que chame sua API.
2. Substituir a importação estática de `products` em `src/App.tsx` por um
   `useEffect` + `useState` que chame essa função (ou usar React Query/SWR).

A interface `Product` (em `src/types/product.ts`) já reflete os campos
esperados: `id`, `name`, `price`, `category`, `image`, `description`, `sizes`.

## 🎨 Design System

- **Preto** (`black`) — fundo principal e superfícies estruturais
- **Amarelo** (`yellow-400` / hover `yellow-500`) — CTAs e badges de desconto
- **Branco** — texto principal e elementos de contraste sobre o preto
- Cantos arredondados (`rounded-md` / `rounded-lg`) e transições suaves
  (`transition-all duration-300`) em toda a interface

## 🛠️ Stack

- React 18 (function components + hooks)
- TypeScript (strict mode)
- Tailwind CSS
- Lucide React (ícones)
- Context API para carrinho (`useCart`) e notificações (`useToast`)
