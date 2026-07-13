"use client";

import { useTransition } from "react";
import { addToCart } from "@/lib/actions/cart";
import { formatPrice } from "@/lib/utils/format";
import type { Pizza } from "@/lib/db/schema";

type PizzaCardProps = {
  pizza: Pizza;
  quantityInCart: number;
};

export function PizzaCard({ pizza, quantityInCart }: PizzaCardProps) {
  const [pending, startTransition] = useTransition();

  function handleAdd() {
    startTransition(async () => {
      await addToCart(pizza.id);
    });
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300">
      <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
        <span className="text-6xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
          {pizza.emoji}
        </span>
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-stone-600 shadow-sm">
          {pizza.category}
        </span>
        {quantityInCart > 0 && (
          <span className="absolute top-3 right-3 flex h-7 min-w-7 items-center justify-center rounded-full bg-red-600 px-2 text-xs font-bold text-white shadow">
            {quantityInCart}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-serif text-lg font-semibold text-stone-800">
            {pizza.name}
          </h3>
          <p className="mt-1 text-sm text-stone-500 line-clamp-2">
            {pizza.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-lg font-bold text-red-600">
            {formatPrice(pizza.price)}
          </span>
          <button
            onClick={handleAdd}
            disabled={pending}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/20 hover:bg-red-700 active:scale-95 transition disabled:opacity-60"
          >
            {pending ? "..." : quantityInCart > 0 ? "+ Adicionar" : "Adicionar"}
          </button>
        </div>
      </div>
    </article>
  );
}
