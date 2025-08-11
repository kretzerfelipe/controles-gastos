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
import { postAuthLogin } from "@/api/auth/post-auth-login";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { useState } from "react";
import type { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: postAuthLogin,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], () => {
        localStorage.setItem("access_token", data.access_token);
        return data.user;
      });
    },
    onError: (error: AxiosError) => {
      if (error.status === 401) {
        setLoginError("Email ou senha inválidos");
      } else {
        setLoginError("Erro ao fazer login");
      }
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutateAsync(data);
  };

  return (
    <form
      className="flex-container min-h-dvh bg-background items-center justify-center p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>
            Insira seu email e senha para entrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="string"
                placeholder="fernando@email.com"
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
              </div>
              <PasswordInput
                id="password"
                placeholder="******"
                {...register("password")}
                onChange={() => {
                  clearErrors("password");
                }}
              />
            </div>
            {loginError && <p className="text-red-400">{loginError}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <p>
            Não tem uma conta? Crie sua conta{" "}
            <a href="/signup" className="underline">
              aqui
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
