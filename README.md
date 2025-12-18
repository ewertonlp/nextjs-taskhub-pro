# TaskHub Pro 

Aplicação web moderna para gerenciamento de tarefas, desenvolvida com Next.js, TypeScript e Supabase, com foco em boas práticas de frontend, autenticação segura e experiência do usuário.

🔗 Demo: [https://taskhub-pro.vercel.app](https://nextjs-taskhub-pro.vercel.app/)



## Funcionalidades

- Autenticação com Email e Senha

- Login social com Google (Supabase Auth)

- CRUD completo de tarefas

- Edição de título, descrição e status

- Drag and Drop dos cards das tarefas
    
- Marcar tarefas como concluídas

- Tema Dark / Light

- Layout responsivo



## Tecnologias Utilizadas

- Next.js (App Router)

- Redux

- TypeScript

- Supabase (Autenticação e Gestão das Tarafas)

- Shadcn/ui

- Tailwind CSS



## Decisões Técnicas

- Uso do App Router para aproveitar a arquitetura moderna do Next.js

- Autenticação feita diretamente pelo Supabase Auth, sem backend próprio

- Componentes reutilizáveis com shadcn/ui

- Gerenciamento de estado simples e previsível

- Foco em código limpo, legível e organizado


## Getting Started

You need to set up your project in [`Supabase`](https://supabase.com/dashboard/sign-in?returnTo=%2Forganizations) To log in via Google OAuth, you also need to create a project in the [`Google Cloud Console`](https://console.cloud.google.com/), and then configure the environment variables (create a .env.local file).

## Variáveis de Ambiente

Crie um arquivo .env.local na raiz do projeto:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https:Your Supabase url project
NEXT_PUBLIC_SUPABASE_ANON_KEY=Your Supabase Anon Key
```
⚠️ As chaves públicas do Supabase são seguras para uso no frontend.
Segredos sensíveis não são expostos no repositório.



Execute o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Acesse [http://localhost:3000](http://localhost:3000).



## Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

- Consolidar conhecimentos em Next.js e TailwindCSS

- Praticar integração com Supabase

- Criar um projeto real para portfólio profissional




You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Images

<img width="1046" height="862" alt="trakhub-landing" src="https://github.com/user-attachments/assets/2fe6c2cb-d42a-4c5b-b333-3f7c26dc4ee8" />
<img width="1884" height="862" alt="taskkhub-dashboard" src="https://github.com/user-attachments/assets/754cb1b6-0f27-43b7-b9ed-7911b66245b0" />
<img width="1885" height="858" alt="Taskhub-tasks" src="https://github.com/user-attachments/assets/024b8384-f83e-4e76-9692-7450fd62cd1f" />






