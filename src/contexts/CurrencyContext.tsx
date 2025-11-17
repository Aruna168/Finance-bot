import { createContext, useContext, useState, ReactNode } from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatAmount: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencySymbols: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'INR';
  });

  const handleSetCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  const formatAmount = (amount: number) => {
    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${amount.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
