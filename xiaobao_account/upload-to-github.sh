#!/bin/bash

# 小宝记账 - GitHub 上传脚本 (Mac/Linux)

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         小宝记账 - GitHub 上传工具                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 检查 Git 是否已安装
if ! command -v git &> /dev/null; then
    echo "❌ Git 未安装！"
    echo ""
    echo "请先安装 Git："
    echo "Mac: brew install git"
    echo "Linux: sudo apt-get install git"
    echo ""
    exit 1
fi

echo "✅ Git 已安装"
echo ""

# 提示用户输入信息
echo "请输入您的 GitHub 信息："
echo ""

read -p "👤 GitHub 用户名: " username
read -p "📧 GitHub 邮箱: " email
read -p "🔑 Personal Access Token (可选): " token

if [ -z "$username" ]; then
    echo "❌ 用户名不能为空！"
    exit 1
fi

echo ""
echo "正在配置 Git..."
git config --global user.name "$username"
git config --global user.email "$email"

echo "✅ Git 配置完成"
echo ""

# 检查是否存在 .git 文件夹
if [ ! -d ".git" ]; then
    echo "正在初始化本地仓库..."
    git init
    git add .
    git commit -m "Initial commit: Add accounting app files"

    echo ""
    echo "现在需要关联到 GitHub 远程仓库"
    echo ""
    read -p "🔗 输入您的仓库 URL (格式: https://github.com/用户名/accounting-app.git): " repo_url

    if [ -z "$repo_url" ]; then
        echo "❌ 仓库 URL 不能为空！"
        exit 1
    fi

    git remote add origin "$repo_url"
else
    echo "✅ 本地仓库已存在"
    echo ""
    echo "正在检查远程仓库..."
    git remote -v
fi

echo ""
echo "正在添加所有文件..."
git add .
echo "✅ 文件已添加"

echo ""
echo "正在提交..."
git commit -m "Update accounting app files - $(date)"
echo "✅ 文件已提交"

echo ""
echo "正在推送到 GitHub..."
if git push -u origin main; then
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                    ✅ 上传成功！                             ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    echo "您的应用链接："
    echo "📱 Pro 版: https://github.com/$username/accounting-app/blob/main/pro.html"
    echo ""
    echo "⚠️  请按以下步骤启用 GitHub Pages："
    echo "1. 访问: https://github.com/$username/accounting-app"
    echo "2. 点击 'Settings'"
    echo "3. 左边选择 'Pages'"
    echo "4. 选择 Branch: main, Folder: / (root)"
    echo "5. 点击 Save"
    echo "6. 等待 1-5 分钟"
    echo "7. 您的应用将在: https://$username.github.io/accounting-app/pro.html"
    echo ""
else
    echo ""
    echo "❌ 推送失败！"
    echo ""
    echo "可能的原因："
    echo "1. GitHub 用户名或邮箱错误"
    echo "2. 网络连接问题"
    echo "3. Personal Access Token 无效"
    echo ""
    echo "解决方案："
    echo "1. 确保已在 GitHub 上创建仓库: https://github.com/new"
    echo "2. 使用正确的仓库 URL"
    echo ""
    exit 1
fi
