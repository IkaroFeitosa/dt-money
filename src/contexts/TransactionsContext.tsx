import { createContext, useEffect, useState } from "react";
export interface Transaction {
  id: number;
  description: string;
  type?: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}
interface TransactionContextType {
  transactions: Transaction[];
}
export const TransactionsContext = createContext({} as TransactionContextType);

interface ProviderTransactionProps {
  children: React.ReactNode;
}
export function TransactionsProvider({ children }: ProviderTransactionProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  async function loadTransactions() {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();
    setTransactions(data);
  }
  useEffect(() => {
    loadTransactions();
  }, []);
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
