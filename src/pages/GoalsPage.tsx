import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useFinance } from "@/contexts/FinanceContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Plus, Trash2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const GoalsPage = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useFinance();
  const { formatAmount } = useCurrency();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [addForm, setAddForm] = useState({
    name: '',
    target: '',
    current: '',
  });
  const [updateAmount, setUpdateAmount] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name || !addForm.target) {
      toast.error("Please fill all required fields");
      return;
    }
    addGoal({
      name: addForm.name,
      target: parseFloat(addForm.target),
      current: parseFloat(addForm.current) || 0,
    });
    toast.success("Goal added successfully");
    setIsAddOpen(false);
    setAddForm({ name: '', target: '', current: '' });
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoal || !updateAmount) {
      toast.error("Please enter an amount");
      return;
    }
    const goal = goals.find(g => g.id === selectedGoal);
    if (goal) {
      updateGoal(selectedGoal, goal.current + parseFloat(updateAmount));
      toast.success("Goal updated successfully");
    }
    setIsUpdateOpen(false);
    setSelectedGoal(null);
    setUpdateAmount('');
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Goals</h1>
          <p className="text-muted-foreground">Track your savings goals</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Goal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Goal Name</Label>
                <Input
                  placeholder="e.g., Emergency Fund"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Target Amount</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={addForm.target}
                  onChange={(e) => setAddForm({ ...addForm, target: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Current Amount (optional)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={addForm.current}
                  onChange={(e) => setAddForm({ ...addForm, current: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Add Goal</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Goal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Amount to Add</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={updateAmount}
                onChange={(e) => setUpdateAmount(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">Update Goal</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12">
              <p className="text-muted-foreground text-center">No goals set yet. Create your first savings goal!</p>
            </CardContent>
          </Card>
        ) : (
          goals.map((goal) => {
            const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
            const isCompleted = percentage >= 100;

            return (
              <Card key={goal.id} className={`hover:shadow-lg transition-shadow ${isCompleted ? 'border-accent' : ''}`}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <CardTitle className="text-lg">{goal.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      deleteGoal(goal.id);
                      toast.success("Goal deleted");
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isCompleted && (
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>Goal Achieved! 🎉</span>
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className={`font-semibold ${isCompleted ? 'text-accent' : 'text-foreground'}`}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="h-3" />
                  </div>
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
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setSelectedGoal(goal.id);
                      setIsUpdateOpen(true);
                    }}
                  >
                    Add Money
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GoalsPage;
