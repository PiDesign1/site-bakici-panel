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
import { Plus, Search, Phone, User, Home, Building2 } from "lucide-react";

interface Apartment {
  id: string;
  block: string;
  number: string;
  floor: number;
  residentName: string;
  residentType: "owner" | "tenant";
  phone: string;
  duesStatus: "paid" | "unpaid";
  notes: string;
}

const blocks = ["A", "B", "C"];

const initialApartments: Apartment[] = [
  { id: "1", block: "A", number: "1", floor: 1, residentName: "Ahmet Yılmaz", residentType: "owner", phone: "0532 111 2233", duesStatus: "paid", notes: "" },
  { id: "2", block: "A", number: "2", floor: 1, residentName: "Mehmet Kaya", residentType: "tenant", phone: "0533 222 3344", duesStatus: "paid", notes: "Kiracı, 2 yıllık sözleşme" },
  { id: "3", block: "A", number: "3", floor: 1, residentName: "Ayşe Demir", residentType: "owner", phone: "0534 333 4455", duesStatus: "unpaid", notes: "" },
  { id: "4", block: "A", number: "4", floor: 2, residentName: "Fatma Çelik", residentType: "owner", phone: "0535 444 5566", duesStatus: "paid", notes: "" },
  { id: "5", block: "B", number: "1", floor: 1, residentName: "Ali Yıldız", residentType: "tenant", phone: "0536 555 6677", duesStatus: "unpaid", notes: "Yeni taşındı" },
  { id: "6", block: "B", number: "2", floor: 1, residentName: "Hasan Öz", residentType: "owner", phone: "0537 666 7788", duesStatus: "paid", notes: "" },
  { id: "7", block: "B", number: "3", floor: 2, residentName: "Zeynep Ak", residentType: "owner", phone: "0538 777 8899", duesStatus: "paid", notes: "" },
  { id: "8", block: "C", number: "1", floor: 1, residentName: "", residentType: "owner", phone: "", duesStatus: "unpaid", notes: "Boş daire" },
];

export default function Daireler() {
  const [apartments, setApartments] = useState<Apartment[]>(initialApartments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBlock, setFilterBlock] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredApartments = apartments.filter((apt) => {
    const matchesSearch =
      apt.number.includes(searchTerm) ||
      apt.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.residentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlock = filterBlock === "all" || apt.block === filterBlock;
    return matchesSearch && matchesBlock;
  });

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Daire & Sakin Yönetimi
            </h1>
            <p className="text-muted-foreground mt-1">
              Tüm daireleri ve sakinleri buradan yönetin.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Daire
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Yeni Daire Ekle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="block">Blok</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Blok seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {blocks.map((block) => (
                        <SelectItem key={block} value={block}>
                          {block} Blok
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number">Daire No</Label>
                    <Input id="number" placeholder="Örn: 5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Kat</Label>
                    <Input id="floor" type="number" placeholder="Örn: 2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resident">Sakin Adı</Label>
                  <Input id="resident" placeholder="Ad Soyad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Sakin Tipi</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Ev Sahibi</SelectItem>
                      <SelectItem value="tenant">Kiracı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" placeholder="0532 XXX XXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notlar</Label>
                  <Textarea id="notes" placeholder="Ek bilgiler..." />
                </div>
                <Button className="w-full gradient-primary">Kaydet</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search & Filter */}
        <Card className="shadow-card border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Blok, daire no veya isim ile ara..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterBlock} onValueChange={setFilterBlock}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <Building2 className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Blok" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Bloklar</SelectItem>
                  {blocks.map((block) => (
                    <SelectItem key={block} value={block}>
                      {block} Blok
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-card border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Toplam Daire</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Home className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">20</p>
                <p className="text-xs text-muted-foreground">Dolu</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Home className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Boş</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <User className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Kiracı</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Apartments Table */}
        <Card className="shadow-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Daire Listesi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Blok</TableHead>
                    <TableHead>Daire</TableHead>
                    <TableHead>Kat</TableHead>
                    <TableHead>Sakin</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Aidat</TableHead>
                    <TableHead>Not</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApartments.map((apt) => (
                    <TableRow key={apt.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <Badge variant="outline" className="font-semibold">
                          {apt.block} Blok
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">Daire {apt.number}</TableCell>
                      <TableCell>{apt.floor}. Kat</TableCell>
                      <TableCell>
                        {apt.residentName || (
                          <span className="text-muted-foreground italic">Boş</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {apt.residentName && (
                          <Badge variant={apt.residentType === "owner" ? "default" : "secondary"}>
                            {apt.residentType === "owner" ? "Ev Sahibi" : "Kiracı"}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {apt.phone && (
                          <span className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            {apt.phone}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={apt.duesStatus === "paid" ? "default" : "destructive"}
                          className={apt.duesStatus === "paid" ? "bg-success hover:bg-success/90" : ""}
                        >
                          {apt.duesStatus === "paid" ? "Ödendi" : "Ödenmedi"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate text-muted-foreground text-sm">
                        {apt.notes}
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
