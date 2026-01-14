import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Building2,
  Wallet,
  Receipt,
  Megaphone,
  Wrench,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Home, label: "Ana Sayfa", path: "/" },
  { icon: Building2, label: "Daireler", path: "/daireler" },
  { icon: Wallet, label: "Aidat Takibi", path: "/aidat" },
  { icon: Receipt, label: "Giderler", path: "/giderler" },
  { icon: Megaphone, label: "Duyurular", path: "/duyurular" },
  { icon: Wrench, label: "Arıza/Talepler", path: "/talepler" },
  { icon: BarChart3, label: "Raporlar", path: "/raporlar" },
  { icon: Settings, label: "Ayarlar", path: "/ayarlar" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-20 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">Site Yönetim</h1>
            <p className="text-xs text-muted-foreground">Yönetim Paneli</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-primary"
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-sidebar-primary" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">AY</span>
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Ahmet Yılmaz</p>
              <p className="text-xs text-muted-foreground">Site Yöneticisi</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
