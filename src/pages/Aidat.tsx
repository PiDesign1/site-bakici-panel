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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Filter,
} from "lucide-react";

interface DuesRecord {
  id: string;
  apartmentNo: string;
  residentName: string;
  month: string;
  amount: number;
  status: "paid" | "unpaid";
  paidDate?: string;
  description?: string;
}

const duesRecords: DuesRecord[] = [
  { id: "1", apartmentNo: "1", residentName: "Ahmet Yılmaz", month: "Ocak 2025", amount: 850, status: "paid", paidDate: "5 Ocak 2025" },
  { id: "2", apartmentNo: "2", residentName: "Mehmet Kaya", month: "Ocak 2025", amount: 850, status: "paid", paidDate: "8 Ocak 2025" },
  { id: "3", apartmentNo: "3", residentName: "Ayşe Demir", month: "Ocak 2025", amount: 850, status: "unpaid" },
  { id: "4", apartmentNo: "4", residentName: "Fatma Çelik", month: "Ocak 2025", amount: 850, status: "paid", paidDate: "10 Ocak 2025" },
  { id: "5", apartmentNo: "5", residentName: "Ali Yıldız", month: "Ocak 2025", amount: 850, status: "unpaid" },
  { id: "6", apartmentNo: "6", residentName: "Hasan Öz", month: "Ocak 2025", amount: 850, status: "paid", paidDate: "12 Ocak 2025" },
  { id: "7", apartmentNo: "7", residentName: "Zeynep Ak", month: "Ocak 2025", amount: 850, status: "paid", paidDate: "3 Ocak 2025" },
  { id: "8", apartmentNo: "8", residentName: "-", month: "Ocak 2025", amount: 850, status: "unpaid" },
];

export default function Aidat() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "unpaid">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredRecords = duesRecords.filter((record) => {
    const matchesSearch =
      record.apartmentNo.includes(searchTerm) ||
      record.residentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalDues = duesRecords.reduce((sum, r) => sum + r.amount, 0);
  const paidDues = duesRecords.filter((r) => r.status === "paid").reduce((sum, r) => sum + r.amount, 0);
  const unpaidDues = duesRecords.filter((r) => r.status === "unpaid").reduce((sum, r) => sum + r.amount, 0);

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Aidat & Ödeme Takibi
            </h1>
            <p className="text-muted-foreground mt-1">
              Aylık aidat durumlarını takip edin ve ödemeleri kaydedin.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Ödeme Kaydet
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Yeni Ödeme Kaydet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="apt">Daire</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Daire seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {duesRecords.map((r) => (
                        <SelectItem key={r.id} value={r.apartmentNo}>
                          Daire {r.apartmentNo} - {r.residentName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="month">Ay</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Ay seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ocak2025">Ocak 2025</SelectItem>
                      <SelectItem value="subat2025">Şubat 2025</SelectItem>
                      <SelectItem value="mart2025">Mart 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Tutar (₺)</Label>
                  <Input id="amount" type="number" defaultValue={850} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Ödeme Tarihi</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Açıklama (Opsiyonel)</Label>
                  <Input id="desc" placeholder="Ek bilgi..." />
                </div>
                <Button className="w-full gradient-primary">Kaydet</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₺{totalDues.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Toplam Tahakkuk</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₺{paidDues.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Tahsil Edilen</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₺{unpaidDues.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Bekleyen</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-card border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Daire no veya isim ile ara..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="paid">Ödenenler</SelectItem>
                    <SelectItem value="unpaid">Borçlular</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="ocak2025">
                  <SelectTrigger className="w-[150px]">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ocak2025">Ocak 2025</SelectItem>
                    <SelectItem value="aralik2024">Aralık 2024</SelectItem>
                    <SelectItem value="kasim2024">Kasım 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dues Table */}
        <Card className="shadow-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Ocak 2025 - Aidat Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Daire</TableHead>
                    <TableHead>Sakin</TableHead>
                    <TableHead>Ay</TableHead>
                    <TableHead>Tutar</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Ödeme Tarihi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">Daire {record.apartmentNo}</TableCell>
                      <TableCell>{record.residentName}</TableCell>
                      <TableCell>{record.month}</TableCell>
                      <TableCell className="font-semibold">₺{record.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={record.status === "paid" ? "default" : "destructive"}
                          className={record.status === "paid" ? "bg-success hover:bg-success/90" : ""}
                        >
                          {record.status === "paid" ? "Ödendi" : "Ödenmedi"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {record.paidDate || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
