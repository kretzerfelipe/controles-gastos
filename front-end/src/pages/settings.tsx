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
import { Edit, Trash } from "lucide-react";
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
import { useCategory } from "@/queries/categories";
import { Ring } from "ldrs/react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@/api/categories/create-category";
import { queryClient } from "@/lib/react-query";
import { useEffect, useState } from "react";
import { deleteCategory } from "@/api/categories/delete-category";
import type { Category } from "@/@types/category";
import { updateCategory } from "@/api/categories/update-category";

export function Settings() {
  const { categories: incomeCategories, query: incomeQuery } =
    useCategory("income");
  const { categories: expenseCategories, query: expenseQuery } =
    useCategory("expense");

  const [openIncomeDialog, setOpenIncomeDialog] = useState(false);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);

  return (
    <DefaultPageWrapper className="content-start gap-5">
      <DefaultPageTitle title="Configurações" />
      <Separator />
      <div className="flex-container gap-5">
        <div className="flex-container fill gap-5 content-start justify-center">
          <div className="flex-container justify-between items-center">
            <h2 className="text-xl">Categorias de Receitas</h2>
            <Dialog open={openIncomeDialog} onOpenChange={setOpenIncomeDialog}>
              <DialogTrigger>
                <Button>Adicionar categoria receita</Button>
              </DialogTrigger>
              <DialogContent>
                <IncomeCategoryForm
                  onClose={() => setOpenIncomeDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
          {incomeQuery.isLoading ? (
            <Ring
              size="20"
              stroke="2.5"
              bgOpacity="0"
              speed="2"
              color="var(--foreground)"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nome</TableHead>
                  <TableHead>Cor</TableHead>
                  <TableHead>Ícone</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeCategories &&
                  incomeCategories.map((c) => <CategoryTableRow {...c} />)}
              </TableBody>
            </Table>
          )}
        </div>
        <Separator orientation="vertical" className="h-full" />
        <div className="flex-container fill gap-5 content-start justify-center">
          <div className="flex-container justify-between items-center">
            <h2 className="text-xl">Categorias de Receitas</h2>
            <Dialog
              open={openExpenseDialog}
              onOpenChange={setOpenExpenseDialog}
            >
              <DialogTrigger>
                <Button>Adicionar categoria receita</Button>
              </DialogTrigger>
              <DialogContent>
                <ExpenseCategoryForm
                  onClose={() => setOpenExpenseDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
          {expenseQuery.isLoading ? (
            <Ring
              size="20"
              stroke="2.5"
              bgOpacity="0"
              speed="2"
              color="var(--foreground)"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nome</TableHead>
                  <TableHead>Ícone</TableHead>
                  <TableHead>Cor</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseCategories &&
                  expenseCategories.map((c) => <CategoryTableRow {...c} />)}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DefaultPageWrapper>
  );
}

function CategoryTableRow(c: Category) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category", c._type],
      });
      setOpenDeleteDialog(false);
    },
    onError: (error) => {
      console.error("Error creating course:", error);
    },
  });

  const onDeleteClick = (id: number) => {
    deleteCategoryMutation.mutateAsync({
      id: id,
    });
  };

  return (
    <TableRow key={c._id}>
      <TableCell>{c._name}</TableCell>
      <TableCell className="font-medium">
        <DefaultIcon icon={c._icon} className="size-5 stroke-primary" />
      </TableCell>
      <TableCell>
        <div
          className={cn(
            "flex size-8 justify-center items-center rounded-full",
            COLOR_CLASSES[c._color]
          )}
        />
      </TableCell>
      <TableCell className="w-30">
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogTrigger>
            <Button variant={"secondary"}>
              <Edit className="stroke-secondary-foreground" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            {c._type === "income" ? (
              <IncomeCategoryForm
                onClose={() => setOpenEditDialog(false)}
                categoryToEdit={c}
              />
            ) : (
              <ExpenseCategoryForm
                onClose={() => setOpenEditDialog(false)}
                categoryToEdit={c}
              />
            )}
          </DialogContent>
        </Dialog>
        <div className="inline-flex w-2" />
        <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <DialogTrigger>
            <Button variant={"destructive"} className="ml-2">
              <Trash className="stroke-primary" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="gap-5">
              <DialogTitle>
                Você tem certeza que deseja deletar o conteúdo: {c._name}
              </DialogTitle>
              <DialogFooter>
                <Button
                  variant={"secondary"}
                  onClick={() => setOpenDeleteDialog(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => onDeleteClick(c._id)}
                >
                  Deletar
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}

const expenseCategorySchema = z.object({
  name: z.string().min(2).max(100),
  color: z.enum(Object.keys(COLOR_CLASSES)),
  icon: z.enum(Object.keys(ICON_CLASSES)),
});

function ExpenseCategoryForm({
  onClose,
  categoryToEdit,
}: {
  onClose: () => void;
  categoryToEdit?: Category;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(expenseCategorySchema),
    defaultValues: {
      color: "gray",
      icon: "money",
    },
  });

  const [acting, setActing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      reset({
        color: (categoryToEdit?._color as keyof typeof COLOR_CLASSES) || "gray",
        icon: (categoryToEdit?._icon as keyof typeof ICON_CLASSES) || "money",
        name: categoryToEdit?._name || "",
      });
    }, 10);
  }, [categoryToEdit]);

  const color = watch("color");
  const icon = watch("icon");

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category", "expense"],
      });
      setActing(false);
      onClose();
    },
    onError: (error) => {
      setActing(false);
      console.error("Error creating course:", error);
    },
  });

  const editCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category", "expense"],
      });
      setActing(false);
      onClose();
    },
    onError: (error) => {
      setActing(false);
      console.error("Error creating course:", error);
    },
  });

  const onSubmit = (data: z.infer<typeof expenseCategorySchema>) => {
    setActing(true);
    if (categoryToEdit) {
      const c = {
        ...data,
        id: categoryToEdit._id,
      };
      editCategoryMutation.mutateAsync(c);
    } else {
      const c = {
        ...data,
        type: "expense" as const,
      };
      createCategoryMutation.mutateAsync(c);
    }
  };

  return (
    <form
      className="flex-container gap-6 relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      {acting && (
        <div className="flex-container h-full absolute justify-center items-center bg-background z-10000">
          <Ring
            size="40"
            stroke="5"
            bgOpacity="0"
            speed="2"
            color="var(--foreground)"
          />
        </div>
      )}
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

