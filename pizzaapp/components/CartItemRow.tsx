"use client";

import { useTransition } from "react";
import { addToCart, removeFromCart } from "@/lib/actions/cart";
import { formatPrice } from "@/lib/utils/format";

type CartItemRowProps = {
  pizzaId: number;
  name: string;
  emoji: string;
  price: number;
  quantity: number;
};

export function CartItemRow({
  pizzaId,
  name,
  emoji,
  price,
  quantity,
}: CartItemRowProps) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-orange-50 text-3xl">
        {emoji}
      </span>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-stone-800 truncate">{name}</h3>
        <p className="text-sm text-stone-500">{formatPrice(price)} cada</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            startTransition(async () => {
              await removeFromCart(pizzaId);
            })
          }
          disabled={pending}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition disabled:opacity-50"
          aria-label="Remover uma unidade"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold text-stone-800">
          {quantity}
        </span>
        <button
          onClick={() =>
            startTransition(async () => {
              await addToCart(pizzaId);
            })
          }
          disabled={pending}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition disabled:opacity-50"
          aria-label="Adicionar uma unidade"
        >
          +
        </button>
      </div>

      <span className="w-24 text-right font-bold text-red-600">
        {formatPrice(price * quantity)}
      </span>
    </div>
  );
}
