import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Wrench,
  Clock,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  Calendar,
} from "lucide-react";

interface Request {
  id: string;
  apartmentNo: string;
  subject: string;
  description: string;
  date: string;
  status: "pending" | "in_progress" | "completed";
  adminNote?: string;
}

const statusConfig = {
  pending: {
    label: "Beklemede",
    icon: Clock,
    color: "bg-warning text-warning-foreground",
  },
  in_progress: {
    label: "Yapılıyor",
    icon: PlayCircle,
    color: "bg-info text-info-foreground",
  },
  completed: {
    label: "Tamamlandı",
    icon: CheckCircle2,
    color: "bg-success text-success-foreground",
  },
};

const initialRequests: Request[] = [
  {
    id: "1",
    apartmentNo: "5",
    subject: "Kapı zili arızası",
    description: "Daire kapı zili çalışmıyor, zil sesi gelmiyor.",
    date: "13 Ocak 2025",
    status: "pending",
  },
  {
    id: "2",
    apartmentNo: "12",
    subject: "Balkon su kaçağı",
    description: "Üst kattan balkonumuza su sızıyor.",
    date: "12 Ocak 2025",
    status: "in_progress",
    adminNote: "Tesisatçı yarın gelecek",
  },
  {
    id: "3",
    apartmentNo: "3",
    subject: "Otopark aydınlatması",
    description: "Otopark girişindeki lamba yanmıyor, akşamları çok karanlık.",
    date: "11 Ocak 2025",
    status: "pending",
  },
  {
    id: "4",
    apartmentNo: "8",
    subject: "Asansör düğmesi",
    description: "3. kat asansör çağırma düğmesi çalışmıyor.",
    date: "10 Ocak 2025",
    status: "completed",
    adminNote: "Düğme değiştirildi",
  },
  {
    id: "5",
    apartmentNo: "15",
    subject: "Bahçe çiti kırık",
    description: "Site bahçesindeki tel çit bir yerden kırılmış, güvenlik açığı oluşturabilir.",
    date: "9 Ocak 2025",
    status: "in_progress",
    adminNote: "Malzeme sipariş edildi",
  },
];

export default function Talepler() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter((r) => r.status === filterStatus);

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const inProgressCount = requests.filter((r) => r.status === "in_progress").length;
  const completedCount = requests.filter((r) => r.status === "completed").length;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Arıza / Talep Takibi
            </h1>
            <p className="text-muted-foreground mt-1">
              Sakinlerden gelen talepleri takip edin.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Talep Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Yeni Talep Kaydet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="apt">Daire No</Label>
                  <Input id="apt" placeholder="Örn: 5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Konu</Label>
                  <Input id="subject" placeholder="Talep konusu..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Açıklama</Label>
                  <Textarea id="desc" placeholder="Detaylı açıklama..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Durum</Label>
                  <Select defaultValue="pending">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Beklemede</SelectItem>
                      <SelectItem value="in_progress">Yapılıyor</SelectItem>
                      <SelectItem value="completed">Tamamlandı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">Yönetici Notu (Opsiyonel)</Label>
                  <Input id="note" placeholder="Not ekleyin..." />
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
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Beklemede</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inProgressCount}</p>
                  <p className="text-sm text-muted-foreground">Yapılıyor</p>
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
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-sm text-muted-foreground">Tamamlandı</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Card className="shadow-card border-border/50">
          <CardContent className="p-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Durum filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="in_progress">Yapılıyor</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const status = statusConfig[request.status];
            return (
              <Card
                key={request.id}
                className="shadow-card border-border/50 hover:shadow-card-hover transition-all"
              >
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Wrench className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="text-sm font-medium text-primary">
                            Daire {request.apartmentNo}
                          </span>
                          <Badge className={status.color}>
                            <status.icon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{request.subject}</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {request.description}
                        </p>
                        {request.adminNote && (
                          <div className="bg-muted/50 rounded-lg p-3 mb-3">
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Yönetici Notu:
                            </p>
                            <p className="text-sm">{request.adminNote}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {request.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Select defaultValue={request.status}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Beklemede</SelectItem>
                          <SelectItem value="in_progress">Yapılıyor</SelectItem>
                          <SelectItem value="completed">Tamamlandı</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
