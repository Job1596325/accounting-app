// app.js
App({
  onLaunch() {
    // 初始化云环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,
      });
    }

    // 登录
    this.login();
  },

  login() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 可以将 code 发送给后端换取 openId 等信息
          this.globalData.loginCode = res.code;
        }
      }
    });
  },

  globalData: {
    userInfo: null,
    loginCode: '',
    transactions: [],
    accounts: [
      { id: '1', name: '现金', balance: 0, type: 'cash' },
      { id: '2', name: '银行卡', balance: 0, type: 'card' },
      { id: '3', name: '支付宝', balance: 0, type: 'digital' }
    ],
    categories: {
      expense: [
        { id: 'food', name: '餐饮', icon: '🍜' },
        { id: 'transport', name: '交通', icon: '🚗' },
        { id: 'shopping', name: '购物', icon: '🛍️' },
        { id: 'entertainment', name: '娱乐', icon: '🎮' },
        { id: 'housing', name: '住房', icon: '🏠' },
        { id: 'health', name: '医疗', icon: '⚕️' },
        { id: 'education', name: '教育', icon: '📚' },
        { id: 'utility', name: '水电', icon: '💡' },
        { id: 'communication', name: '通讯', icon: '📱' },
        { id: 'clothing', name: '服饰', icon: '👕' },
        { id: 'fitness', name: '健身', icon: '🏋️' },
        { id: 'travel', name: '旅游', icon: '✈️' },
        { id: 'gifts', name: '礼物', icon: '🎁' },
        { id: 'other', name: '其他', icon: '📦' }
      ],
      income: [
        { id: 'salary', name: '工资', icon: '💼' },
        { id: 'bonus', name: '奖金', icon: '🎉' },
        { id: 'investment', name: '投资', icon: '📈' },
        { id: 'parttime', name: '兼职', icon: '💻' },
        { id: 'gift', name: '礼金', icon: '🎈' },
        { id: 'return', name: '退款', icon: '↩️' },
        { id: 'other', name: '其他', icon: '💵' }
      ]
    }
  }
});
