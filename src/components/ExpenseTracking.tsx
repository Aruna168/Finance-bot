import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurrency } from "@/contexts/CurrencyContext";

const ExpenseTracking = () => {
  const { formatAmount } = useCurrency();
  
  const expenses = [
    { category: "Housing", amount: formatAmount(1200), percent: 75, color: "bg-primary" },
    { category: "Food & Dining", amount: formatAmount(580), percent: 45, color: "bg-accent" },
    { category: "Transportation", amount: formatAmount(420), percent: 35, color: "bg-secondary" },
    { category: "Entertainment", amount: formatAmount(280), percent: 25, color: "bg-muted" },
    { category: "Utilities", amount: formatAmount(350), percent: 40, color: "bg-primary/70" },
    { category: "Shopping", amount: formatAmount(450), percent: 50, color: "bg-accent/70" },
  ];

  return (
    <section id="expenses" className="py-12 bg-muted/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Expense Tracking</h2>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {expenses.map((expense, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{expense.category}</span>
                  <span className="text-muted-foreground">{expense.amount}</span>
                </div>
                <Progress value={expense.percent} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ExpenseTracking;
