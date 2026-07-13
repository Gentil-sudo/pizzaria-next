# 🍕 PizzaApp

Uma aplicação web de pizzaria desenvolvida com **Next.js**, permitindo visualizar o cardápio, autenticação de usuários e gerenciamento do carrinho de compras.

> Projeto desenvolvido para praticar o desenvolvimento Full Stack utilizando as tecnologias mais utilizadas no mercado.

## 🚀 Demonstração

🔗 **Aplicação:** *(https://pizzaria-next-sandy.vercel.app/)*

## 🛠️ Tecnologias Utilizadas

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Drizzle ORM
- PostgreSQL
- Neon Database
- NextAuth/Auth.js
- Vercel

## 📁 Estrutura do Projeto

```text
pizzaapp/
├── app/
├── components/
├── lib/
│   ├── db/
│   └── auth/
├── scripts/
├── drizzle/
├── public/
└── ...
```

## ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/Gentil-sudo/pizzaria-next.git
```

Entre na pasta do projeto:

```bash
cd pizzaria-next/pizzaapp
```

Instale as dependências:

```bash
npm install
```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto contendo:

```env
DATABASE_URL=sua_url_do_neon
AUTH_SECRET=seu_auth_secret
```

---

## ▶️ Executando o Projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## 🗄️ Banco de Dados

Aplicar as migrações:

```bash
npm run db:push
```

Popular o banco com dados iniciais:

```bash
npm run db:seed
```

---

## 🚀 Deploy

O projeto está configurado para deploy automático na **Vercel**.

Sempre que um novo commit é enviado para a branch `main`, uma nova versão é publicada automaticamente.

---

## 📚 Aprendizados

Durante o desenvolvimento deste projeto foram utilizados conceitos como:

- Estruturação de aplicações com Next.js
- Componentização com React
- Estilização com Tailwind CSS
- Banco de dados PostgreSQL
- Modelagem utilizando Drizzle ORM
- Autenticação de usuários
- Deploy na Vercel
- Integração com Neon Database
- Versionamento com Git e GitHub

---

## 📌 Funcionalidades

- ✅ Listagem de pizzas
- ✅ Cadastro de usuários
- ✅ Login
- ✅ Carrinho de compras
- ✅ Persistência de dados com PostgreSQL
- ✅ Interface responsiva

---

## 👨‍💻 Autor

Desenvolvido por **Enzo Gentil**

- GitHub: https://github.com/Gentil-sudo
- LinkedIn: *(https://www.linkedin.com/in/enzo-gentil-xavier/)*

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e aprendizado.
