import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const Budgeting = () => {
  const { formatAmount } = useCurrency();
  
  const budgets = [
    { name: "Groceries", allocated: 600, spent: 480, remaining: 120 },
    { name: "Dining Out", allocated: 300, spent: 250, remaining: 50 },
    { name: "Gas", allocated: 200, spent: 180, remaining: 20 },
    { name: "Subscriptions", allocated: 150, spent: 150, remaining: 0 },
  ];

  return (
    <section id="budget" className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">Budget Management</h2>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Budget
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgets.map((budget, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{budget.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allocated:</span>
                  <span className="font-semibold text-foreground">{formatAmount(budget.allocated)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Spent:</span>
                  <span className="font-semibold text-foreground">{formatAmount(budget.spent)}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-muted-foreground">Remaining:</span>
                  <span className={`font-bold ${
                    budget.remaining === 0 ? "text-destructive" : "text-accent"
                  }`}>
                    {formatAmount(budget.remaining)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Budgeting;
