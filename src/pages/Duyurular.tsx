import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Megaphone, Calendar, Edit, Trash2 } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  isActive: boolean;
}

const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Asansör bakımı yapılacaktır",
    description: "15 Ocak 2025 tarihinde saat 10:00-14:00 arasında asansör bakımı nedeniyle hizmet dışı olacaktır. Anlayışınız için teşekkür ederiz.",
    date: "14 Ocak 2025",
    isActive: true,
  },
  {
    id: "2",
    title: "Su kesintisi hakkında",
    description: "İSKİ tarafından yapılacak çalışmalar nedeniyle 12 Ocak Cumartesi günü 09:00-17:00 saatleri arasında su kesintisi yaşanacaktır.",
    date: "12 Ocak 2025",
    isActive: true,
  },
  {
    id: "3",
    title: "Aidat son ödeme tarihi",
    description: "Ocak ayı aidatlarının son ödeme tarihi 20 Ocak 2025'tir. Geciken ödemeler için yasal faiz uygulanacaktır.",
    date: "10 Ocak 2025",
    isActive: true,
  },
  {
    id: "4",
    title: "Otopark düzenlemesi",
    description: "Otopark alanlarının yeniden düzenlenmesi planlanmaktadır. Detaylar yakında paylaşılacaktır.",
    date: "8 Ocak 2025",
    isActive: false,
  },
  {
    id: "5",
    title: "Yeni güvenlik sistemi",
    description: "Site girişine yeni kart okuyucu sistemler kurulmuştur. Tüm sakinlerin yeni kartlarını yönetimden alması gerekmektedir.",
    date: "5 Ocak 2025",
    isActive: true,
  },
];

export default function Duyurular() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleActive = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const activeCount = announcements.filter((a) => a.isActive).length;

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Duyurular
            </h1>
            <p className="text-muted-foreground mt-1">
              Site sakinlerine duyuru yayınlayın.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Duyuru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Yeni Duyuru Yayınla</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlık</Label>
                  <Input id="title" placeholder="Duyuru başlığı..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Açıklama</Label>
                  <Textarea
                    id="desc"
                    placeholder="Duyuru içeriği..."
                    className="min-h-[120px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="active">Yayına al</Label>
                  <Switch id="active" defaultChecked />
                </div>
                <Button className="w-full gradient-primary">Yayınla</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{announcements.length}</p>
                  <p className="text-sm text-muted-foreground">Toplam Duyuru</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeCount}</p>
                  <p className="text-sm text-muted-foreground">Aktif Duyuru</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`shadow-card border-border/50 transition-all ${
                !announcement.isActive ? "opacity-60" : ""
              }`}
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Megaphone className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="font-semibold text-lg">{announcement.title}</h3>
                        <Badge variant={announcement.isActive ? "default" : "secondary"}>
                          {announcement.isActive ? "Aktif" : "Pasif"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">
                        {announcement.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {announcement.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Switch
                      checked={announcement.isActive}
                      onCheckedChange={() => toggleActive(announcement.id)}
                    />
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
