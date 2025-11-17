import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useFinance } from "@/contexts/FinanceContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Plus, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { toast } from "sonner";

const TransactionsPage = () => {
  const { transactions, categories, addTransaction, deleteTransaction } = useFinance();
  const { formatAmount } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const filteredCategories = categories.filter(c => c.type === formData.type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.amount || !formData.description) {
      toast.error("Please fill all fields");
      return;
    }
    addTransaction({
      type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
    });
    toast.success("Transaction added successfully");
    setIsOpen(false);
    setFormData({
      type: 'expense',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Track your income and expenses</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Transaction</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'income' | 'expense') =>
                    setFormData({ ...formData, type: value, category: '' })
                  }
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
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  placeholder="e.g., Grocery shopping"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Add Transaction</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No transactions yet. Add your first transaction!</p>
          ) : (
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' ? 'bg-accent/10' : 'bg-destructive/10'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className={`w-5 h-5 text-accent`} />
                      ) : (
                        <ArrowDownRight className={`w-5 h-5 text-destructive`} />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{transaction.category}</p>
                      <p className="text-sm text-muted-foreground">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`font-bold text-lg ${
                      transaction.type === 'income' ? 'text-accent' : 'text-destructive'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        deleteTransaction(transaction.id);
                        toast.success("Transaction deleted");
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
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

export default TransactionsPage;
