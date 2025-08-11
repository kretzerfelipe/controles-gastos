import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { postAuthRegister } from "@/api/auth/post-auth-register";
import { queryClient } from "@/lib/react-query";
import { useAuthContext } from "@/app";

const loginSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"], // aponta o erro para o campo confirmPassword
  });

export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { setUser } = useAuthContext()

  const [loginError, setLoginError] = useState<string | null>(null);

  const registerMutation = useMutation({
    mutationFn: postAuthRegister,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], () => {
        localStorage.setItem("access_token", data.access_token);
        setUser(data.user)
        return data.user;
      });
    },
    onError: () => {
      setLoginError("Erro ao fazer login");
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    registerMutation.mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-container min-h-dvh bg-background items-center justify-center p-5"
    >
      <Card className="w-full full max-w-md min">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Insira as informações abaixo para criar sua conta:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex-container gap-2">
              <Label className="flex-container" htmlFor="name">
                Nome
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Fernando"
                className="flex-container"
                {...register("name")}
                onChange={() => {
                  clearErrors("name");
                }}
              />
              {errors.name && (
                <span className="text-red-400">
                  {errors.name.message ===
                  "Too small: expected string to have >=2 characters"
                    ? "Nome muito curto"
                    : errors.name.message ===
                      "Too big: expected string to have <=100 characters"
                    ? "Nome muito longo"
                    : errors.name.message}
                </span>
              )}
            </div>
            <div className="flex-container gap-2">
              <Label className="flex-container" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="fernando@email.com"
                className="flex-container"
                {...register("email")}
                onChange={() => {
                  clearErrors("email");
                }}
              />
              {errors.email && (
                <p className="text-red-400">
                  {errors.email.message === "Invalid email address"
                    ? "Email inválido"
                    : errors.email.message}
                </p>
              )}
            </div>
            <div className="flex-container gap-2 items-start">
              <div className="flex-container fill gap-2">
                <Label className="flex-container" htmlFor="password">
                  Senha
                </Label>
                <PasswordInput
                  id="password"
                  placeholder="******"
                  className="flex-container"
                  {...register("password")}
                  onChange={() => {
                    clearErrors("password");
                  }}
                />
                {errors.password && (
                  <span className="text-red-400">
                    {errors.password.message ===
                    "Too small: expected string to have >=6 characters"
                      ? "Senha muito curta"
                      : errors.password.message ===
                        "Too big: expected string to have <=100 characters"
                      ? "Senha muito longa"
                      : errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex-container fill gap-2">
                <Label className="flex-container" htmlFor="confirm-password">
                  Confire sua senha
                </Label>
                <PasswordInput
                  id="confirm-password"
                  placeholder="******"
                  className="flex-container"
                  {...register("confirmPassword")}
                  onChange={() => {
                    clearErrors("confirmPassword");
                  }}
                />
                {errors.confirmPassword && (
                  <span className="text-red-400">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
            {loginError && <p className="text-red-400">{loginError}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Criar conta
          </Button>
          <p>
            Já tem uma conta? Clique{" "}
            <a href="/login" className="underline">
              aqui
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
