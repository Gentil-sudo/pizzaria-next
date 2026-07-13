"use server";

import { asc, and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { cartItems, pizzas } from "@/lib/db/schema";
import { getSession } from "@/lib/auth/session";

export type CartActionState = {
  error?: string;
  success?: string;
};

async function requireUserId() {
  const session = await getSession();
  if (!session) throw new Error("Não autenticado");
  return session.userId;
}

export async function addToCart(pizzaId: number) {
  const userId = await requireUserId();

  const [existing] = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.userId, userId), eq(cartItems.pizzaId, pizzaId)));

  if (existing) {
    await db
      .update(cartItems)
      .set({ quantity: existing.quantity + 1 })
      .where(eq(cartItems.id, existing.id));
  } else {
    await db.insert(cartItems).values({ userId, pizzaId, quantity: 1 });
  }

  revalidatePath("/menu");
  revalidatePath("/carrinho");
}

export async function removeFromCart(pizzaId: number) {
  const userId = await requireUserId();

  const [existing] = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.userId, userId), eq(cartItems.pizzaId, pizzaId)));

  if (!existing) return;

  if (existing.quantity <= 1) {
    await db.delete(cartItems).where(eq(cartItems.id, existing.id));
  } else {
    await db
      .update(cartItems)
      .set({ quantity: existing.quantity - 1 })
      .where(eq(cartItems.id, existing.id));
  }

  revalidatePath("/menu");
  revalidatePath("/carrinho");
}

export async function clearCart() {
  const userId = await requireUserId();
  await db.delete(cartItems).where(eq(cartItems.userId, userId));
  revalidatePath("/menu");
  revalidatePath("/carrinho");
}

export async function getCartItems() {
  const session = await getSession();
  if (!session) return [];

  return db
    .select({
      id: cartItems.id,
      quantity: cartItems.quantity,
      pizzaId: pizzas.id,
      name: pizzas.name,
      description: pizzas.description,
      price: pizzas.price,
      emoji: pizzas.emoji,
      category: pizzas.category,
    })
    .from(cartItems)
    .innerJoin(pizzas, eq(cartItems.pizzaId, pizzas.id))
    .where(eq(cartItems.userId, session.userId));
}

export async function getCartCount() {
  const items = await getCartItems();
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export async function getAllPizzas() {
  return db
    .select()
    .from(pizzas)
    .orderBy(asc(pizzas.category), asc(pizzas.name));
}

