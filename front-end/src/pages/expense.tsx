import { DefaultPageTitle } from "@/components/default/default-page-title";
import { DefaultPageWrapper } from "@/components/default/default-page-wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function Expense() {
  return (
    <DefaultPageWrapper className="content-start gap-5">
      <DefaultPageTitle title="Despesas" />
      <Separator />
      <Dialog>
        <DialogTrigger>
          <Button>Adicionar despesa</Button>
        </DialogTrigger>
        <DialogContent>
          <ExpenseForm />
        </DialogContent>
      </Dialog>
      <div className="flex-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Categoria</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex size-8 bg-green-500 justify-center items-center rounded-full">
                  <DollarSign className="size-5 stroke-primary" />
                </div>
              </TableCell>
              <TableCell>Salário</TableCell>
              <TableCell>R$ 5.000,00</TableCell>
              <TableCell className="w-30">
                <Button variant={"secondary"}>
                  <Edit className="stroke-secondary-foreground" />
                </Button>
                <Button variant={"destructive"} className="ml-2">
                  <Trash className="stroke-primary" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DefaultPageWrapper>
  );
}

const expenseSchema = z.object({
  name: z.string().min(2).max(100),
  category: z.string(),
  value: z.number().min(0.01),
});

function ExpenseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      category: "comida",
      value: 0,
    },
  });

  const category = watch("category");

  const onSubmit = (data: z.infer<typeof expenseSchema>) => {
    console.log(data);
  };

  return (
    <form className="flex-container gap-6" onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader>
        <DialogTitle>Formulário de Despesa</DialogTitle>
      </DialogHeader>
      <div className="flex-container gap-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          placeholder="Nome da despesa"
          {...register("name")}
          onChange={() => clearErrors("name")}
        />
        {errors.name && (
          <span>
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
          </span>
        )}
      </div>
      <div className="flex-container gap-2">
        <Label>Categoria</Label>
        <Select
          value={category}
          onValueChange={(value) => setValue("category", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="comida">Comida</SelectItem>
            <SelectItem value="transporte">Transporte</SelectItem>
            <SelectItem value="saude">Saúde</SelectItem>
            <SelectItem value="educacao">Educação</SelectItem>
            <SelectItem value="lazer">Lazer</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-container gap-2">
        <Label htmlFor="value">Valor</Label>
        <div className="flex-container items-center gap-2">
          <span>R$: </span>
          <Input
            className="fill"
            id="value"
            placeholder="Valor da receita"
            {...register("value", { valueAsNumber: true })}
            onChange={() => clearErrors("value")}
          />
          {errors.value && (
            <span className="w-full text-red-400">
              {errors.value.message ==
              "Invalid input: expected number, received NaN"
                ? "Valor inválido"
                : errors.value.message ===
                  "Too small: expected number to be >=0.01"
                ? "O valor deve ser maior ou igual a R$ 0.01"
                : errors.value.message}
            </span>
          )}
        </div>
      </div>
      <DialogFooter className="flex-container">
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </DialogFooter>
    </form>
  );
}
