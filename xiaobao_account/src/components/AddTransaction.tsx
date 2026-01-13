import React, { useState } from 'react';
import { TransactionType } from '../types';
import { expenseCategories, incomeCategories } from '../data/categories';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

export const AddTransaction: React.FC = () => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [note, setNote] = useState('');
  const [showForm, setShowForm] = useState(false);

  const addTransaction = useStore((state) => state.addTransaction);

  const categories = type === 'expense' ? expenseCategories : incomeCategories;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !categoryId) {
      alert('请填写金额和分类');
      return;
    }

    await addTransaction({
      type,
      amount: parseFloat(amount),
      categoryId,
      date,
      note,
    });

    // 重置表单
    setAmount('');
    setCategoryId('');
    setNote('');
    setShowForm(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-4 text-white bg-primary font-semibold text-lg active:bg-blue-600"
        >
          + 记一笔
        </button>
      ) : (
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 类型切换 */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setType('expense');
                  setCategoryId('');
                }}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  type === 'expense'
                    ? 'bg-expense text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                支出
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('income');
                  setCategoryId('');
                }}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  type === 'income'
                    ? 'bg-income text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                收入
              </button>
            </div>

            {/* 金额输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                金额
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                <span className="text-xl font-semibold text-gray-700 mr-2">¥</span>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 text-2xl font-semibold outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* 分类选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类
              </label>
              <div className="grid grid-cols-5 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryId(cat.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                      categoryId === cat.id
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <span className="text-2xl mb-1">{cat.icon}</span>
                    <span className="text-xs text-gray-700">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 日期选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                日期
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-primary outline-none"
              />
            </div>

            {/* 备注 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                备注（选填）
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="添加备注..."
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-primary outline-none"
              />
            </div>

            {/* 提交按钮 */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold active:bg-gray-300"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold active:bg-blue-600"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
