# 📚 完整的 GitHub 上传指南

## 🎯 三种上传方法（按难度排序）

---

## 方法一：网页上传（最简单，推荐！⭐⭐⭐⭐⭐）

### 第一步：注册 GitHub 账号

1. 打开浏览器，访问：https://github.com
2. 点击右上角 "Sign up"（注册）
3. 填写信息：
   - Email（邮箱）：输入您的邮箱
   - Password（密码）：设置密码
   - Username（用户名）：设置用户名（后面会用到）
4. 点击 "Create account"
5. 验证邮箱（查看邮箱收到的验证信息）
6. 完成注册！

### 第二步：创建仓库

1. 登录后，点击右上角头像 → "Your repositories"
2. 点击绿色的 "New" 按钮
3. 填写信息：
   - **Repository name**（仓库名）：`accounting-app`
   - **Description**（描述）：`小宝记账 - 专业级记账理财应用`
   - 选择 **Public**（公开）- 这样才能生成网页
   - ✅ 勾选 "Add a README file"
4. 点击 "Create repository"
5. 完成！仓库已创建

### 第三步：上传文件

1. 进入仓库后，点击 "Add file" → "Upload files"
2. 将以下文件拖拽到上传区域：
   - `pro.html`（专业版）
   - `index-standalone.html`（简化版）
   - `qrcode-generator.html`（二维码生成器）
3. 点击 "Commit changes"
4. 等待上传完成
5. ✅ 文件已上传！

### 第四步：启用 GitHub Pages（生成网址）

1. 进入仓库页面
2. 点击上方 "Settings"（设置）
3. 左边选择 "Pages"
4. 在 "Source" 下面，选择：
   - Branch: `main`
   - Folder: `/ (root)`
5. 点击 "Save"
6. 等待几秒钟...
7. 会看到绿色提示：`Your site is published at: https://用户名.github.io/accounting-app`

### 第五步：获得您的应用链接

您的应用链接为：
```
https://用户名.github.io/accounting-app/pro.html
```

例如：
- Pro版：`https://zhangsan.github.io/accounting-app/pro.html`
- 简化版：`https://zhangsan.github.io/accounting-app/index-standalone.html`
- 二维码生成器：`https://zhangsan.github.io/accounting-app/qrcode-generator.html`

---

## 方法二：使用 GitHub Desktop（图形化工具）

### 第一步：下载安装

1. 访问：https://desktop.github.com
2. 下载 GitHub Desktop
3. 安装（一直点"下一步"）
4. 打开应用，用您的 GitHub 账号登录

### 第二步：Clone 仓库

1. 打开 GitHub Desktop
2. 点击 "File" → "Clone repository"
3. 输入您的仓库名：`用户名/accounting-app`
4. 选择本地保存位置
5. 点击 "Clone"

### 第三步：添加文件

1. 打开文件管理器
2. 找到 Clone 的文件夹
3. 把 `pro.html` 等文件复制进去

### 第四步：上传（Commit & Push）

1. 回到 GitHub Desktop
2. 左边会显示 "Changes"（有3个新文件）
3. 在底部填写提交信息：
   ```
   Add accounting app files
   ```
4. 点击 "Commit to main"
5. 点击 "Push origin"
6. ✅ 文件已上传！

---

## 方法三：使用 Git 命令（高级开发者）

### 第一步：安装 Git

1. 访问：https://git-scm.com
2. 下载并安装 Git
3. 打开命令提示符（cmd）

### 第二步：配置 Git

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

### 第三步：Clone 仓库

```bash
git clone https://github.com/你的用户名/accounting-app.git
cd accounting-app
```

### 第四步：添加文件并上传

```bash
# 将 pro.html 等文件复制到此文件夹

# 添加所有文件
git add .

# 提交
git commit -m "Add accounting app files"

# 上传
git push origin main
```

✅ 文件已上传！

---

## ✅ 完成后的验证

1. 访问您的仓库：`https://github.com/用户名/accounting-app`
2. 查看 Pages 设置是否已启用
3. 在浏览器打开您的应用链接
4. 测试应用是否正常运行

---

## 🎁 后续更新应用

如果您想更新应用代码：

**方法一（网页）：**
1. 进入仓库
2. 点击文件
3. 点击编辑图标（铅笔）
4. 修改内容
5. 点击 "Commit changes"

**方法二（GitHub Desktop）：**
1. 修改本地文件
2. 在 GitHub Desktop 中 Commit
3. 点击 "Push origin"

**方法三（Git 命令）：**
```bash
git add .
git commit -m "Update app"
git push origin main
```

---

## 🚀 在微信中使用

### 方式一：分享链接
- 复制您的应用链接
- 在微信粘贴
- 点击打开

### 方式二：生成二维码
- 打开 `qrcode-generator.html`
- 输入应用链接
- 生成二维码
- 在微信中扫码打开

### 方式三：添加到收藏
- 在微信中打开应用
- 点击右上角 ⋮
- 选择"收藏"
- 从"我的收藏"快速访问

---

## 🆘 常见问题

### Q: 上传后打开是空白页面？
A:
1. 检查 Pages 是否已启用
2. 检查链接是否正确
3. 等待 5-10 分钟让 GitHub 处理

### Q: 如何修改仓库名称？
A:
1. 进入仓库 Settings
2. 找到 "Repository name"
3. 修改后点击 "Rename"

### Q: 如何删除仓库？
A:
1. 进入仓库 Settings
2. 找到 "Danger Zone"
3. 点击 "Delete this repository"

### Q: GitHub Pages 需要多久才能生效？
A: 通常 1-5 分钟，最长 10 分钟

### Q: 可以添加自己的域名吗？
A: 可以，但需要付费域名（不推荐初期使用）

---

## 💡 小贴士

1. **仓库名称建议用英文**，这样链接更简洁
2. **选择 Public**，这样所有人都能访问
3. **不要上传敏感信息**（密钥、密码等）
4. **定期更新应用**，用户会自动获得最新版本
5. **可以在 README 中写使用说明**

---

## 📋 快速检查清单

- [ ] 注册了 GitHub 账号
- [ ] 创建了 `accounting-app` 仓库
- [ ] 上传了 `pro.html` 文件
- [ ] 启用了 GitHub Pages
- [ ] 获得了应用链接
- [ ] 在浏览器中测试链接
- [ ] 在微信中测试应用
- [ ] 生成了二维码

---

## 🎉 成功标志

当您能在微信中打开应用，并且能成功：
- 记账
- 查看统计
- 添加账户
- 导出数据

那么恭喜您！您的应用已经成功部署了！ 🎊
