import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, CreditCard, Target } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const Dashboard = () => {
  const { formatAmount } = useCurrency();
  
  const stats = [
    { title: "Total Balance", value: formatAmount(24580), change: "+12.5%", icon: Wallet, trend: "up" },
    { title: "Monthly Income", value: formatAmount(8450), change: "+8.2%", icon: TrendingUp, trend: "up" },
    { title: "Monthly Expenses", value: formatAmount(3280), change: "-5.1%", icon: CreditCard, trend: "down" },
    { title: "Savings Goal", value: "68%", change: "+15%", icon: Target, trend: "up" },
  ];

  return (
    <section id="dashboard" className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-xs flex items-center gap-1 mt-1 ${
                  stat.trend === "up" ? "text-accent" : "text-destructive"
                }`}>
                  {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
