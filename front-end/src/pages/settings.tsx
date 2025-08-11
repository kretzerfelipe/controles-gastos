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
import { COLOR_CLASSES, ICON_CLASSES } from "@/const/const";
import { DefaultIcon } from "@/components/default/default-icons";

export function Settings() {
  return (
    <DefaultPageWrapper className="content-start gap-5">
      <DefaultPageTitle title="Configurações" />
      <Separator />
      <div className="flex-container gap-5">
        <div className="flex-container fill gap-5">
          <div className="flex-container justify-between  items-center">
            <h2 className="text-xl">Categorias de Receitas</h2>
            <Dialog>
              <DialogTrigger>
                <Button>Adicionar categoria receita</Button>
              </DialogTrigger>
              <DialogContent>
                <IncomeCategoryForm />
              </DialogContent>
            </Dialog>
          </div>
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
        <Separator orientation="vertical" className="h-full" />
        <div className="flex-container fill gap-5">
          <div className="flex-container justify-between items-center">
            <h2 className="text-xl">Categorias de Receitas</h2>
            <Dialog>
              <DialogTrigger>
                <Button>Adicionar categoria receita</Button>
              </DialogTrigger>
              <DialogContent>
                <ExpenseCategoryForm />
              </DialogContent>
            </Dialog>
          </div>
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
      </div>
    </DefaultPageWrapper>
  );
}

const expenseCategorySchema = z.object({
  name: z.string().min(2).max(100),
  color: z.enum(Object.keys(COLOR_CLASSES)),
  icon: z.enum(Object.keys(ICON_CLASSES)),
});

function ExpenseCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(expenseCategorySchema),
    defaultValues: {
      color: "gray",
      icon: "money",
    },
  });

  const color = watch("color");
  const icon = watch("icon");

  const onSubmit = (data: z.infer<typeof expenseCategorySchema>) => {
    console.log(data);
  };

  return (
    <form className="flex-container gap-6" onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader>
        <DialogTitle>Formulário de Categoria de Despesa</DialogTitle>
      </DialogHeader>
      <div className="flex-container gap-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          placeholder="Nome da categoria despesa"
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
        <Label>Cor</Label>
        <Select
          value={color}
          onValueChange={(value) => setValue("color", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(COLOR_CLASSES).map((color) => (
              <SelectItem key={color} value={color}>
                <div className={`flex size-6 ${COLOR_CLASSES[color]}`} />
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-container gap-2">
        <Label>Ícone</Label>
        <Select value={icon} onValueChange={(value) => setValue("icon", value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(ICON_CLASSES).map((icon) => (
              <SelectItem key={icon} value={icon}>
                <DefaultIcon icon={icon} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DialogFooter className="flex-container">
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </DialogFooter>
    </form>
  );
}

const incomeCategorySchema = z.object({
  name: z.string().min(2).max(100),
  color: z.enum(Object.keys(COLOR_CLASSES)),
  icon: z.enum(Object.keys(ICON_CLASSES)),
});

function IncomeCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(incomeCategorySchema),
    defaultValues: {
      color: "gray",
      icon: "money",
    },
  });

  const color = watch("color");
  const icon = watch("icon");

  const onSubmit = (data: z.infer<typeof incomeCategorySchema>) => {
    console.log(data);
  };

  return (
    <form className="flex-container gap-6" onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader>
        <DialogTitle>Formulário de Categoria de Receita</DialogTitle>
      </DialogHeader>
      <div className="flex-container gap-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          placeholder="Nome da categoria receita"
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
        <Label>Cor</Label>
        <Select
          value={color}
          onValueChange={(value) => setValue("color", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(COLOR_CLASSES).map((color) => (
              <SelectItem key={color} value={color}>
                <div className={`flex size-6 ${COLOR_CLASSES[color]}`} />
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-container gap-2">
        <Label>Ícone</Label>
        <Select value={icon} onValueChange={(value) => setValue("icon", value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(ICON_CLASSES).map((icon) => (
              <SelectItem key={icon} value={icon}>
                <DefaultIcon icon={icon} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DialogFooter className="flex-container">
        <Button type="submit" className="w-full">
          Salvar
        </Button>
      </DialogFooter>
    </form>
  );
}
