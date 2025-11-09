import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Overview from "./pages/Overview";
import NetworkAnalysis from "./pages/NetworkAnalysis";
import CollaborationAnalysis from "./pages/CollaborationAnalysis";
import ROIAnalysis from "./pages/ROIAnalysis";
import WhatIfScenarios from "./pages/WhatIfScenarios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/network" element={<NetworkAnalysis />} />
            <Route path="/collaboration" element={<CollaborationAnalysis />} />
            <Route path="/roi" element={<ROIAnalysis />} />
            <Route path="/scenarios" element={<WhatIfScenarios />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
