// pages/list/list.js
Page({
  data: {
    transactions: [],
    currentFilter: 'all'
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

    this.setData({
      transactions: formattedTransactions
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
