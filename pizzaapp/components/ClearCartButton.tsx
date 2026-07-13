"use client";

import { useTransition } from "react";
import { clearCart } from "@/lib/actions/cart";

export function ClearCartButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await clearCart();
        })
      }
      disabled={pending}
      className="rounded-lg px-4 py-2 text-sm font-medium text-stone-500 hover:bg-stone-100 hover:text-red-600 transition disabled:opacity-50"
    >
      {pending ? "Limpando..." : "Limpar carrinho"}
    </button>
  );
}
