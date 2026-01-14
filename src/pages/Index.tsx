import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActionButton } from "@/components/dashboard/QuickActionButton";
import { RecentPayments } from "@/components/dashboard/RecentPayments";
import { RecentAnnouncements } from "@/components/dashboard/RecentAnnouncements";
import {
  Building2,
  Users,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Plus,
  Megaphone,
  Receipt,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Index() {
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Ana Sayfa</h1>
          <p className="text-muted-foreground mt-1">
            Hoş geldiniz! Site durumunuzu buradan takip edebilirsiniz.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            title="Toplam Daire"
            value="24"
            subtitle="4 boş, 20 dolu"
            icon={Building2}
            variant="primary"
          />
          <StatCard
            title="Bu Ay Aidat"
            value="₺20.400"
            subtitle="Toplam tahakkuk"
            icon={Wallet}
          />
          <StatCard
            title="Tahsil Edilen"
            value="₺15.300"
            subtitle="18 daire ödedi"
            icon={CheckCircle2}
            variant="success"
          />
          <StatCard
            title="Ödenmeyen"
            value="₺5.100"
            subtitle="6 daire bekliyor"
            icon={AlertCircle}
            variant="warning"
          />
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <QuickActionButton
                icon={Plus}
                label="Aidat Ekle"
                variant="primary"
              />
              <QuickActionButton
                icon={Megaphone}
                label="Duyuru Yayınla"
              />
              <QuickActionButton
                icon={Receipt}
                label="Gider Ekle"
              />
            </div>
          </CardContent>
        </Card>

        {/* Open Requests Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Wrench className="w-7 h-7 text-warning" />
                </div>
                <div>
                  <p className="text-stat">5</p>
                  <p className="text-sm text-muted-foreground">Açık Arıza/Talep</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-info/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-info" />
                </div>
                <div>
                  <p className="text-stat">20</p>
                  <p className="text-sm text-muted-foreground">Aktif Sakin</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentPayments />
          <RecentAnnouncements />
        </div>
      </div>
    </MainLayout>
  );
}
