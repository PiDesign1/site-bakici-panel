import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  PercentCircle,
  AlertCircle,
} from "lucide-react";

const monthlyData = [
  { month: "Ağu", income: 18500, expense: 12000 },
  { month: "Eyl", income: 19200, expense: 11500 },
  { month: "Eki", income: 20000, expense: 13200 },
  { month: "Kas", income: 19800, expense: 14500 },
  { month: "Ara", income: 20100, expense: 15800 },
  { month: "Oca", income: 15300, expense: 13450 },
];

const collectionData = [
  { name: "Tahsil Edilen", value: 75, color: "hsl(142, 70%, 45%)" },
  { name: "Bekleyen", value: 25, color: "hsl(38, 92%, 50%)" },
];

const expenseDistribution = [
  { name: "Temizlik", value: 26, color: "hsl(199, 89%, 48%)" },
  { name: "Elektrik", value: 21, color: "hsl(45, 93%, 47%)" },
  { name: "Su", value: 9, color: "hsl(187, 92%, 45%)" },
  { name: "Asansör", value: 33, color: "hsl(280, 65%, 60%)" },
  { name: "Bakım", value: 6, color: "hsl(25, 95%, 53%)" },
  { name: "Diğer", value: 5, color: "hsl(220, 15%, 50%)" },
];

const debtorApartments = [
  { no: "3", resident: "Ayşe Demir", debt: 1700, months: 2 },
  { no: "5", resident: "Ali Yıldız", debt: 850, months: 1 },
  { no: "8", resident: "-", debt: 2550, months: 3 },
  { no: "11", resident: "Kemal Aslan", debt: 850, months: 1 },
  { no: "18", resident: "Selin Yurt", debt: 1700, months: 2 },
];

export default function Raporlar() {
  const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
  const totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0);
  const balance = totalIncome - totalExpense;
  const collectionRate = 75;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Raporlar
            </h1>
            <p className="text-muted-foreground mt-1">
              Gelir-gider ve tahsilat durumunu analiz edin.
            </p>
          </div>
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Son 3 Ay</SelectItem>
              <SelectItem value="6months">Son 6 Ay</SelectItem>
              <SelectItem value="12months">Son 12 Ay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Gelir</p>
                  <p className="text-2xl font-bold mt-1">₺{totalIncome.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Gider</p>
                  <p className="text-2xl font-bold mt-1">₺{totalExpense.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Bakiye</p>
                  <p className="text-2xl font-bold mt-1">₺{balance.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tahsilat Oranı</p>
                  <p className="text-2xl font-bold mt-1">%{collectionRate}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                  <PercentCircle className="w-6 h-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expense Chart */}
          <Card className="shadow-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Aylık Gelir - Gider</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₺${v/1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`₺${value.toLocaleString()}`, ""]}
                    />
                    <Bar dataKey="income" name="Gelir" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" name="Gider" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Collection Rate Pie */}
          <Card className="shadow-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Aidat Tahsilat Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={collectionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {collectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`%${value}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expense Distribution & Debtors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Distribution */}
          <Card className="shadow-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Gider Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      paddingAngle={1}
                      dataKey="value"
                      label={({ name, value }) => `${name} %${value}`}
                      labelLine={false}
                    >
                      {expenseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`%${value}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Debtor List */}
          <Card className="shadow-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Borçlu Daire Listesi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {debtorApartments.map((apt) => (
                  <div
                    key={apt.no}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                        <span className="font-bold text-warning">{apt.no}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{apt.resident}</p>
                        <p className="text-xs text-muted-foreground">{apt.months} ay gecikme</p>
                      </div>
                    </div>
                    <p className="font-bold text-destructive">₺{apt.debt.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
