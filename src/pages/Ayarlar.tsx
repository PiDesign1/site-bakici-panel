import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Building2, User, Phone, Mail, Wallet, Save } from "lucide-react";
import { toast } from "sonner";

export default function Ayarlar() {
  const handleSave = () => {
    toast.success("Ayarlar başarıyla kaydedildi!");
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in max-w-2xl">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Ayarlar</h1>
          <p className="text-muted-foreground mt-1">
            Site ve yönetici bilgilerini güncelleyin.
          </p>
        </div>

        {/* Site Settings */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Site Bilgileri
            </CardTitle>
            <CardDescription>
              Site adı ve temel ayarları buradan düzenleyebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Adı</Label>
              <Input id="siteName" defaultValue="Yeşil Vadi Sitesi" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Input id="address" defaultValue="Atatürk Mah. 123. Sok. No:5 Kadıköy/İstanbul" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalApartments">Toplam Daire Sayısı</Label>
                <Input id="totalApartments" type="number" defaultValue={24} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floors">Kat Sayısı</Label>
                <Input id="floors" type="number" defaultValue={8} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dues Settings */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Aidat Ayarları
            </CardTitle>
            <CardDescription>
              Aylık aidat tutarı ve ödeme koşullarını belirleyin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="duesAmount">Aylık Aidat Tutarı (₺)</Label>
              <Input id="duesAmount" type="number" defaultValue={850} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDay">Son Ödeme Günü</Label>
              <Input id="dueDay" type="number" defaultValue={20} min={1} max={28} />
              <p className="text-xs text-muted-foreground">
                Her ayın bu gününe kadar ödeme yapılması gerekir.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Manager Settings */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Yönetici Bilgileri
            </CardTitle>
            <CardDescription>
              Site yöneticisinin iletişim bilgilerini güncelleyin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="managerName">Ad Soyad</Label>
              <Input id="managerName" defaultValue="Ahmet Yılmaz" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerPhone">Telefon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="managerPhone" className="pl-10" defaultValue="0532 123 4567" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerEmail">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="managerEmail" className="pl-10" defaultValue="yonetici@yesilvadisite.com" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="gradient-primary w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Değişiklikleri Kaydet
        </Button>
      </div>
    </MainLayout>
  );
}
