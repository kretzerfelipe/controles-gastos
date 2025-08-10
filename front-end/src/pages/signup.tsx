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
import { PasswordInput } from '@/components/ui/password-input';

export function Signup() {
  return (
    <div className="flex-container min-h-dvh bg-background items-center justify-center p-5">
      <Card className="w-full full max-w-md min">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Insira as informações abaixo para criar sua conta:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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
                />
              </div>
              <div className="flex-container gap-2">
                <Label className="flex-container" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="fernando@email.com"
                  className="flex-container"
                />
              </div>
              <div className="flex-container gap-2">
                <div className="flex-container fill gap-2">
                  <Label className="flex-container" htmlFor="password">
                    Senha
                  </Label>
                  <PasswordInput
                    id="password"
                    placeholder="******"
                    className="flex-container"
                  />
                </div>
                <div className="flex-container fill gap-2">
                  <Label className="flex-container" htmlFor="confirm-password">
                    Confire sua senha
                  </Label>
                  <PasswordInput
                    id="confirm-password"
                    placeholder="******"
                    className="flex-container"
                  />
                </div>
              </div>
            </div>
          </form>
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
    </div>
  );
}
