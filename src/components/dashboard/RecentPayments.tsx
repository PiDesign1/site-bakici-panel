import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";

interface Payment {
  id: string;
  apartment: string;
  resident: string;
  amount: number;
  date: string;
  status: "paid" | "pending";
}

const recentPayments: Payment[] = [
  { id: "1", apartment: "Daire 5", resident: "Mehmet Kaya", amount: 850, date: "14 Ocak 2025", status: "paid" },
  { id: "2", apartment: "Daire 12", resident: "Ayşe Demir", amount: 850, date: "13 Ocak 2025", status: "paid" },
  { id: "3", apartment: "Daire 3", resident: "Ali Yıldız", amount: 850, date: "12 Ocak 2025", status: "paid" },
  { id: "4", apartment: "Daire 8", resident: "Fatma Çelik", amount: 850, date: "11 Ocak 2025", status: "paid" },
  { id: "5", apartment: "Daire 15", resident: "Hasan Öz", amount: 850, date: "10 Ocak 2025", status: "paid" },
];

export function RecentPayments() {
  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Son Ödemeler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentPayments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-sm">{payment.apartment}</p>
                <p className="text-xs text-muted-foreground">{payment.resident}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">₺{payment.amount}</p>
              <p className="text-xs text-muted-foreground">{payment.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
