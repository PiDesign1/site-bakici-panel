import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Receipt,
  Droplets,
  Zap,
  Sparkles,
  ArrowUpDown,
  Wrench,
  MoreHorizontal,
} from "lucide-react";

interface Expense {
  id: string;
  type: "cleaning" | "electricity" | "water" | "elevator" | "maintenance" | "other";
  amount: number;
  date: string;
  description: string;
}

const expenseTypes = {
  cleaning: { label: "Temizlik", icon: Sparkles, color: "bg-blue-100 text-blue-600" },
  electricity: { label: "Elektrik", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
  water: { label: "Su", icon: Droplets, color: "bg-cyan-100 text-cyan-600" },
  elevator: { label: "Asansör", icon: ArrowUpDown, color: "bg-purple-100 text-purple-600" },
  maintenance: { label: "Bakım", icon: Wrench, color: "bg-orange-100 text-orange-600" },
  other: { label: "Diğer", icon: MoreHorizontal, color: "bg-gray-100 text-gray-600" },
};

const expenses: Expense[] = [
  { id: "1", type: "cleaning", amount: 3500, date: "10 Ocak 2025", description: "Aylık temizlik ücreti" },
  { id: "2", type: "electricity", amount: 2800, date: "8 Ocak 2025", description: "Ortak alan elektrik faturası" },
  { id: "3", type: "water", amount: 1200, date: "5 Ocak 2025", description: "Bahçe sulama ve ortak alan" },
  { id: "4", type: "elevator", amount: 4500, date: "3 Ocak 2025", description: "Yıllık bakım sözleşmesi (1/12)" },
  { id: "5", type: "maintenance", amount: 850, date: "2 Ocak 2025", description: "Kapı kilidi tamiri" },
  { id: "6", type: "other", amount: 600, date: "1 Ocak 2025", description: "Kırtasiye ve ofis malzemeleri" },
];

export default function Giderler() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const expensesByType = Object.entries(expenseTypes).map(([key, value]) => {
    const total = expenses
      .filter((e) => e.type === key)
      .reduce((sum, e) => sum + e.amount, 0);
    return { key, ...value, total };
  });

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Gider Takibi
            </h1>
            <p className="text-muted-foreground mt-1">
              Site giderlerini kaydedin ve takip edin.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Gider Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Yeni Gider Ekle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Gider Türü</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tür seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(expenseTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Tutar (₺)</Label>
                  <Input id="amount" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Tarih</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Açıklama</Label>
                  <Textarea id="desc" placeholder="Gider hakkında açıklama..." />
                </div>
                <Button className="w-full gradient-primary">Kaydet</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Card */}
        <Card className="shadow-card border-border/50 gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Ocak 2025 - Toplam Gider</p>
                <p className="text-4xl font-bold mt-1">₺{totalExpenses.toLocaleString()}</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                <Receipt className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Type Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {expensesByType.map((type) => (
            <Card key={type.key} className="shadow-card border-border/50">
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center mb-3`}>
                  <type.icon className="w-5 h-5" />
                </div>
                <p className="text-lg font-bold">₺{type.total.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{type.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expenses Table */}
        <Card className="shadow-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Son Giderler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tür</TableHead>
                    <TableHead>Açıklama</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead className="text-right">Tutar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => {
                    const typeInfo = expenseTypes[expense.type];
                    return (
                      <TableRow key={expense.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg ${typeInfo.color} flex items-center justify-center`}>
                              <typeInfo.icon className="w-4 h-4" />
                            </div>
                            <span className="font-medium">{typeInfo.label}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {expense.description}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {expense.date}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ₺{expense.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
