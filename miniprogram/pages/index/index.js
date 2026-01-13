// pages/index/index.js
Page({
  data: {
    monthIncome: '0.00',
    monthExpense: '0.00',
    monthBalance: '0.00',
    totalAssets: '0.00',
    recentTransactions: []
  },

  onLoad() {
    this.loadData();
    this.updateDashboard();
  },

  onShow() {
    this.updateDashboard();
  },

  loadData() {
    const app = getApp();
    // 从本地存储加载数据
    const stored = wx.getStorageSync('appData');
    if (stored) {
      app.globalData.transactions = stored.transactions || [];
      app.globalData.accounts = stored.accounts || app.globalData.accounts;
    }
  },

  saveData() {
    const app = getApp();
    wx.setStorageSync('appData', {
      transactions: app.globalData.transactions,
      accounts: app.globalData.accounts
    });
  },

  updateDashboard() {
    const app = getApp();
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    let monthIncome = 0;
    let monthExpense = 0;
    let totalAssets = 0;

    // 计算本月收支
    app.globalData.transactions.forEach(t => {
      if (t.date.startsWith(currentMonth)) {
        if (t.type === 'income') {
          monthIncome += t.amount;
        } else {
          monthExpense += t.amount;
        }
      }
    });

    // 计算总资产
    app.globalData.accounts.forEach(a => {
      totalAssets += a.balance;
    });

    // 格式化最近交易
    const recentTransactions = app.globalData.transactions.slice(0, 5).map(t => {
      const cat = this.getCategoryById(t.categoryId);
      return {
        ...t,
        categoryName: cat?.name || '未知',
        icon: cat?.icon || '❓',
        amount: t.amount.toFixed(2)
      };
    });

    this.setData({
      monthIncome: monthIncome.toFixed(2),
      monthExpense: monthExpense.toFixed(2),
      monthBalance: (monthIncome - monthExpense).toFixed(2),
      totalAssets: totalAssets.toFixed(2),
      recentTransactions: recentTransactions
    });
  },

  getCategoryById(id) {
    const app = getApp();
    for (let type in app.globalData.categories) {
      const cat = app.globalData.categories[type].find(c => c.id === id);
      if (cat) return cat;
    }
    return null;
  },

  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  }
});
