import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getCategoryById } from '../data/categories';

type Period = 'month' | 'year' | 'all';

export const Statistics: React.FC = () => {
  const [period, setPeriod] = useState<Period>('month');
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));

  const getStatistics = useStore((state) => state.getStatistics);
  const transactions = useStore((state) => state.transactions);

  // 计算日期范围
  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    if (period === 'month') {
      const monthDate = new Date(selectedMonth);
      return {
        startDate: format(startOfMonth(monthDate), 'yyyy-MM-dd'),
        endDate: format(endOfMonth(monthDate), 'yyyy-MM-dd'),
      };
    } else if (period === 'year') {
      return {
        startDate: format(new Date(now.getFullYear(), 0, 1), 'yyyy-MM-dd'),
        endDate: format(new Date(now.getFullYear(), 11, 31), 'yyyy-MM-dd'),
      };
    }
    return { startDate: undefined, endDate: undefined };
  }, [period, selectedMonth]);

  const stats = getStatistics(startDate, endDate);

  // 准备饼图数据 - 支出
  const expenseData = useMemo(() => {
    return stats.categoryStats
      .filter((stat) => {
        const category = getCategoryById(stat.categoryId);
        return category?.type === 'expense';
      })
      .map((stat) => {
        const category = getCategoryById(stat.categoryId);
        return {
          name: category?.name || '未知',
          value: stat.amount,
          color: category?.color || '#64748b',
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [stats]);

  // 准备饼图数据 - 收入
  const incomeData = useMemo(() => {
    return stats.categoryStats
      .filter((stat) => {
        const category = getCategoryById(stat.categoryId);
        return category?.type === 'income';
      })
      .map((stat) => {
        const category = getCategoryById(stat.categoryId);
        return {
          name: category?.name || '未知',
          value: stat.amount,
          color: category?.color || '#10b981',
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [stats]);

  // 月份选择器
  const monthOptions = useMemo(() => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const date = subMonths(new Date(), i);
      months.push(format(date, 'yyyy-MM'));
    }
    return months;
  }, []);

  return (
    <div className="pb-20">
      {/* 周期选择 */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setPeriod('month')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              period === 'month'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            按月
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              period === 'year'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            按年
          </button>
          <button
            onClick={() => setPeriod('all')}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              period === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            全部
          </button>
        </div>

        {period === 'month' && (
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary outline-none"
          >
            {monthOptions.map((month) => (
              <option key={month} value={month}>
                {format(new Date(month), 'yyyy年M月')}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* 总览卡片 */}
      <div className="p-4 space-y-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-sm opacity-90 mb-2">净收支</div>
          <div className="text-3xl font-bold">¥{stats.balance.toFixed(2)}</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-600 mb-2">总收入</div>
            <div className="text-2xl font-bold text-income">
              ¥{stats.totalIncome.toFixed(2)}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="text-sm text-gray-600 mb-2">总支出</div>
            <div className="text-2xl font-bold text-expense">
              ¥{stats.totalExpense.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* 支出分类图表 */}
      {expenseData.length > 0 && (
        <div className="bg-white p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">支出分类</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `¥${value.toFixed(2)}`}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* 分类列表 */}
          <div className="mt-4 space-y-2">
            {expenseData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ¥{item.value.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {((item.value / stats.totalExpense) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 收入分类图表 */}
      {incomeData.length > 0 && (
        <div className="bg-white p-4 mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4">收入分类</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={incomeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {incomeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `¥${value.toFixed(2)}`}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* 分类列表 */}
          <div className="mt-4 space-y-2">
            {incomeData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    ¥{item.value.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {((item.value / stats.totalIncome) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {transactions.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg">暂无统计数据</p>
          <p className="text-sm mt-2">开始记账后可查看统计分析</p>
        </div>
      )}
    </div>
  );
};
