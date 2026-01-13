import { Category } from '../types';

// 预设支出分类
export const expenseCategories: Category[] = [
  { id: 'food', name: '餐饮', type: 'expense', icon: '🍜', color: '#ef4444' },
  { id: 'shopping', name: '购物', type: 'expense', icon: '🛒', color: '#f59e0b' },
  { id: 'transport', name: '交通', type: 'expense', icon: '🚗', color: '#3b82f6' },
  { id: 'entertainment', name: '娱乐', type: 'expense', icon: '🎮', color: '#8b5cf6' },
  { id: 'housing', name: '住房', type: 'expense', icon: '🏠', color: '#06b6d4' },
  { id: 'health', name: '医疗', type: 'expense', icon: '💊', color: '#ec4899' },
  { id: 'education', name: '教育', type: 'expense', icon: '📚', color: '#6366f1' },
  { id: 'communication', name: '通讯', type: 'expense', icon: '📱', color: '#14b8a6' },
  { id: 'clothing', name: '服饰', type: 'expense', icon: '👔', color: '#a855f7' },
  { id: 'other-expense', name: '其他', type: 'expense', icon: '📦', color: '#64748b' },
];

// 预设收入分类
export const incomeCategories: Category[] = [
  { id: 'salary', name: '工资', type: 'income', icon: '💰', color: '#10b981' },
  { id: 'bonus', name: '奖金', type: 'income', icon: '🎁', color: '#059669' },
  { id: 'investment', name: '投资', type: 'income', icon: '📈', color: '#22c55e' },
  { id: 'parttime', name: '兼职', type: 'income', icon: '💼', color: '#34d399' },
  { id: 'gift', name: '礼金', type: 'income', icon: '🧧', color: '#4ade80' },
  { id: 'other-income', name: '其他', type: 'income', icon: '💵', color: '#6ee7b7' },
];

// 所有分类
export const allCategories: Category[] = [...expenseCategories, ...incomeCategories];

// 根据ID获取分类
export const getCategoryById = (id: string): Category | undefined => {
  return allCategories.find(cat => cat.id === id);
};
