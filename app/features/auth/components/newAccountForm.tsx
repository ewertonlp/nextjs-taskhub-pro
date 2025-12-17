"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { signup } from "../authSlice";
import { z } from "zod";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import toast from "react-hot-toast";
import GoogleButton from "./googleButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  email: z.email(),
  password: z.string().min(6, "At least 6 characters"),
});
type RegisterCredentials = z.infer<typeof schema>;

export default function NewAccountForm() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(schema),
  });

  const onSignup = async (data: RegisterCredentials) => {
    try {
      await dispatch(signup(data)).unwrap();
      setShowConfirmModal(true);
      // router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Register failed";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-500 rounded-md shadow-md">
      <form onSubmit={handleSubmit(onSignup)} className=" space-y-4">
        <Input placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <div className="text-center">
          <a
            href=""
            className="text-sm font-medium text-primary hover:text-primary/70 transition durantion-200 "
          >
            Forgot password?
          </a>
        </div>

        <div className="flex-col justify-center items-center space-y-4 mt-2">
          <Button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full"
          >
            Create Account
          </Button>
          <div className="flex items-center justify-center">
            <p className="text-sm  text-slate-500 dark:text-slate-300  mr-2">
              Have already an account?{" "}
            </p>
            <a href="/login" className="text-sm font-medium">
              Log in here
            </a>
          </div>
        </div>
      </form>
      <div className="pt-4 space-y-4 border-t border-t-slate-200 dark:border-t-slate-500">
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Or enter with{" "}
          </p>
        </div>
        <GoogleButton />
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-sm mx-4">
            <h3 className="text-lg font-medium mb-4">Cadastro realizado!</h3>
            <p className="text-sm text-slate-600 mb-6">
              Verifique sua caixa de email para confirmar a conta.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
              >
                Fechar
              </Button>
              <Button
                onClick={() => {
                  setShowConfirmModal(false);
                  router.push("/dashboard");
                }}
              >
                Ir para Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
