---
name: E-commerce Next.js App
overview: Build a full E-commerce application from scratch using Next.js App Router, TypeScript strict, Zustand (with persist), TanStack Query, and pure CSS. The project starts from an empty workspace with only the mock data JSON and design reference already provided.
todos:
  - id: init
    content: Initialize Next.js project with TypeScript, install all dependencies (zustand, @tanstack/react-query, @playwright/test)
    status: pending
  - id: types
    content: "Create src/types/index.ts with strict interfaces: Product, CartItem, FilterState, store state types"
    status: pending
  - id: services
    content: Copy articles.json to src/data/ and create src/services/products.ts with 500ms delay mock
    status: pending
  - id: stores
    content: Create cartStore.ts and favStore.ts with Zustand + persist middleware
    status: pending
  - id: hooks
    content: Create useIsHydrated.ts and useProducts.ts (TanStack Query + reactive filter logic)
    status: pending
  - id: provider
    content: Create QueryProvider client wrapper and integrate into app/layout.tsx
    status: pending
  - id: css-globals
    content: Write globals.css with CSS variables design system, reset, and base typography
    status: pending
  - id: header
    content: "Build Header component: sticky glassmorphism, logo left, cart icon right with badge"
    status: pending
  - id: cart-drawer
    content: "Build CartDrawer: right-side slide-in drawer, item list with +/- controls, remove, empty state"
    status: pending
  - id: product-card
    content: "Build ProductCard: floating heart, image top, title/price/rating, hover effect"
    status: pending
  - id: filters
    content: "Build Filters component: search input, category select, price range slider — sidebar on desktop"
    status: pending
  - id: product-list
    content: Build ProductList with responsive auto-fill grid, Spinner loader, empty state
    status: pending
  - id: home-page
    content: "Assemble app/page.tsx: sidebar layout (Filters + ProductList), manage filter state"
    status: pending
  - id: detail-page
    content: "Build app/product/[id]/page.tsx: two-column layout, TanStack Query by id, Add to Cart, Back button"
    status: pending
  - id: playwright
    content: "Configure playwright.config.ts and write E2E tests: purchase flow + filters flow"
    status: pending
isProject: false
---

# E-commerce Next.js App — Implementation Plan

## Stack Summary
- **Next.js 14** (App Router, CSR data fetching)
- **TypeScript** strict mode (`"strict": true`, no `any`)
- **Zustand** + `persist` middleware (cart + favorites)
- **TanStack Query v5** (mock fetch with 500ms delay)
- **Pure CSS** (`.css` files per component + `globals.css` design system)
- **Playwright** E2E tests

---

## Project Structure

```
src/
├── app/
│   ├── globals.css           # CSS variables + reset
│   ├── layout.tsx            # Root layout + QueryProvider
│   ├── page.tsx              # Home (product list + filters)
│   └── product/[id]/
│       └── page.tsx          # Product detail
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── Header.css
│   ├── CartDrawer/
│   │   ├── CartDrawer.tsx    # Right-side drawer
│   │   └── CartDrawer.css
│   ├── ProductCard/
│   │   ├── ProductCard.tsx
│   │   └── ProductCard.css
│   ├── Filters/
│   │   ├── Filters.tsx       # Sidebar left on desktop
│   │   └── Filters.css
│   ├── ProductList/
│   │   ├── ProductList.tsx
│   │   └── ProductList.css
│   └── ui/
│       ├── Spinner.tsx + Spinner.css
│       ├── StarRating.tsx
│       └── EmptyState.tsx
├── hooks/
│   ├── useIsHydrated.ts      # SSR/hydration guard
│   └── useProducts.ts        # TanStack Query + filter logic
├── providers/
│   └── QueryProvider.tsx     # "use client" wrapper for TanStack
├── services/
│   └── products.ts           # getProducts / getProductById (500ms delay)
├── store/
│   ├── cartStore.ts          # Zustand cart + persist
│   └── favStore.ts           # Zustand favorites + persist
├── types/
│   └── index.ts              # Product, CartItem, store state interfaces
└── data/
    └── articles.json         # Copy of mock data
tests/
└── e2e/
    ├── purchase.spec.ts
    └── filters.spec.ts
```

