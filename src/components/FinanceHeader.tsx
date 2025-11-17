import { DollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrency } from "@/contexts/CurrencyContext";

const FinanceHeader = () => {
  const { currency, setCurrency } = useCurrency();
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <DollarSign className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">FinanceHub</h1>
          </div>
          <nav className="flex gap-6 items-center">
            <a href="#dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
              Dashboard
            </a>
            <a href="#expenses" className="text-muted-foreground hover:text-primary transition-colors">
              Expenses
            </a>
            <a href="#budget" className="text-muted-foreground hover:text-primary transition-colors">
              Budget
            </a>
            <a href="#planning" className="text-muted-foreground hover:text-primary transition-colors">
              Planning
            </a>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR (₹)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default FinanceHeader;
