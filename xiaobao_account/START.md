# 🚀 快速启动指南

## 项目已创建完成！

您的"小宝记账"应用已经开发完成，下面是启动步骤。

## 📋 前置要求

确保您的电脑已安装：
- Node.js 16+ (推荐 18 或 20)
- npm 或 yarn

## 🎯 启动步骤

### 1. 安装依赖

在项目目录下打开终端，运行：

```bash
npm install
```

或使用 yarn：

```bash
yarn
```

### 2. 启动开发服务器

```bash
npm run dev
```

或：

```bash
yarn dev
```

### 3. 访问应用

浏览器会自动打开，或手动访问：

**电脑访问：** http://localhost:3000

**手机访问：**
1. 确保手机和电脑在同一WiFi网络
2. 访问 http://[你的电脑IP]:3000
   - 例如: http://192.168.1.100:3000
   - 终端会显示具体的访问地址

## 📱 手机端使用

### 方式一：直接访问
在手机浏览器访问开发服务器地址

### 方式二：添加到主屏幕（推荐）

**iOS (Safari):**
1. 打开网页
2. 点击底部分享图标
3. 选择"添加到主屏幕"
4. 命名为"小宝记账"

**Android (Chrome):**
1. 打开网页
2. 点击右上角菜单
3. 选择"添加到主屏幕"
4. 命名为"小宝记账"

## 🏗️ 构建生产版本

准备部署时，运行：

```bash
npm run build
```

构建产物在 `dist` 目录，可以部署到任何静态服务器。

## 📂 项目结构

```
小宝记账/
├── src/
│   ├── components/          # UI组件
│   │   ├── AddTransaction.tsx    # 添加交易
│   │   ├── TransactionList.tsx   # 交易列表
│   │   ├── Statistics.tsx        # 统计分析
│   │   └── Settings.tsx          # 设置页面
│   ├── data/
│   │   └── categories.ts         # 分类数据
│   ├── store/
│   │   └── useStore.ts           # 状态管理
│   ├── types/
│   │   └── index.ts              # TypeScript类型
│   ├── utils/
│   │   └── db.ts                 # IndexedDB操作
│   ├── App.tsx                   # 主应用
│   ├── main.tsx                  # 入口文件
│   └── index.css                 # 全局样式
├── public/
│   └── icon.svg                  # 应用图标
├── index.html                    # HTML模板
├── package.json                  # 依赖配置
├── vite.config.ts                # Vite配置
├── tailwind.config.js            # Tailwind配置
└── tsconfig.json                 # TypeScript配置
```

## ✨ 功能说明

### 核心功能
- ✅ 快速记账（支持收入/支出）
- ✅ 10种支出分类 + 6种收入分类
- ✅ 按日期分组的账单列表
- ✅ 统计分析（按月/年/全部）
- ✅ 饼图可视化展示
- ✅ 数据导入导出

### 技术特性
- ✅ TypeScript 类型安全
- ✅ IndexedDB 本地存储
- ✅ 响应式设计（完美支持移动端）
- ✅ PWA支持
- ✅ 零后端依赖

## 🔧 常见问题

### Q: 安装依赖失败？
A: 尝试清除缓存后重新安装：
```bash
npm cache clean --force
npm install
```

### Q: 端口被占用？
A: 修改 vite.config.ts 中的端口号，或终止占用3000端口的进程

### Q: 手机无法访问？
A:
1. 确保手机和电脑在同一WiFi
2. 检查电脑防火墙设置
3. 使用终端显示的局域网地址

### Q: 数据会丢失吗？
A: 数据保存在浏览器本地，除非清除浏览器数据。建议定期导出备份。

## 📞 技术支持

如有问题，请检查：
1. Node.js 版本是否 >= 16
2. 依赖是否正确安装
3. 浏览器控制台是否有错误信息

## 🎉 开始使用

现在就可以开始记账了！祝您使用愉快！
