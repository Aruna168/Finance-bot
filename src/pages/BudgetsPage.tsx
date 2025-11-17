import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useFinance } from "@/contexts/FinanceContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const BudgetsPage = () => {
  const { budgets, categories, updateBudget } = useFinance();
  const { formatAmount } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    allocated: '',
  });

  const expenseCategories = categories.filter(c => c.type === 'expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.allocated) {
      toast.error("Please fill all fields");
      return;
    }
    updateBudget(formData.category, parseFloat(formData.allocated));
    toast.success("Budget updated successfully");
    setIsOpen(false);
    setFormData({ category: '', allocated: '' });
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Budgets</h1>
          <p className="text-muted-foreground">Set and track your spending limits</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Set Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Budget</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Monthly Budget</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.allocated}
                  onChange={(e) => setFormData({ ...formData, allocated: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Set Budget</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12">
              <p className="text-muted-foreground text-center">No budgets set yet. Create your first budget!</p>
            </CardContent>
          </Card>
        ) : (
          budgets.map((budget) => {
            const percentage = budget.allocated > 0 ? (budget.spent / budget.allocated) * 100 : 0;
            const isOverBudget = percentage > 100;
            const isNearLimit = percentage > 80 && percentage <= 100;

            return (
              <Card key={budget.category} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{budget.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className={`font-semibold ${
                        isOverBudget ? 'text-destructive' : isNearLimit ? 'text-yellow-600' : 'text-foreground'
                      }`}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={`h-2 ${isOverBudget ? '[&>div]:bg-destructive' : isNearLimit ? '[&>div]:bg-yellow-600' : ''}`}
                    />
                  </div>
                  <div className="flex justify-between pt-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Spent</p>
                      <p className="font-semibold text-foreground">{formatAmount(budget.spent)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="font-semibold text-foreground">{formatAmount(budget.allocated)}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className={`font-bold ${
                      isOverBudget ? 'text-destructive' : 'text-accent'
                    }`}>
                      {formatAmount(Math.max(0, budget.allocated - budget.spent))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BudgetsPage;
