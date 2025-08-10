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

export function Expense() {
  return (
    <DefaultPageWrapper className="content-start gap-5">
      <DefaultPageTitle title="Despesas" />
      <Separator />
      <Button>Adicionar despesa</Button>
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
