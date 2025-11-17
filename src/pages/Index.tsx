import FinanceHeader from "@/components/FinanceHeader";
import Dashboard from "@/components/Dashboard";
import ExpenseTracking from "@/components/ExpenseTracking";
import Budgeting from "@/components/Budgeting";
import Planning from "@/components/Planning";
import ChatBot from "@/components/ChatBot";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

const Index = () => {
  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-background">
        <FinanceHeader />
        <Dashboard />
        <ExpenseTracking />
        <Budgeting />
        <Planning />
        <ChatBot />
      </div>
    </CurrencyProvider>
  );
};

export default Index;
