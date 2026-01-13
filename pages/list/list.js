// pages/list/list.js
Page({
  data: {
    transactions: [],
    groupedTransactions: [],
    currentFilter: 'all',
    totalAmount: '0.00'
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const app = getApp();
    const stored = wx.getStorageSync('appData');
    if (stored) {
      app.globalData.transactions = stored.transactions || [];
    }

    this.renderTransactions();
  },

  saveData() {
    const app = getApp();
    wx.setStorageSync('appData', {
      transactions: app.globalData.transactions,
      accounts: app.globalData.accounts
    });
  },

  filterTransactions(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      currentFilter: filter
    });
    this.renderTransactions();
  },

  renderTransactions() {
    const app = getApp();
    let transactions = app.globalData.transactions;

    if (this.data.currentFilter === 'income') {
      transactions = transactions.filter(t => t.type === 'income');
    } else if (this.data.currentFilter === 'expense') {
      transactions = transactions.filter(t => t.type === 'expense');
    }

    const formattedTransactions = transactions.map(t => {
      const cat = this.getCategoryById(t.categoryId);
      return {
        ...t,
        categoryName: cat?.name || '未知',
        icon: cat?.icon || '❓',
        amount: t.amount.toFixed(2)
      };
    });

    // 计算总额
    let totalAmount = 0;
    formattedTransactions.forEach(t => {
      if (this.data.currentFilter === 'all' || this.data.currentFilter === t.type) {
        totalAmount += parseFloat(t.amount);
      }
    });

    // 按日期分组
    const grouped = {};
    formattedTransactions.forEach(t => {
      if (!grouped[t.date]) {
        grouped[t.date] = {
          date: t.date,
          income: 0,
          expense: 0,
          transactions: []
        };
      }
      grouped[t.date].transactions.push(t);
      if (t.type === 'income') {
        grouped[t.date].income += parseFloat(t.amount);
      } else {
        grouped[t.date].expense += parseFloat(t.amount);
      }
    });

    const groupedTransactions = Object.values(grouped)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(group => ({
        ...group,
        income: group.income.toFixed(2),
        expense: group.expense.toFixed(2)
      }));

    this.setData({
      transactions: formattedTransactions,
      groupedTransactions: groupedTransactions,
      totalAmount: totalAmount.toFixed(2)
    });
  },

  deleteTransaction(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除确认',
      content: '确定要删除这笔交易吗？',
      confirmText: '删除',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          const transaction = app.globalData.transactions.find(t => t.id === id);

          if (transaction) {
            // 恢复账户余额
            const account = app.globalData.accounts.find(a => a.id === transaction.accountId);
            if (account) {
              if (transaction.type === 'income') {
                account.balance -= transaction.amount;
              } else {
                account.balance += transaction.amount;
              }
            }

            // 删除交易
            app.globalData.transactions = app.globalData.transactions.filter(t => t.id !== id);
            this.saveData();
            this.renderTransactions();

            wx.showToast({
              title: '已删除',
              icon: 'success',
              duration: 1000
            });
          }
        }
      }
    });
  },

  editTransaction(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/add/add?editId=${id}`
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