function IncomeCategoryForm({
  onClose,
  categoryToEdit,
}: {
  onClose: () => void;
  categoryToEdit?: Category;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(incomeCategorySchema),
    defaultValues: {
      color: "gray",
      icon: "money",
    },
  });

  const [acting, setActing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      reset({
        color: (categoryToEdit?._color as keyof typeof COLOR_CLASSES) || "gray",
        icon: (categoryToEdit?._icon as keyof typeof ICON_CLASSES) || "money",
        name: categoryToEdit?._name || "",
      });
    }, 10);
  }, [categoryToEdit]);

  const color = watch("color");
  const icon = watch("icon");

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category", "income"],
      });
      setActing(false);
      onClose();
    },
    onError: (error) => {
      setActing(false);
      console.error("Error creating course:", error);
    },
  });

  const editCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category", "income"],
      });
      setActing(false);
      onClose();
    },
    onError: (error) => {
      setActing(false);
      console.error("Error creating course:", error);
    },
  });

  const onSubmit = (data: z.infer<typeof incomeCategorySchema>) => {
    setActing(true);
    if (categoryToEdit) {
      const c = {
        ...data,
        id: categoryToEdit._id,
      };
      editCategoryMutation.mutateAsync(c);
    } else {
      const c = {
        ...data,
        type: "income" as const,
      };
      createCategoryMutation.mutateAsync(c);
    }
  };

  return (
    <form
      className="flex-container gap-6 relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      {acting && (
        <div className="flex-container h-full absolute justify-center items-center bg-background z-10000">
          <Ring
            size="40"
            stroke="5"
            bgOpacity="0"
            speed="2"
            color="var(--foreground)"
          />
        </div>
      )}
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
