import {  useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";
export interface Transaction {
  id: number;
  description: string;
  type?: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionProps {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}
interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionProps) => Promise<void>;
}
export const TransactionsContext = createContext({} as TransactionContextType);

interface ProviderTransactionProps {
  children: React.ReactNode;
}
export function TransactionsProvider({ children }: ProviderTransactionProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  async function fetchTransactions(query?: string) {
    const response =await  api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });
    setTransactions(response.data);
  }

  async function createTransaction(data: CreateTransactionProps) {
    const {description, price, category, type} = data
    const response = await api.post("/transactions", {
          description,
          price,
          category,
          type,
          createdAt: new Date().toISOString()
        });
        setTransactions((prev) => [response.data,...prev]);
  }
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions,createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
