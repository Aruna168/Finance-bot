import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useFinance } from "@/contexts/FinanceContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const { monthlyIncome, setMonthlyIncome, categories, addCategory, deleteCategory } = useFinance();
  const { currency, setCurrency, formatAmount } = useCurrency();
  const [income, setIncome] = useState(monthlyIncome.toString());
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);
  const [catForm, setCatForm] = useState({ name: '', type: 'expense' as 'income' | 'expense' });

  const handleIncomeUpdate = () => {
    const amount = parseFloat(income);
    if (isNaN(amount) || amount < 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setMonthlyIncome(amount);
    toast.success("Monthly income updated");
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.name) {
      toast.error("Please enter a category name");
      return;
    }
    addCategory({ name: catForm.name, type: catForm.type });
    toast.success("Category added");
    setIsAddCatOpen(false);
    setCatForm({ name: '', type: 'expense' });
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and data</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Income</CardTitle>
            <CardDescription>Set your expected monthly income</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleIncomeUpdate}>Update</Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Current: {formatAmount(monthlyIncome)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>Select your preferred currency</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-48">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage your income and expense categories</CardDescription>
            </div>
            <Dialog open={isAddCatOpen} onOpenChange={setIsAddCatOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Category Name</Label>
                    <Input
                      placeholder="e.g., Investments"
                      value={catForm.name}
                      onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={catForm.type}
                      onValueChange={(value: 'income' | 'expense') => setCatForm({ ...catForm, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full">Add Category</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-accent">Income Categories</h4>
                <div className="space-y-2">
                  {categories.filter(c => c.type === 'income').map(cat => (
                    <div key={cat.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span>{cat.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          deleteCategory(cat.id);
                          toast.success("Category deleted");
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-destructive">Expense Categories</h4>
                <div className="space-y-2">
                  {categories.filter(c => c.type === 'expense').map(cat => (
                    <div key={cat.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span>{cat.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          deleteCategory(cat.id);
                          toast.success("Category deleted");
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
