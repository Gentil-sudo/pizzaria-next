import Link from "next/link";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { CartItemRow } from "@/components/CartItemRow";
import { ClearCartButton } from "@/components/ClearCartButton";
import { getSession } from "@/lib/auth/session";
import { getCartItems, getCartCount } from "@/lib/actions/cart";
import { formatPrice } from "@/lib/utils/format";

export default async function CarrinhoPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const [items, cartCount] = await Promise.all([
    getCartItems(),
    getCartCount(),
  ]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-orange-50/30">
      <Navbar
        userName={session.name}
        cartCount={cartCount}
        active="carrinho"
      />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl italic font-semibold text-stone-800">
              Seu Carrinho
            </h1>
            <p className="mt-1 text-stone-500">
              {cartCount === 0
                ? "Nenhum item adicionado"
                : `${cartCount} ${cartCount === 1 ? "item" : "itens"} no carrinho`}
            </p>
          </div>
          {items.length > 0 && <ClearCartButton />}
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
            <span className="text-5xl">🛒</span>
            <p className="mt-4 text-stone-600">Seu carrinho está vazio</p>
            <Link
              href="/menu"
              className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/25 hover:bg-red-700 transition"
            >
              Ver cardápio
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  pizzaId={item.pizzaId}
                  name={item.name}
                  emoji={item.emoji}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))}
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-stone-600">Total</span>
                <span className="text-2xl font-bold text-red-600">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="mt-2 text-xs text-stone-400">
                Entrega e taxas calculadas no checkout
              </p>
              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-red-600 py-4 font-semibold text-white shadow-lg shadow-red-600/25 hover:bg-red-700 transition"
              >
                Finalizar pedido
              </button>
              <Link
                href="/menu"
                className="mt-3 block text-center text-sm font-medium text-stone-500 hover:text-red-600 transition"
              >
                ← Continuar comprando
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
