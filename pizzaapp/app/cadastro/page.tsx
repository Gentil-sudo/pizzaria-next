import Image from "next/image";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/RegisterForm";
import { getSession } from "@/lib/auth/session";

export default async function CadastroPage() {
  const session = await getSession();
  if (session) redirect("/menu");

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 bg-gradient-to-br from-stone-50 via-red-50/30 to-orange-50/40">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <span className="inline-block text-5xl mb-4">🍕</span>
            <h1 className="font-serif text-4xl sm:text-5xl italic font-semibold text-red-600">
              Casa di Massa
            </h1>
            <p className="mt-3 text-stone-500">Crie sua conta e peça já</p>
          </div>

          <div className="rounded-2xl border border-stone-200/80 bg-white/80 backdrop-blur-sm p-8 shadow-xl shadow-stone-200/50">
            <h2 className="mb-6 text-xl font-semibold text-stone-800">
              Criar conta
            </h2>
            <RegisterForm />
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative flex-1">
        <Image
          src="/assets/forno-pizza.png"
          alt="Pizza saindo do forno a lenha"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50/80 via-transparent to-transparent" />
      </div>
    </div>
  );
}
