import Image from "next/image";
import forno from '../public/assets/forno-pizza.png'

export default function Home() {
  return (
    <div className="flex h-screen w-screen bg-red-400">
      <main className="flex h-screen w-screen">
        <div className="flex justify-center items-center w-1/2">
          <div className="flex-col bg-white w-sm h-auto rounded-2xl p-2 flex justify-center gap-6 p-6 ">
            <h1 className="text-center text-5xl italic font-medium font-serif text-red-500">Casa di Massa</h1>
            <input type="text" className="bg-gray-200 rounded-sm p-2 shadow-xl" placeholder="Digite seu usuário..."/>
            <input type="password" className="bg-gray-200 rounded-sm p-2 shadow-xl" placeholder="Digite sua senha..."/>
            <button className="bg-red-500 text-white h-10 rounded-sm cursor-pointer shadow-2xl">Acessar</button>
            <button className="cursor-pointer">Cadastre-se</button>
          </div>
        </div>
        <div className="h-screen w-1/2">
            <Image
            src={forno}
            className="h-screen w-screen"
            />
        </div>
      </main>
    </div>
  );
}
