import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface Budget {
  category: string;
  allocated: number;
  spent: number;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon?: string;
}

interface FinanceData {
  monthlyIncome: number;
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  categories: Category[];
}

interface FinanceContextType extends FinanceData {
  setMonthlyIncome: (income: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateBudget: (category: string, allocated: number) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, current: number) => void;
  deleteGoal: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: '1', name: 'Salary', type: 'income' },
  { id: '2', name: 'Freelance', type: 'income' },
  { id: '3', name: 'Housing', type: 'expense' },
  { id: '4', name: 'Food & Dining', type: 'expense' },
  { id: '5', name: 'Transportation', type: 'expense' },
  { id: '6', name: 'Entertainment', type: 'expense' },
  { id: '7', name: 'Utilities', type: 'expense' },
  { id: '8', name: 'Shopping', type: 'expense' },
];

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FinanceData>(() => {
    const saved = localStorage.getItem('financeData');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      monthlyIncome: 50000,
      transactions: [],
      budgets: [],
      goals: [],
      categories: defaultCategories,
    };
  });

  useEffect(() => {
    localStorage.setItem('financeData', JSON.stringify(data));
  }, [data]);

  const setMonthlyIncome = (income: number) => {
    setData(prev => ({ ...prev, monthlyIncome: income }));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setData(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
      budgets: prev.budgets.map(b =>
        b.category === transaction.category && transaction.type === 'expense'
          ? { ...b, spent: b.spent + transaction.amount }
          : b
      ),
    }));
  };

  const deleteTransaction = (id: string) => {
    setData(prev => {
      const transaction = prev.transactions.find(t => t.id === id);
      return {
        ...prev,
        transactions: prev.transactions.filter(t => t.id !== id),
        budgets: prev.budgets.map(b =>
          transaction && b.category === transaction.category && transaction.type === 'expense'
            ? { ...b, spent: Math.max(0, b.spent - transaction.amount) }
            : b
        ),
      };
    });
  };

  const updateBudget = (category: string, allocated: number) => {
    setData(prev => {
      const existingBudget = prev.budgets.find(b => b.category === category);
      if (existingBudget) {
        return {
          ...prev,
          budgets: prev.budgets.map(b =>
            b.category === category ? { ...b, allocated } : b
          ),
        };
      }
      return {
        ...prev,
        budgets: [...prev.budgets, { category, allocated, spent: 0 }],
      };
    });
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = { ...goal, id: Date.now().toString() };
    setData(prev => ({ ...prev, goals: [...prev.goals, newGoal] }));
  };

  const updateGoal = (id: string, current: number) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(g => (g.id === id ? { ...g, current } : g)),
    }));
  };

  const deleteGoal = (id: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== id),
    }));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: Date.now().toString() };
    setData(prev => ({ ...prev, categories: [...prev.categories, newCategory] }));
  };

  const deleteCategory = (id: string) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id),
    }));
  };

  return (
    <FinanceContext.Provider
      value={{
        ...data,
        setMonthlyIncome,
        addTransaction,
        deleteTransaction,
        updateBudget,
        addGoal,
        updateGoal,
        deleteGoal,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within FinanceProvider');
  return context;
};
