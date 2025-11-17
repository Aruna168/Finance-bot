import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, CreditCard, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useFinance } from "@/contexts/FinanceContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useMemo } from "react";

const DashboardPage = () => {
  const { transactions, monthlyIncome, budgets, goals } = useFinance();
  const { formatAmount } = useCurrency();

  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;
    
    const totalBudget = budgets.reduce((sum, b) => sum + b.allocated, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const budgetPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    const totalGoalTarget = goals.reduce((sum, g) => sum + g.target, 0);
    const totalGoalCurrent = goals.reduce((sum, g) => sum + g.current, 0);
    const goalsProgress = totalGoalTarget > 0 ? (totalGoalCurrent / totalGoalTarget) * 100 : 0;

    return {
      balance,
      income: totalIncome,
      expenses: totalExpenses,
      budgetUsed: budgetPercentage,
      goalsProgress,
    };
  }, [transactions, budgets, goals]);

  const recentTransactions = useMemo(() => 
    transactions.slice(0, 5),
    [transactions]
  );

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your finances</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatAmount(stats.balance)}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Income
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatAmount(stats.income)}</div>
            <p className="text-xs text-accent flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3" />
              Income this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Expenses
            </CardTitle>
            <CreditCard className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatAmount(stats.expenses)}</div>
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-3 w-3" />
              Spent this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Goals Progress
            </CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.goalsProgress.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall progress</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No transactions yet. Add your first transaction!</p>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' ? 'bg-accent/10' : 'bg-destructive/10'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className={`w-4 h-4 text-accent`} />
                      ) : (
                        <ArrowDownRight className={`w-4 h-4 text-destructive`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.category}</p>
                      <p className="text-sm text-muted-foreground">{transaction.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-accent' : 'text-destructive'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
