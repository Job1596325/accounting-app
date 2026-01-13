import React, { useState } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useStore } from '../store/useStore';
import { getCategoryById } from '../data/categories';
import { Transaction } from '../types';

export const TransactionList: React.FC = () => {
  const transactions = useStore((state) => state.transactions);
  const deleteTransaction = useStore((state) => state.deleteTransaction);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // 按日期分组
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => b.localeCompare(a));

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      await deleteTransaction(id);
      setSelectedTransaction(null);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-lg">暂无记账记录</p>
        <p className="text-sm mt-2">点击下方按钮开始记账</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {sortedDates.map((date) => {
        const dayTransactions = groupedTransactions[date];
        const dayIncome = dayTransactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
        const dayExpense = dayTransactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);

        return (
          <div key={date} className="mb-4">
            {/* 日期标题 */}
            <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  {format(new Date(date), 'M月d日 EEEE', { locale: zhCN })}
                </span>
                <div className="text-sm">
                  {dayIncome > 0 && (
                    <span className="text-income mr-3">收入 ¥{dayIncome.toFixed(2)}</span>
                  )}
                  {dayExpense > 0 && (
                    <span className="text-expense">支出 ¥{dayExpense.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>

            {/* 交易列表 */}
            <div className="bg-white">
              {dayTransactions.map((transaction) => {
                const category = getCategoryById(transaction.categoryId);
                return (
                  <div
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="flex items-center px-4 py-3 border-b border-gray-100 active:bg-gray-50 cursor-pointer"
                  >
                    {/* 分类图标 */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-3"
                      style={{ backgroundColor: `${category?.color}20` }}
                    >
                      {category?.icon}
                    </div>

                    {/* 信息 */}
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {category?.name || '未知分类'}
                      </div>
                      {transaction.note && (
                        <div className="text-sm text-gray-500 mt-1">
                          {transaction.note}
                        </div>
                      )}
                    </div>

                    {/* 金额 */}
                    <div
                      className={`text-lg font-semibold ${
                        transaction.type === 'income' ? 'text-income' : 'text-expense'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}¥
                      {transaction.amount.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* 详情弹窗 */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="bg-white rounded-t-2xl w-full max-w-lg p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900">交易详情</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">类型</span>
                <span className="font-medium">
                  {selectedTransaction.type === 'income' ? '收入' : '支出'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">分类</span>
                <span className="font-medium">
                  {getCategoryById(selectedTransaction.categoryId)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">金额</span>
                <span
                  className={`font-bold text-lg ${
                    selectedTransaction.type === 'income' ? 'text-income' : 'text-expense'
                  }`}
                >
                  ¥{selectedTransaction.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">日期</span>
                <span className="font-medium">
                  {format(new Date(selectedTransaction.date), 'yyyy年M月d日')}
                </span>
              </div>
              {selectedTransaction.note && (
                <div className="flex justify-between">
                  <span className="text-gray-600">备注</span>
                  <span className="font-medium">{selectedTransaction.note}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold active:bg-gray-300"
              >
                关闭
              </button>
              <button
                onClick={() => handleDelete(selectedTransaction.id)}
                className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold active:bg-red-600"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
