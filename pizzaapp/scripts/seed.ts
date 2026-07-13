import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { count } from "drizzle-orm";
import { pizzas } from "../lib/db/schema";
import "dotenv/config";

const PIZZA_MENU = [
  {
    name: "Margherita",
    description: "Molho de tomate, mussarela fresca, manjericão e azeite extra virgem",
    price: 4590,
    category: "Clássicas",
    emoji: "🍕",
  },
  {
    name: "Calabresa",
    description: "Calabresa fatiada, cebola roxa, mussarela e orégano",
    price: 4990,
    category: "Clássicas",
    emoji: "🌶️",
  },
  {
    name: "Quatro Queijos",
    description: "Mussarela, gorgonzola, parmesão e provolone gratinado",
    price: 5490,
    category: "Especiais",
    emoji: "🧀",
  },
  {
    name: "Portuguesa",
    description: "Presunto, ovos, cebola, azeitonas, ervilha e mussarela",
    price: 5290,
    category: "Clássicas",
    emoji: "🇵🇹",
  },
  {
    name: "Frango com Catupiry",
    description: "Frango desfiado temperado com catupiry cremoso",
    price: 5190,
    category: "Especiais",
    emoji: "🍗",
  },
  {
    name: "Pepperoni",
    description: "Pepperoni artesanal, mussarela e molho especial",
    price: 5490,
    category: "Especiais",
    emoji: "🔥",
  },
  {
    name: "Vegetariana",
    description: "Abobrinha, berinjela, pimentão, tomate cereja e rúcula",
    price: 4890,
    category: "Vegetarianas",
    emoji: "🥬",
  },
  {
    name: "Bacon Supreme",
    description: "Bacon crocante, cebola caramelizada e cheddar",
    price: 5690,
    category: "Premium",
    emoji: "🥓",
  },
];

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não configurada");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  const [{ value: existing }] = await db.select({ value: count() }).from(pizzas);

  if (existing > 0) {
    console.log(`✓ Cardápio já possui ${existing} pizzas. Seed ignorado.`);
    return;
  }

  console.log("Inserindo pizzas...");
  await db.insert(pizzas).values(PIZZA_MENU);
  console.log(`✓ ${PIZZA_MENU.length} pizzas inseridas com sucesso!`);
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