---

## Key Design Decisions

### Types (`src/types/index.ts`)
```typescript
interface Product {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  fav?: boolean;
  rating: number;
  categoria: string;
}
interface CartItem extends Product { quantity: number; }
interface FilterState {
  search: string;
  category: string;
  maxPrice: number;
}
```

### Services (`src/services/products.ts`)
```typescript
export async function getProducts(): Promise<Product[]> {
  await new Promise(res => setTimeout(res, 500));
  return articlesData as Product[];
}
export async function getProductById(id: number): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(p => p.id === id);
}
```

### Zustand Stores
- `cartStore.ts`: `{ items: CartItem[], addItem, removeItem, updateQuantity, clearCart }` — persisted to `localStorage` key `cart-storage`
- `favStore.ts`: `{ favorites: number[], toggleFavorite, isFavorite }` — persisted to `localStorage` key `fav-storage`

### `useIsHydrated` Hook
Prevents hydration mismatch by returning `false` until the component mounts client-side. Used in Header (cart count) and CartDrawer.

### `useProducts` Custom Hook
```typescript
// Encapsulates useQuery + client-side filter logic
export function useProducts(filters: FilterState) {
  const { data, isLoading, isError } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  const filtered = useMemo(() => data?.filter(p =>
    p.titulo.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.category === '' || p.categoria === filters.category) &&
    p.precio <= filters.maxPrice
  ) ?? [], [data, filters]);
  return { products: filtered, isLoading, isError };
}
```

### Layout (Excalidraw-faithful)
- **Header**: sticky + glassmorphism, logo left, cart icon right (with item count badge)
- **Home**: two-column CSS Grid — left sidebar (Filters) + right main (ProductList)
- **Product Card**: image top, floating heart over image, title/price/rating below, "Ver detalle" link
- **Detail page**: two-column on desktop (image left, info right); single column on mobile; back button top-left using `router.back()`
- **Cart**: right-side Drawer (slide-in animation), overlays content, closes on outside click

### CSS Design System (`globals.css`)
```css
:root {
  --primary: #0070f3;
  --bg: #ffffff;
  --text: #171717;
  --text-muted: #666666;
  --border: #eaeaea;
  --shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  --radius: 8px;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --spacing-xs: 4px; --spacing-sm: 8px;
  --spacing-md: 16px; --spacing-lg: 24px; --spacing-xl: 32px;
}
```

### Responsive Breakpoints
- Mobile (`< 640px`): 1-col grid, stacked filters
- Tablet (`640px–1024px`): 2-col product grid
- Desktop (`> 1024px`): sidebar layout + 3–4 col auto-fill grid

### Playwright Tests
- `purchase.spec.ts`: visit home → click product → add to cart → verify cart count → open drawer → check item → remove item
- `filters.spec.ts`: search by title → verify filtered results → filter by category → filter by price range → verify empty state message

---

## Implementation Steps

1. Initialize Next.js project (`create-next-app`) with TypeScript + strict config
2. Install dependencies: `zustand`, `@tanstack/react-query`, `@playwright/test`
3. Set up `tsconfig.json` with `"strict": true` and path aliases
4. Create `types/index.ts` — all interfaces
5. Copy `articles.json` to `src/data/`
6. Create `services/products.ts`
7. Create Zustand stores (`cartStore`, `favStore`)
8. Create `useIsHydrated` and `useProducts` hooks
9. Create `QueryProvider` wrapper
10. Build components: `Header`, `CartDrawer`, `ProductCard`, `Filters`, `ProductList`, `Spinner`, `StarRating`, `EmptyState`
11. Build pages: `app/page.tsx` (home), `app/product/[id]/page.tsx` (detail)
12. Write all CSS files (globals + per-component)
13. Configure Playwright and write E2E tests
14. Final check: lints, hydration, responsive behavior