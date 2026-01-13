// pages/accounts/accounts.js
Page({
  data: {
    accounts: []
  },

  onLoad() {
    this.loadAccounts();
  },

  onShow() {
    this.loadAccounts();
  },

  loadAccounts() {
    const app = getApp();
    const stored = wx.getStorageSync('appData');
    if (stored) {
      app.globalData.accounts = stored.accounts || app.globalData.accounts;
    }

    const accounts = app.globalData.accounts.map(a => ({
      ...a,
      balance: a.balance.toFixed(2)
    }));

    this.setData({
      accounts: accounts
    });
  },

  showAddAccountModal() {
    wx.showModal({
      title: '添加账户',
      editable: true,
      placeholderText: '输入账户名称',
      success: (res) => {
        if (res.confirm && res.content) {
          this.addAccount(res.content);
        }
      }
    });
  },

  addAccount(name) {
    const app = getApp();
    const newAccount = {
      id: Date.now().toString(),
      name: name,
      balance: 0,
      type: 'other'
    };

    app.globalData.accounts.push(newAccount);

    // 保存到本地存储
    wx.setStorageSync('appData', {
      transactions: app.globalData.transactions,
      accounts: app.globalData.accounts
    });

    wx.showToast({
      title: '账户已添加',
      icon: 'success'
    });

    this.loadAccounts();
  }
});
