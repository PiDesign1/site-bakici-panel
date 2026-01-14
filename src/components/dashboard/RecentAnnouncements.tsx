import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  date: string;
  isActive: boolean;
}

const announcements: Announcement[] = [
  { id: "1", title: "Asansör bakımı yapılacaktır", date: "14 Ocak 2025", isActive: true },
  { id: "2", title: "Su kesintisi hakkında", date: "12 Ocak 2025", isActive: true },
  { id: "3", title: "Aidat son ödeme tarihi", date: "10 Ocak 2025", isActive: true },
  { id: "4", title: "Otopark düzenlemesi", date: "8 Ocak 2025", isActive: false },
  { id: "5", title: "Yeni güvenlik sistemi", date: "5 Ocak 2025", isActive: true },
];

export function RecentAnnouncements() {
  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Son Duyurular</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{announcement.title}</p>
                <p className="text-xs text-muted-foreground">{announcement.date}</p>
              </div>
            </div>
            <Badge variant={announcement.isActive ? "default" : "secondary"}>
              {announcement.isActive ? "Aktif" : "Pasif"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
