import { DefaultPageTitle } from "@/components/default/default-page-title";
import { DefaultPageWrapper } from "@/components/default/default-page-wrapper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Home() {
  return (
    <DefaultPageWrapper className="content-start gap-5">
      <DefaultPageTitle title="Home" />
      <div className="flex-container justify-end">
        <Select defaultValue="1">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 mês</SelectItem>
            <SelectItem value="3">3 meses</SelectItem>
            <SelectItem value="6">6 meses</SelectItem>
            <SelectItem value="12">1 ano</SelectItem>
            <SelectItem value="24">2 ano</SelectItem>
            <SelectItem value="36">3 ano</SelectItem>
            <SelectItem value="60">5 ano</SelectItem>
            <SelectItem value="total">Total</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-container gap-5">
        <Card className="fill">
          <CardHeader>
            <CardTitle>Total economizado:</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <span className="text-4xl font-bold text-green-600">
              R$ 1.000,00
            </span>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-muted-foreground">
            Neste local, você pode ver o valor total economizado durante o
            período filtrado.
          </CardFooter>
        </Card>
        <Card className="fill">
          <CardHeader>
            <CardTitle>Total de receitas:</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <span className="text-4xl font-bold text-green-600">
              R$ 5.000,00
            </span>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-muted-foreground">
            Neste local, você pode ver o valor total de receitas durante o
            período filtrado.
          </CardFooter>
        </Card>
        <Card className="fill">
          <CardHeader>
            <CardTitle>Total de despesas:</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <span className="text-4xl font-bold text-red-400">R$ 4.000,00</span>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-muted-foreground">
            Neste local, você pode ver o valor total de despesas durante o
            período filtrado.
          </CardFooter>
        </Card>
      </div>
    </DefaultPageWrapper>
  );
}
