// pages/index/index.js
Page({
  data: {
    currentMonth: '',
    currentDate: null,
    monthIncome: '0.00',
    monthExpense: '0.00',
    monthBalance: '0.00',
    totalAssets: '0.00',
    accounts: [],
    expenseCategories: [],
    recentTransactions: []
  },

  onLoad() {
    this.loadData();
    this.initCurrentMonth();
    this.updateDashboard();
  },

  onShow() {
    this.updateDashboard();
  },

  initCurrentMonth() {
    const now = new Date();
    this.setData({
      currentDate: now,
      currentMonth: `${now.getFullYear()}年${now.getMonth() + 1}月`
    });
  },

  prevMonth() {
    const date = new Date(this.data.currentDate);
    date.setMonth(date.getMonth() - 1);
    this.setData({
      currentDate: date,
      currentMonth: `${date.getFullYear()}年${date.getMonth() + 1}月`
    });
    this.updateDashboard();
  },

  nextMonth() {
    const date = new Date(this.data.currentDate);
    date.setMonth(date.getMonth() + 1);
    this.setData({
      currentDate: date,
      currentMonth: `${date.getFullYear()}年${date.getMonth() + 1}月`
    });
    this.updateDashboard();
  },

  todayMonth() {
    this.initCurrentMonth();
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
    const date = this.data.currentDate;
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    let monthIncome = 0;
    let monthExpense = 0;
    let totalAssets = 0;
    let expenseByCategory = {};

    // 计算本月收支和分类
    app.globalData.transactions.forEach(t => {
      if (t.date.startsWith(monthStr)) {
        if (t.type === 'income') {
          monthIncome += t.amount;
        } else {
          monthExpense += t.amount;
          const cat = this.getCategoryById(t.categoryId);
          const catName = cat?.name || '其他';
          expenseByCategory[catName] = (expenseByCategory[catName] || 0) + t.amount;
        }
      }
    });

    // 计算总资产
    app.globalData.accounts.forEach(a => {
      totalAssets += a.balance;
    });

    // 格式化账户
    const maxBalance = Math.max(...app.globalData.accounts.map(a => a.balance), 1);
    const accounts = app.globalData.accounts.map(a => ({
      ...a,
      icon: a.type === 'cash' ? '💵' : a.type === 'card' ? '💳' : '📱',
      balance: a.balance.toFixed(2),
      percentage: Math.round((a.balance / maxBalance) * 100)
    }));

    // 格式化支出分类
    const expenseCategories = Object.entries(expenseByCategory)
      .map(([name, amount]) => {
        const cat = app.globalData.categories.expense.find(c => c.name === name);
        return {
          id: cat?.id || name,
          name: name,
          icon: cat?.icon || '📦',
          amount: amount.toFixed(2),
          percentage: Math.round((amount / monthExpense) * 100 || 0)
        };
      })
      .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));

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
      accounts: accounts,
      expenseCategories: expenseCategories,
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
  },

  editTransaction(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/list/list?edit=${id}`
    });
  }
});
