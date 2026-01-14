import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Daireler from "./pages/Daireler";
import Aidat from "./pages/Aidat";
import Giderler from "./pages/Giderler";
import Duyurular from "./pages/Duyurular";
import Talepler from "./pages/Talepler";
import Raporlar from "./pages/Raporlar";
import Ayarlar from "./pages/Ayarlar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/daireler" element={<Daireler />} />
          <Route path="/aidat" element={<Aidat />} />
          <Route path="/giderler" element={<Giderler />} />
          <Route path="/duyurular" element={<Duyurular />} />
          <Route path="/talepler" element={<Talepler />} />
          <Route path="/raporlar" element={<Raporlar />} />
          <Route path="/ayarlar" element={<Ayarlar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
