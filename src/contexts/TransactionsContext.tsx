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
  fetchTransactions: (query?: string) => Promise<void>;
}
export const TransactionsContext = createContext({} as TransactionContextType);

interface ProviderTransactionProps {
  children: React.ReactNode;
}
export function TransactionsProvider({ children }: ProviderTransactionProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  async function fetchTransactions(query?: string) {
    const url = new URL("http://localhost:3000/transactions");
    if (query) {
      url.searchParams.set("q", query);
    }
    const response = await fetch(url);
    const data = await response.json();
    setTransactions(data);
  }
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
