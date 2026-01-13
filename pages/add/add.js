// pages/add/add.js
Page({
  data: {
    transactionType: 'expense',
    amount: '',
    selectedCategory: null,
    accountIndex: 0,
    accountOptions: [],
    date: '',
    note: '',
    categories: [],
  },

  onLoad() {
    this.initializeForm();
  },

  initializeForm() {
    const app = getApp();
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const accountOptions = app.globalData.accounts.map(a => `${a.name} (¥${a.balance.toFixed(2)})`);

    this.setData({
      date: date,
      accountOptions: accountOptions,
      categories: app.globalData.categories['expense']
    });
  },

  setTransactionType(e) {
    const app = getApp();
    const type = e.currentTarget.dataset.type;
    this.setData({
      transactionType: type,
      selectedCategory: null,
      categories: app.globalData.categories[type]
    });
  },

  onAmountInput(e) {
    this.setData({
      amount: e.detail.value
    });
  },

  selectCategory(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      selectedCategory: id
    });
  },

  onAccountChange(e) {
    this.setData({
      accountIndex: e.detail.value
    });
  },

  onDateChange(e) {
    this.setData({
      date: e.detail.value
    });
  },

  onNoteInput(e) {
    this.setData({
      note: e.detail.value
    });
  },

  resetForm() {
    this.setData({
      amount: '',
      selectedCategory: null,
      note: ''
    });
  },

  saveTransaction() {
    const { transactionType, amount, selectedCategory, accountIndex, date, note } = this.data;

    if (!amount || !selectedCategory) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    const app = getApp();
    const numAmount = parseFloat(amount);

    // 创建交易记录
    const transaction = {
      id: Date.now().toString(),
      type: transactionType,
      amount: numAmount,
      categoryId: selectedCategory,
      accountId: app.globalData.accounts[accountIndex].id,
      date: date,
      note: note,
      createdAt: new Date().toISOString()
    };

    app.globalData.transactions.unshift(transaction);

    // 更新账户余额
    const account = app.globalData.accounts[accountIndex];
    if (transactionType === 'income') {
      account.balance += numAmount;
    } else {
      account.balance -= numAmount;
    }

    // 保存到本地存储
    wx.setStorageSync('appData', {
      transactions: app.globalData.transactions,
      accounts: app.globalData.accounts
    });

    wx.showToast({
      title: '记录已保存',
      icon: 'success'
    });

    // 返回首页
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      });
    }, 1000);
  }
});
