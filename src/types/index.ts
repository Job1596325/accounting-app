// 交易类型
export type TransactionType = 'income' | 'expense';

// 分类数据结构
export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
}

// 交易记录数据结构
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  date: string;
  note: string;
  createdAt: string;
}

// 统计数据结构
export interface Statistics {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categoryStats: {
    categoryId: string;
    amount: number;
    count: number;
  }[];
}
