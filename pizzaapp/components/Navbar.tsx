import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";

type NavbarProps = {
  userName: string;
  cartCount: number;
  active?: "menu" | "carrinho";
};

export function Navbar({ userName, cartCount, active }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/menu" className="flex items-center gap-2 group">
          <span className="text-2xl">🍕</span>
          <span className="font-serif text-xl italic font-semibold text-red-600 group-hover:text-red-700 transition">
            Casa di Massa
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/menu"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              active === "menu"
                ? "bg-red-50 text-red-700"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            Cardápio
          </Link>

          <Link
            href="/carrinho"
            className={`relative rounded-lg px-3 py-2 text-sm font-medium transition ${
              active === "carrinho"
                ? "bg-red-50 text-red-700"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            Carrinho
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-stone-200">
            <span className="text-sm text-stone-500">
              Olá, <span className="font-medium text-stone-700">{userName}</span>
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-700 transition"
              >
                Sair
              </button>
            </form>
          </div>
        </nav>
      </div>
    </header>
  );
}
