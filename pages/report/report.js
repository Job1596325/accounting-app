// pages/report/report.js
Page({
  data: {
    periods: ['本月', '本季度', '本年', '全部'],
    periodIndex: 0,
    totalIncome: '0.00',
    totalExpense: '0.00',
    balance: '0.00',
    categoryStats: []
  },

  onLoad() {
    this.updateReport();
  },

  onShow() {
    this.updateReport();
  },

  onPeriodChange(e) {
    this.setData({
      periodIndex: e.detail.value
    });
    this.updateReport();
  },

  updateReport() {
    const app = getApp();
    const stored = wx.getStorageSync('appData');
    if (stored) {
      app.globalData.transactions = stored.transactions || [];
    }

    const period = this.data.periods[this.data.periodIndex];
    let reportTransactions = app.globalData.transactions;

    // 筛选指定周期的交易
    if (period === '本月') {
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      reportTransactions = reportTransactions.filter(t => t.date.startsWith(currentMonth));
    } else if (period === '本季度') {
      const now = new Date();
      const quarter = Math.floor((now.getMonth() + 1) / 3);
      const startMonth = (quarter - 1) * 3 + 1;
      const endMonth = quarter * 3;
      reportTransactions = reportTransactions.filter(t => {
        const m = parseInt(t.date.split('-')[1]);
        return m >= startMonth && m <= endMonth && t.date.startsWith(now.getFullYear().toString());
      });
    } else if (period === '本年') {
      const now = new Date();
      reportTransactions = reportTransactions.filter(t => t.date.startsWith(now.getFullYear().toString()));
    }

    // 计算总收支
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryMap = {};

    reportTransactions.forEach(t => {
      if (t.type === 'income') {
        totalIncome += t.amount;
      } else {
        totalExpense += t.amount;
        const cat = this.getCategoryById(t.categoryId);
        const catName = cat?.name || '未知';
        if (!categoryMap[catName]) {
          categoryMap[catName] = {
            categoryId: t.categoryId,
            categoryName: catName,
            amount: 0
          };
        }
        categoryMap[catName].amount += t.amount;
      }
    });

    // 计算百分比
    const categoryStats = Object.values(categoryMap).map(item => ({
      ...item,
      percentage: totalExpense > 0 ? Math.round((item.amount / totalExpense) * 100) : 0,
      amount: item.amount.toFixed(2)
    }));

    this.setData({
      totalIncome: totalIncome.toFixed(2),
      totalExpense: totalExpense.toFixed(2),
      balance: (totalIncome - totalExpense).toFixed(2),
      categoryStats: categoryStats.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
    });
  },

  getCategoryById(id) {
    const app = getApp();
    for (let type in app.globalData.categories) {
      const cat = app.globalData.categories[type].find(c => c.id === id);
      if (cat) return cat;
    }
    return null;
  }
});
