import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CompatibilityTestApp from "@/components/CompatibilityTestApp";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CompatibilityTestApp />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
