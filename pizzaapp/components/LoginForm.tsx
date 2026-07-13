"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type AuthState } from "@/lib/actions/auth";

const initialState: AuthState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5 w-full">
      {state.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-stone-600">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="seu@email.com"
          className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-stone-600">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 transition"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-xl bg-red-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-600/25 hover:bg-red-700 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Entrando..." : "Acessar"}
      </button>

      <p className="text-center text-sm text-stone-500">
        Não tem conta?{" "}
        <Link
          href="/cadastro"
          className="font-semibold text-red-600 hover:text-red-700 underline-offset-2 hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
