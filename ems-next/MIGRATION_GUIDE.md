# Mirror Migration Guide: React (Vite) to Next.js (App Router)

This project is a **1:1 Mirror Migration** of the original React project. Both projects are visually and functionally identical.

## 🚀 Key Differences

| Feature | React (Vite) | Next.js (App Router) |
|---------|-------------|----------------------|
| **Routing** | `react-router-dom` | File-based Routing (`app/` directory) |
| **Navigation** | `useNavigate` | `useRouter` from `next/navigation` |
| **Active Link** | `useLocation().pathname` | `usePathname()` |
| **Styling** | Tailwind CSS v4 (PostCSS) | Same (Tailwind CSS v4 + PostCSS) |
| **Backend** | Firebase Client SDK | Same (Firebase Client SDK) |
| **Entry Point** | `src/main.jsx` | `app/layout.tsx` |

## 🛠️ How to Run Separately

### 1. React Project (Original)
```bash
cd ems
npm run dev
# Dashboard at http://localhost:5173 (usually)
```

### 2. Next.js Project (Migrated)
```bash
cd ems/ems-next
npm run dev
# Dashboard at http://localhost:3000
```

## 📂 Mapping Guide

- **Pages:** `src/pages/*.jsx` -> `app/(dashboard)/*/page.tsx`
- **Contexts:** `src/contexts/AuthContext.tsx` -> `providers/AuthProvider.tsx`
- **Firebase:** `src/firebase.js` -> `lib/firebase.ts`
- **Layout:** `src/components/AppLayout.tsx` -> `app/(dashboard)/layout.tsx`
- **Sidebar:** `src/components/AppSidebar.tsx` -> `components/Sidebar.tsx`

## ✅ Preservation Checklist
- [x] Identical CSS Themes and Tokens.
- [x] Identical Firebase Logic and Real-time Listeners.
- [x] Identical Form Validations and Toast Logic.
- [x] Identical Sidebar Links and Role-based Access.
