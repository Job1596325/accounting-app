import { create } from 'zustand';
import { Transaction, TransactionType, Statistics } from '../types';
import {
  initDB,
  addTransaction as dbAddTransaction,
  updateTransaction as dbUpdateTransaction,
  deleteTransaction as dbDeleteTransaction,
  getAllTransactions,
} from '../utils/db';
import { allCategories } from '../data/categories';

interface Store {
  transactions: Transaction[];
  isLoading: boolean;

  // 初始化
  init: () => Promise<void>;

  // 交易操作
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;

  // 统计数据
  getStatistics: (startDate?: string, endDate?: string) => Statistics;
}

export const useStore = create<Store>((set, get) => ({
  transactions: [],
  isLoading: true,

  // 初始化数据库并加载数据
  init: async () => {
    try {
      await initDB();
      const transactions = await getAllTransactions();
      set({ transactions, isLoading: false });
    } catch (error) {
      console.error('Failed to initialize:', error);
      set({ isLoading: false });
    }
  },

  // 添加交易
  addTransaction: async (transactionData) => {
    const transaction: Transaction = {
      ...transactionData,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    await dbAddTransaction(transaction);
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    }));
  },

  // 更新交易
  updateTransaction: async (transaction) => {
    await dbUpdateTransaction(transaction);
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === transaction.id ? transaction : t
      ),
    }));
  },

  // 删除交易
  deleteTransaction: async (id) => {
    await dbDeleteTransaction(id);
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },

  // 获取统计数据
  getStatistics: (startDate, endDate) => {
    const { transactions } = get();

    let filteredTransactions = transactions;
    if (startDate && endDate) {
      filteredTransactions = transactions.filter(
        (t) => t.date >= startDate && t.date <= endDate
      );
    }

    const totalIncome = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const categoryStatsMap = new Map<string, { amount: number; count: number }>();

    filteredTransactions.forEach((t) => {
      const existing = categoryStatsMap.get(t.categoryId) || { amount: 0, count: 0 };
      categoryStatsMap.set(t.categoryId, {
        amount: existing.amount + t.amount,
        count: existing.count + 1,
      });
    });

    const categoryStats = Array.from(categoryStatsMap.entries()).map(
      ([categoryId, stats]) => ({
        categoryId,
        ...stats,
      })
    );

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      categoryStats,
    };
  },
}));
