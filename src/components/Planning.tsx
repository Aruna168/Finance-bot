import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurrency } from "@/contexts/CurrencyContext";

const Planning = () => {
  const { formatAmount } = useCurrency();
  
  const goals = [
    { name: "Emergency Fund", target: 10000, current: 6800, percent: 68 },
    { name: "Vacation Savings", target: 5000, current: 3200, percent: 64 },
    { name: "New Car Down Payment", target: 8000, current: 2400, percent: 30 },
    { name: "Retirement Fund", target: 50000, current: 21500, percent: 43 },
  ];

  return (
    <section id="planning" className="py-12 bg-muted/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Financial Planning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{goal.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{goal.percent}%</span>
                </div>
                <Progress value={goal.percent} className="h-3" />
                <div className="flex justify-between pt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Current</p>
                    <p className="font-semibold text-foreground">{formatAmount(goal.current)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="font-semibold text-foreground">{formatAmount(goal.target)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Planning;
