# TaskHub Pro 

Aplicação web moderna para gerenciamento de tarefas, desenvolvida com Next.js, TypeScript e Supabase, com foco em boas práticas de frontend, autenticação segura e experiência do usuário.

🔗 Demo: [https://seuprojeto.vercel.app](https://nextjs-taskhub-pro.vercel.app/)


✨ Funcionalidades

✅ Autenticação com Email e Senha
🔐 Login social com Google (Supabase Auth)
📝 CRUD completo de tarefas
📌 Edição de título, descrição e status
<img width="512" height="512" alt="image" src="https://github.com/user-attachments/assets/fe6cc9c2-1564-442d-94a5-1c821eba8f04" />

✔️ Marcar tarefas como concluídas
🗑️ Exclusão com confirmação (AlertDialog – shadcn/ui)
🌙 Tema Dark / Light
📱 Layout responsivo

## Getting Started


You need to set up your project in [`Supabase`](https://supabase.com/dashboard/sign-in?returnTo=%2Forganizations) To log in via Google OAuth, you also need to create a project in the [`Google Cloud Console`](https://console.cloud.google.com/), and then configure the environment variables (create a .env.local file).

## Environment Variables

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https:Your Supabase url project
NEXT_PUBLIC_SUPABASE_ANON_KEY=Your Supabase Anon Key
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET="<client-secret>"
```


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Images

<img width="1046" height="862" alt="trakhub-landing" src="https://github.com/user-attachments/assets/2fe6c2cb-d42a-4c5b-b333-3f7c26dc4ee8" />
<img width="1884" height="862" alt="taskkhub-dashboard" src="https://github.com/user-attachments/assets/754cb1b6-0f27-43b7-b9ed-7911b66245b0" />
<img width="1885" height="858" alt="Taskhub-tasks" src="https://github.com/user-attachments/assets/024b8384-f83e-4e76-9692-7450fd62cd1f" />






