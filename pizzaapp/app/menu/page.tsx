import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PizzaCard } from "@/components/PizzaCard";
import { getSession } from "@/lib/auth/session";
import {
  getAllPizzas,
  getCartItems,
  getCartCount,
} from "@/lib/actions/cart";

export default async function MenuPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const [pizzas, cartItems, cartCount] = await Promise.all([
    getAllPizzas(),
    getCartItems(),
    getCartCount(),
  ]);

  const cartMap = new Map(
    cartItems.map((item) => [item.pizzaId, item.quantity])
  );

  const categories = [...new Set(pizzas.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-orange-50/30">
      <Navbar
        userName={session.name}
        cartCount={cartCount}
        active="menu"
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="font-serif text-3xl sm:text-4xl italic font-semibold text-stone-800">
            Nosso Cardápio
          </h1>
          <p className="mt-2 text-stone-500">
            Escolha suas pizzas favoritas e adicione ao carrinho
          </p>
        </div>

        {pizzas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
            <span className="text-5xl">🍕</span>
            <p className="mt-4 text-stone-600">
              Nenhuma pizza no cardápio ainda.
            </p>
            <p className="mt-1 text-sm text-stone-400">
              Execute <code className="rounded bg-stone-100 px-2 py-0.5">npm run db:seed</code> para popular o banco.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <section key={category}>
                <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl font-semibold text-stone-700">
                  <span className="h-px flex-1 bg-stone-200" />
                  {category}
                  <span className="h-px flex-1 bg-stone-200" />
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {pizzas
                    .filter((p) => p.category === category)
                    .map((pizza) => (
                      <PizzaCard
                        key={pizza.id}
                        pizza={pizza}
                        quantityInCart={cartMap.get(pizza.id) ?? 0}
                      />
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
