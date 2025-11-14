"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { login, signup } from "../authSlice";
import { z } from "zod";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import toast from "react-hot-toast";
import GoogleButton from "./googleButton";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.email(),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
});

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success("Login realizado");
      router.push("/dashboard");
    } catch (error: any) {
        toast.error(error.message);
    }
};

const onSignup = async (data: any) => {
    try {
        await dispatch(signup(data)).unwrap();
        toast.success("Conta criada");
        router.push("/dashboard");
        console.log('Cadastro realizado com sucesso no supabase')
    } catch (error) {
        toast.error(error.message);
        console.log('Cadastro realizado com sucesso no supabase', error)
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white dark:bg-slate-800 rounded-md shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
        <Input placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Input type="password" placeholder="Senha" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <div className="text-center">
          <a href="" className="text-sm font-medium text-primary hover:text-primary/70 transition durantion-200 ">
            Esqueceu a senha?
          </a>
        </div>

        <div className="flex-col justify-center items-center space-y-6 mt-4">
          <Button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full"
          >
            Entrar
          </Button>
         <div className="flex items-center justify-center">
          <p className="text-sm font-medium text-slate-500">Ainda não tem cadastro? </p>
        <a
            href="/newAccount"
        >
            Cadastre-se Aqui!
        </a>
    </div>
        </div>
      </form>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">ou</p>
        </div>
        <GoogleButton />
      </div>
    </div>
  );
}
