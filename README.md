# 活动帖文-一键拉群

这是一个基于 React + Vite + Tailwind CSS 构建的社区活动管理应用。

## 功能特点
- **活动详情展示**：查看活动时间、地点、组织者等信息。
- **参与者管理**：查看已报名参加活动的用户列表。
- **一键组群**：支持一键为参与者创建群聊。
- **智能提示**：当某些用户因权限或设置无法加入群聊时，会弹出友好提示并展示相关用户信息。

## 技术栈
- **前端框架**: React 19
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 4
- **动画**: Motion (Framer Motion)
- **图标**: Lucide React

## 如何运行
1. 克隆仓库：
   ```bash
   git clone <your-repo-url>
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动开发服务器：
   ```bash
   npm run dev
   ```

## 上传到 GitHub 指南
如果你在上传到 GitHub 时看不到文件，请确保执行了以下步骤：
1. 在项目根目录初始化 Git：
   ```bash
   git init
   ```
2. 添加所有文件（确保 `.gitignore` 已经配置好，本项目已配置）：
   ```bash
   git add .
   ```
3. 提交更改：
   ```bash
   git commit -m "Initial commit"
   ```
4. 添加远程仓库并推送：
   ```bash
   git remote add origin <你的仓库地址>
   git push -u origin main
   ```
