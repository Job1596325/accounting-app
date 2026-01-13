# 🚀 微信小程序版本 - 快速启动指南

## 📋 项目结构

```
miniprogram/
├── app.json          # 全局配置
├── app.js           # 全局逻辑
├── app.wxss         # 全局样式
├── pages/
│   ├── index/       # 仪表板页面
│   ├── add/         # 记账页面
│   ├── list/        # 明细页面
│   ├── accounts/    # 账户管理
│   └── report/      # 财务报表
└── images/          # 图标资源
```

## ⚙️ 准备工作

### 1. 下载微信开发者工具
- 访问：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
- 选择适合你操作系统的版本
- 安装完成

### 2. 注册微信小程序账号
- 访问：https://mp.weixin.qq.com
- 点击 "立即注册"
- 选择 "小程序"
- 按照提示完成注册（需要企业或个人身份验证）
- 记下 **AppID**（后面需要用到）

### 3. 准备项目文件
- 将 `miniprogram` 文件夹复制到你的开发目录
- 确保文件结构完整

## 🔧 导入项目

### 在微信开发者工具中：

1. **打开开发者工具**
2. **扫码登录** 微信账号
3. **点击 "+"** 创建新项目
4. **填写项目信息**：
   - 项目名称：`xiaobao-accounting`（任意名称）
   - 项目目录：选择 `miniprogram` 文件夹所在目录
   - AppID：输入你的小程序 AppID
   - 勾选 "使用云开发"

5. **点击 "新建"**
6. 项目即可导入

## ☁️ 配置云开发环境

### 第一步：创建云环境
1. 在开发者工具顶部找到 **"云开发"** 标签
2. 点击 **"立即创建"** 或 **"使用已有环境"**
3. 创建新环境（首次）：
   - 环境名称：`xiaobao-prod`
   - 选择 "按量计费"（免费额度足够个人使用）

### 第二步：创建数据库集合
1. 在云开发控制台找到 **"数据库"**
2. 创建以下集合：
   - `transactions`（交易记录）
   - `accounts`（账户）
   - `categories`（分类）

### 第三步：更新环境 ID
在 `app.js` 中找到云初始化部分，更新你的环境 ID：
```javascript
wx.cloud.init({
  env: 'xiaobao-prod',  // 替换为你的环境名称
  traceUser: true,
});
```

## 📦 完成其他页面

项目目前包含以下页面骨架：
- ✅ `pages/index/index` - 仪表板（已完成）
- ✅ `pages/add/add` - 记账（已完成）
- 📝 `pages/list/list` - 明细（需要完成）
- 📝 `pages/accounts/accounts` - 账户（需要完成）
- 📝 `pages/report/report` - 报表（需要完成）
- 📝 `pages/settings/settings` - 设置（需要完成）

### 快速完成其他页面的步骤：

#### 1. 创建明细页面 (pages/list/list)
```
pages/list/list.wxml   # 页面结构
pages/list/list.js     # 页面逻辑
pages/list/list.wxss   # 页面样式
```

参考 `pages/add/add` 的结构创建类似文件。

#### 2. 创建账户页面 (pages/accounts/accounts)
显示所有账户、账户余额、添加/删除账户功能。

#### 3. 创建报表页面 (pages/report/report)
显示财务统计数据、各类型支出占比等。

## 🎨 添加图标资源

在 `miniprogram/images/` 文件夹中添加以下图标：
- `dashboard.png` - 仪表板图标
- `dashboard-active.png` - 仪表板活跃图标
- `add.png` - 记账图标
- `add-active.png`
- `list.png` - 明细图标
- `list-active.png`
- `accounts.png` - 账户图标
- `accounts-active.png`
- `report.png` - 报表图标
- `report-active.png`

**推荐：** 使用在线工具 (如 https://www.iconfont.cn) 下载 24px 的图标。

## 🧪 测试小程序

### 在开发者工具中测试：
1. 项目导入后，自动编译
2. **左侧预览手机界面**
3. **右上角 "预览"** 可用手机扫码体验

### 常见问题排查：

**Q: 报错 "Cannot find module cloud"**
- A: 确保在 app.json 中设置了 `"cloud": true`

**Q: 云函数404错误**
- A: 确保已在云开发控制台创建相应集合

**Q: 数据保存不成功**
- A: 检查云数据库权限设置（开发阶段可设为公开）

## 📱 发布小程序

### 准备工作：
1. 完成所有页面功能
2. 测试所有功能
3. 修复所有 bug
4. 优化性能

### 发布步骤：

1. **在开发者工具中**：
   - 点击右上角 **"上传"**
   - 填写版本号和备注
   - 点击 **"上传"**

2. **在小程序后台**（https://mp.weixin.qq.com）：
   - 进入 "管理" → "版本管理"
   - 找到刚上传的版本
   - 点击 "提交审核"
   - 填写审核信息

3. **等待审核**（通常 1-7 天）

4. **审核通过后**：
   - 点击 "发布"
   - 小程序上线！

## 🔐 安全建议

1. **不要将敏感信息放在前端代码中**
2. **使用云函数处理敏感操作**
3. **定期备份用户数据**
4. **设置数据库访问权限**

## 📚 学习资源

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/)
- [组件库参考](https://developers.weixin.qq.com/miniprogram/dev/component/)

## 💡 下一步计划

1. ✅ 完成所有页面
2. ✅ 迁移数据到云数据库
3. ✅ 添加分享功能
4. ✅ 实现数据导出
5. ✅ 添加预算功能
6. ✅ 实现数据同步

---

**有问题？** 检查开发者工具的 "Console" 标签查看错误信息。
