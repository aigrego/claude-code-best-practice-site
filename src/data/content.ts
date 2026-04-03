import type { NavItem } from '../types';

export const navItems: NavItem[] = [
  {
    id: 'overview',
    title: '📖 概览',
    icon: 'BookOpen',
  },
  {
    id: 'concepts',
    title: '🧠 核心概念',
    icon: 'Brain',
    children: [
      { id: 'subagents', title: 'Subagents (子代理)' },
      { id: 'commands', title: 'Commands (命令)' },
      { id: 'skills', title: 'Skills (技能)' },
      { id: 'mcp', title: 'MCP 服务器' },
      { id: 'memory', title: 'Memory (记忆)' },
      { id: 'settings', title: 'Settings (设置)' },
    ],
  },
  {
    id: 'hot-features',
    title: '热门功能',
    icon: 'Flame',
  },
  {
    id: 'tips',
    title: '技巧与窍门',
    icon: 'Lightbulb',
    children: [
      { id: 'tips-prompting', title: 'Prompting 技巧' },
      { id: 'tips-planning', title: '规划与规格' },
      { id: 'tips-claudemd', title: 'CLAUDE.md 最佳实践' },
      { id: 'tips-agents', title: 'Agents 技巧' },
      { id: 'tips-commands', title: 'Commands 技巧' },
      { id: 'tips-skills', title: 'Skills 技巧' },
      { id: 'tips-hooks', title: 'Hooks 技巧' },
      { id: 'tips-workflows', title: '工作流技巧' },
    ],
  },
  {
    id: 'workflows',
    title: '开发工作流',
    icon: 'Workflow',
  },
  {
    id: 'cli-flags',
    title: 'CLI 启动参数',
    icon: 'Terminal',
  },
  {
    id: 'powerups',
    title: 'Power-ups',
    icon: 'Rocket',
  },
];

export const contentMap: Record<string, string> = {
  'overview': `# Claude Code 最佳实践

> Practice makes Claude perfect

## 关于本项目

这是一个 Claude Code 配置最佳实践的仓库，演示了 skills、subagents、hooks 和 commands 的模式。它作为参考实现而非应用程序代码库。

## 核心架构

Claude Code 的强大之处在于其模块化的扩展系统：

- **Subagents** - 具有自定义工具、权限、模型和持久身份的自主执行者
- **Commands** - 用户调用的提示模板，用于工作流编排
- **Skills** - 可配置、可预加载、可自动发现的知识模块
- **MCP Servers** - 连接到外部工具、数据库和 API
- **Hooks** - 在特定事件上运行的用户定义处理程序

## 编排工作流

\`\`\`
Command → Agent → Skill
\`\`\`

这是一个强大的三层架构模式，用于构建复杂的工作流。

## 快速开始

1. 安装 Claude Code: \`npm install -g @anthropic-ai/claude-code\`
2. 在项目中运行: \`claude\`
3. 使用 "/" 查看可用命令
4. 探索最佳实践和技巧

---

*本网站收集了 Claude Code 的完整最佳实践，帮助你更高效地使用这个强大的 AI 编程助手。*
`,

  'subagents': `# Subagents 最佳实践

Subagents 是在全新隔离上下文中运行的自主执行者，具有自定义工具、权限、模型和持久身份。

## Frontmatter 字段 (16)

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| \`name\` | string | 是 | 唯一标识符，使用小写字母和连字符 |
| \`description\` | string | 是 | 何时调用。使用 "PROACTIVELY" 让 Claude 自动调用 |
| \`tools\` | string/list | 否 | 逗号分隔的工具白名单。支持 Agent(agent_type) 语法 |
| \`disallowedTools\` | string/list | 否 | 要拒绝的工具 |
| \`model\` | string | 否 | 模型别名: haiku, sonnet, opus, inherit |
| \`permissionMode\` | string | 否 | 权限模式: default, acceptEdits, dontAsk, bypassPermissions, plan |
| \`maxTurns\` | integer | 否 | 子代理停止前的最大轮数 |
| \`skills\` | list | 否 | 预加载到代理上下文的技能名称 |
| \`mcpServers\` | list | 否 | 此子代理的 MCP 服务器 |
| \`hooks\` | object | 否 | 此子代理的生命周期钩子 |
| \`memory\` | string | 否 | 持久内存范围: user, project, local |
| \`background\` | boolean | 否 | 始终作为后台任务运行 |
| \`effort\` | string | 否 | 覆盖努力级别: low, medium, high, max |
| \`isolation\` | string | 否 | 设置为 "worktree" 在临时 git worktree 中运行 |
| \`initialPrompt\` | string | 否 | 作为第一个用户回合自动提交 |
| \`color\` | string | 否 | CLI 输出颜色，用于视觉区分 |

## 官方内置 Subagents (5)

| # | Agent | 模型 | 工具 | 描述 |
|---|-------|------|------|------|
| 1 | general-purpose | inherit | All | 复杂多步骤任务 - 研究、代码搜索和自主工作的默认代理类型 |
| 2 | Explore | haiku | 只读 | 快速代码库搜索和探索 |
| 3 | Plan | inherit | 只读 | 计划模式下的预规划研究 |
| 4 | statusline-setup | sonnet | Read, Edit | 配置状态行设置 |
| 5 | claude-code-guide | haiku | 多种 | 回答 Claude Code 功能相关问题 |

## 使用技巧

- **使用子代理向问题投入更多计算** - 将任务卸载以保持主上下文干净和专注
- **使用特定功能的子代理** - 而不是通用的 QA 或后端工程师
- **使用测试时间计算** - 单独的上下文窗口使结果更好
- **与 tmux 和 git worktrees 一起使用代理团队** - 进行并行开发
`,

  'commands': `# Commands 最佳实践

Commands 是注入到现有上下文中的知识 - 简单的用户调用提示模板，用于工作流编排。

## Frontmatter 字段 (13)

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| \`name\` | string | 否 | 显示名称和 /slash-command 标识符 |
| \`description\` | string | 推荐 | 命令的作用。用于自动发现 |
| \`argument-hint\` | string | 否 | 自动完成提示 (例如 [issue-number]) |
| \`disable-model-invocation\` | boolean | 否 | 设置为 true 防止自动调用 |
| \`user-invocable\` | boolean | 否 | 设置为 false 从 "/" 菜单隐藏 |
| \`paths\` | string/list | 否 | 限制此技能何时激活的 glob 模式 |
| \`allowed-tools\` | string | 否 | 此命令激活时允许的工具 |
| \`model\` | string | 否 | 运行时的模型 |
| \`effort\` | string | 否 | 覆盖努力级别 |
| \`context\` | string | 否 | 设置为 fork 在隔离子代理中运行 |
| \`agent\` | string | 否 | context: fork 时的子代理类型 |
| \`shell\` | string | 否 | !\`command\` 块的 shell |
| \`hooks\` | object | 否 | 此命令的生命周期钩子 |

## 常用官方命令

### 认证与配置
- \`/login\` - 登录 Anthropic 账户
- \`/config\` - 打开设置界面
- \`/theme\` - 更改主题
- \`/permissions\` - 管理权限规则

### 上下文管理
- \`/context\` - 可视化当前上下文使用情况
- \`/cost\` - 显示 token 使用统计
- \`/compact\` - 压缩对话
- \`/clear\` - 清除对话历史

### 扩展管理
- \`/agents\` - 管理代理配置
- \`/mcp\` - 管理 MCP 服务器
- \`/skills\` - 列出可用技能
- \`/hooks\` - 查看钩子配置

### 模型控制
- \`/model\` - 选择或更改 AI 模型
- \`/effort\` - 设置模型努力级别
- \`/fast\` - 切换快速模式

### 会话管理
- \`/branch\` - 创建会话分支
- \`/resume\` - 恢复对话
- \`/rewind\` - 回退对话和/或代码

## 最佳实践

> 使用 commands 而不是 subagents 来工作流 - Boris Cherny

- 为你每天多次做的每个 "内循环" 工作流使用 slash commands
- Commands 保存在 .claude/commands/ 中并提交到 git
- 如果你每天做某事超过一次，把它变成 skill 或 command
`,

  'skills': `# Skills 最佳实践

Skills 是可配置、可预加载、可自动发现的知识模块，支持上下文分叉和渐进式披露。

## Frontmatter 字段 (13)

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| \`name\` | string | 否 | 显示名称和 /slash-command 标识符 |
| \`description\` | string | 推荐 | 技能的作用 |
| \`argument-hint\` | string | 否 | 自动完成提示 |
| \`disable-model-invocation\` | boolean | 否 | 防止自动调用 |
| \`user-invocable\` | boolean | 否 | 从 "/" 菜单隐藏 |
| \`allowed-tools\` | string | 否 | 此技能激活时允许的工具 |
| \`model\` | string | 否 | 运行时的模型 |
| \`effort\` | string | 否 | 覆盖努力级别 |
| \`context\` | string | 否 | 设置为 fork 在隔离子代理中运行 |
| \`agent\` | string | 否 | context: fork 时的子代理类型 |
| \`hooks\` | object | 否 | 生命周期钩子 |
| \`paths\` | string/list | 否 | 限制自动激活的 glob 模式 |
| \`shell\` | string | 否 | !\`command\` 块的 shell |

## 官方捆绑 Skills (5)

| # | Skill | 描述 |
|---|-------|------|
| 1 | simplify | 审查更改的代码以重用、质量和效率 |
| 2 | batch | 跨多个文件批量运行命令 |
| 3 | debug | 调试失败的命令或代码问题 |
| 4 | loop | 在循环间隔上运行提示或 slash 命令 |
| 5 | claude-api | 使用 Claude API 或 Anthropic SDK 构建应用 |

## Skills 设计技巧

> 技能的描述字段是触发器，不是摘要 - Thariq

- **使用 context: fork** - 在隔离子代理中运行技能
- **在子文件夹中使用技能** - 用于 monorepos
- **技能是文件夹，不是文件** - 使用 references/, scripts/, examples/ 子目录进行渐进式披露
- **在每个技能中构建 Gotchas 部分** - 最高信号内容
- **不要陈述显而易见的事** - 专注于推动 Claude 偏离默认行为的内容
- **不要给 Claude 设限** - 给出目标和约束，而不是规定性的逐步说明
- **在技能中包含脚本和库** - 让 Claude 组合而不是重构样板代码
- **嵌入 !\`command\`** - 将动态 shell 输出注入提示
`,

  'mcp': `# MCP 服务器最佳实践

MCP (Model Context Protocol) 服务器通过连接到外部工具、数据库和 API 来扩展 Claude Code。

## 每日使用的 MCP 服务器

> "使用了 15 个 MCP 服务器，以为越多越好。结果每天只使用 4 个。" — r/mcp

| MCP 服务器 | 作用 | 推荐程度 |
|------------|------|----------|
| **Context7** | 获取最新的库文档到上下文 | 5/5 |
| **Playwright** | 浏览器自动化 - 实现、测试和验证 UI 功能 | 5/5 |
| **Claude in Chrome** | 连接到真实 Chrome 浏览器 - 检查控制台、网络、DOM | 5/5 |
| **DeepWiki** | 获取任何 GitHub 仓库的结构化 wiki 风格文档 | 4/5 |
| **Excalidraw** | 从提示生成架构图、流程图和系统设计 | 4/5 |

工作流: **Research (Context7/DeepWiki) → Debug (Playwright/Chrome) → Document (Excalidraw)**

## 配置

MCP 服务器在项目根目录的 .mcp.json (项目范围) 或 ~/.claude.json (用户范围) 中配置。

### 示例 .mcp.json

\`\`\`json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "deepwiki": {
      "command": "npx",
      "args": ["-y", "deepwiki-mcp"]
    }
  }
}
\`\`\`

## 权限规则

MCP 工具遵循 mcp__\<server\>__\<tool\> 命名约定。

## MCP 范围

| 范围 | 位置 | 用途 |
|------|------|------|
| **Project** | .mcp.json | 团队共享的服务器 |
| **User** | ~/.claude.json | 跨所有项目的个人服务器 |
| **Subagent** | 代理 frontmatter | 特定子代理的服务器 |

优先级: Subagent > Project > User
`,

  'memory': `# Memory (记忆) 最佳实践

通过 CLAUDE.md 文件实现持久上下文。

## 编写好的 CLAUDE.md

一个结构良好的 CLAUDE.md 是改善 Claude Code 项目输出的最有效方式。

### 关键要点

- **目标 < 200 行** 每个文件 - 以保持可靠的遵守
- **使用 \`<important if="...">\` 标签** - 防止 Claude 随着文件增长而忽略规则
- **为 monorepos 使用多个 CLAUDE.md** - 祖先 + 后代加载
- **使用 .claude/rules/** - 分割大指令

## Monorepo 中的 CLAUDE.md

Claude Code 使用两种机制加载 CLAUDE.md 文件：

### 祖先加载 (向上目录树)

当你启动 Claude Code 时，它从当前工作目录向文件系统根目录向上行走，并加载沿途找到的每个 CLAUDE.md。这些文件在启动时立即加载。

### 后代加载 (向下目录树)

当前工作目录下方子目录中的 CLAUDE.md 文件在启动时不加载。它们只在你在会话期间读取这些子目录中的文件时才被包含。这被称为懒加载。

## 关键要点

1. **祖先总是在启动时加载** - 确保你始终可以访问根级指令
2. **后代懒加载** - 防止不相关的上下文膨胀
3. **兄弟从不加载** - 在 frontend/ 工作时不会加载 backend/CLAUDE.md
4. **全局 CLAUDE.md** - 放在 ~/.claude/CLAUDE.md 应用于所有会话

## 最佳实践

- 在根 CLAUDE.md 中放入共享约定
- 在组件 CLAUDE.md 中放入组件特定指令
- 使用 CLAUDE.local.md 存放个人偏好
- 任何开发人员都应该能够启动 Claude 并说 "run the tests"，它在第一次尝试时就有效
`,

  'settings': `# Settings (设置) 最佳实践

Claude Code 的分层配置系统。

## 配置层次结构

1. **Managed** - 组织强制，无法覆盖
2. **命令行参数** - 单会话覆盖
3. **.claude/settings.local.json** - 个人项目设置 (git-ignored)
4. **.claude/settings.json** - 团队共享设置
5. **~/.claude/settings.json** - 全局个人默认值

## 常用设置

### 权限设置

\`\`\`json
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(git *)",
      "Read",
      "Write"
    ],
    "deny": [
      "Bash(rm -rf /)"
    ]
  }
}
\`\`\`

### MCP 服务器设置

\`\`\`json
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["context7", "playwright"],
  "disabledMcpjsonServers": []
}
\`\`\`

### 外观设置

\`\`\`json
{
  "theme": "dark",
  "outputStyle": "concise",
  "color": "cyan"
}
\`\`\`

### 模型设置

\`\`\`json
{
  "model": "claude-sonnet-4",
  "effort": "high"
}
\`\`\`
`,

  'hot-features': `# 热门功能

## Power-ups

交互式课程教授 Claude Code 功能与动画演示 (v2.1.90+)

使用方法: 输入 /powerup 开始学习

## No Flicker Mode (Beta)

CLAUDE_CODE_NO_FLICKER=1

无闪烁的 alt-screen 渲染，支持鼠标、稳定内存和应用内滚动。

## Computer Use (Beta)

computer-use MCP 服务器

让 Claude 控制你的屏幕 - 在 macOS 上打开应用、点击、输入和截图。

## Auto Mode (Beta)

claude --enable-auto-mode

后台安全分类器替代手动权限提示 - Claude 决定什么是安全的，同时阻止提示注入和有风险的升级。

使用方法:
- 启动: claude --enable-auto-mode 或 --permission-mode auto
- 或在会话期间按 Shift+Tab 循环到它

## Channels (Beta)

--channels, 基于插件

将 Telegram、Discord 或 webhook 的事件推送到运行中的会话 - Claude 在你离开时做出反应。

## Code Review (Beta)

多代理 PR 分析，捕获错误、安全漏洞和回归。

## Chrome (Beta)

--chrome, 扩展

通过 Chrome 中的 Claude 进行浏览器自动化 - 测试 Web 应用、使用控制台调试、自动化表单、从页面提取数据。

## Scheduled Tasks

- /loop - 在本地循环计划上运行提示 (最多 3 天)
- /schedule - 在 Anthropic 基础设施上的云中运行提示 - 即使你的机器关闭也有效

## Voice Dictation (Beta)

/voice

按键通话语音输入，支持 20 种语言。

## Agent Teams (Beta)

使用 tmux 和 git worktrees 的多个代理在相同代码库上并行工作。

使用方法: 设置环境变量启用

## Git Worktrees

隔离的 git 分支用于并行开发 - 每个代理获得自己的工作副本。

## Remote Control

/remote-control, /rc

从任何设备继续本地会话 - 手机、平板或浏览器。
`,

  'tips-prompting': `# Prompting 技巧

## 挑战 Claude

> "grill me on these changes and don't make a PR until I pass your test."
> 
> — Boris Cherny

或 "prove to me this works" 并让 Claude 比较 main 和你的分支之间的差异。

🚫👶 = 不需要 babysit

## 优雅解决方案

在一次普通的修复后：

> "knowing everything you know now, scrap this and implement the elegant solution"

🚫👶

## Bug 修复

Claude 大部分 bug 都能自己修复 - 粘贴 bug，说 "fix"，不要微观管理怎么做。

🚫👶

## 最佳实践

1. **始终从计划模式开始**
2. **从最小规格开始** - 让 Claude 使用 AskUserQuestion 工具采访你
3. **写详细的规格** - 你越具体，输出越好
4. **原型 > PRD** - 构建 20-30 个版本而不是写规格，构建成本低所以多尝试
`,

  'tips-planning': `# 规划与规格技巧

## 始终从计划模式开始

> 始终从 plan mode 开始 — Boris Cherny

## 创建最小规格

从最小规格或提示开始，让 Claude 使用 AskUserQuestion 工具采访你，然后创建新会话来执行规格。

## 分阶段门控计划

始终制定分阶段的门控计划，每个阶段都有多个测试（单元、自动化、集成）。

## 审查计划

启动第二个 Claude 作为高级工程师审查你的计划，或使用 cross-model 进行审查。

## 减少歧义

在交接工作之前写详细的规格并减少歧义 - 你越具体，输出越好。

## 原型优于规格

构建 20-30 个版本而不是写规格，构建成本低所以多尝试。
`,

  'tips-claudemd': `# CLAUDE.md 最佳实践

## 文件大小

CLAUDE.md 应该**每文件少于 200 行**。

> 目标 < 200 行每个文件以保持可靠的遵守 — Boris Cherny

## 使用 Important 标签

将特定领域的 CLAUDE.md 规则包装在 \`<important if="...">\` 标签中，以防止 Claude 随着文件增长而忽略它们。

## Monorepos 中的多个 CLAUDE.md

使用多个 CLAUDE.md 用于 monorepos — 祖先 + 后代加载。

## 拆分大指令

使用 .claude/rules/ 拆分大指令。

## 代码库设置

任何开发人员都应该能够启动 Claude，说 "run the tests" 并且它在第一次尝试时就有效 — 如果不能，你的 CLAUDE.md 缺少基本的设置/构建/测试命令。

## 完成迁移

保持代码库清洁并完成迁移 — 部分迁移的框架会混淆可能选择错误模式的模型。

## 使用 settings.json

使用 settings.json 用于工具强制执行的行为（归因、权限、模型）— 不要把 "NEVER add Co-Authored-By" 放在 CLAUDE.md 中，当 "attribution.commit: """ 是确定性的。
`,

  'tips-agents': `# Agents 技巧

## 使用特定功能的子代理

有特定功能的 sub-agents（额外上下文）与 skills（渐进式披露）而不是通用的 qa、后端工程师。

> 使用 commands 而不是 subagents 来工作流 — Boris Cherny

## 向问题投入更多计算

说 "use subagents" 向问题投入更多计算 — 将任务卸载以保持你的主上下文干净和专注。

🚫👶

## 代理团队与并行开发

agent teams with tmux 和 git worktrees 用于并行开发。

## 测试时间计算

使用 test time compute — 单独的上下文窗口使结果更好；一个代理可能造成错误，另一个（相同模型）可以发现它们。
`,

  'tips-commands': `# Commands 技巧

## 使用 Commands 代替 Subagents

使用 commands 你的工作流而不是 sub-agents。

> 使用 commands 而不是 subagents 来工作流 — Boris Cherny

## 为内循环工作流使用 Slash Commands

为你每天多次做的每个 "内循环" 工作流使用 slash commands — 节省重复提示，commands 保存在 .claude/commands/ 并提交到 git。

## 自动化重复任务

如果你每天做某事超过一次，把它变成 skill 或 command — 构建 /techdebt、context-dump 或 analytics commands。
`,

  'tips-skills': `# Skills 技巧

## 使用 Context Fork

使用 context: fork 在隔离子代理中运行技能 — 主上下文只看到最终结果，而不是中间工具调用。

## Monorepos 中的子文件夹技能

在 monorepos 中使用子文件夹中的技能。

## 渐进式披露

技能是文件夹，不是文件 — 使用 references/、scripts/、examples/ 子目录进行渐进式披露。

## 构建 Gotchas 部分

在每个技能中构建 Gotchas 部分 — 最高信号内容，随着时间添加 Claude 的失败点。

## 描述字段是触发器

技能的描述字段是触发器，不是摘要 — 为模型写（"何时应该触发？"）。

## 不要陈述显而易见的事

不要在技能中陈述显而易见的事 — 专注于推动 Claude 偏离默认行为的内容。

🚫👶

## 不要给 Claude 设限

不要在技能中给 Claude 设限 — 给出目标和约束，而不是规定性的逐步说明。

🚫👶

## 包含脚本和库

在技能中包含脚本和库，让 Claude 组合而不是重构样板代码。

## 嵌入动态命令

嵌入 !\`command\` 到 SKILL.md 中将动态 shell 输出注入提示 — Claude 在调用时运行它，模型只看到结果。
`,

  'tips-hooks': `# Hooks 技巧

## 按需 Hooks

在技能中使用按需 hooks — /careful 阻止破坏性命令，/freeze 阻止目录外的编辑。

## 测量技能使用

使用 PreToolUse hook 来测量技能使用 — 找出受欢迎或触发不足的技能。

## 自动格式化

使用 PostToolUse hook 自动格式化代码 — Claude 生成格式良好的代码，钩子处理最后 10% 以避免 CI 失败。

## 权限路由

通过钩子将权限请求路由到 Opus — 让它扫描攻击并自动批准安全的。

🚫👶

## 停止钩子

使用 Stop hook 促使 Claude 继续或在回合结束时验证其工作。
`,

  'tips-workflows': `# 工作流技巧

## 研究 → 计划 → 执行 → 审查 → 发布

所有主要工作流都汇聚到相同的架构模式：

1. **Research** - 探索和理解
2. **Plan** - 制定实施方法
3. **Execute** - 执行计划
4. **Review** - 审查和验证
5. **Ship** - 发布和部署

## 在 ~50% 上下文使用时手动 /compact

定期压缩以保持上下文高效。

## 复杂任务从计划模式开始

对于复杂任务，始终从计划模式开始。

## 人类门控任务列表

使用人类门控任务列表工作流进行多步骤任务。

## 子任务细分

将子任务细分到足以在 < 50% 上下文中完成。

## 调试技巧

- 使用 /doctor 进行诊断
- 将长时间运行的终端命令作为后台任务运行以获得更好的日志可见性
- 使用浏览器自动化 MCP (Chrome 中的 Claude、Playwright、Chrome DevTools) 让 Claude 检查控制台日志
- 报告视觉问题时提供截图
`,

  'workflows': `# 开发工作流

所有主要工作流都汇聚到相同的架构模式：**Research → Plan → Execute → Review → Ship**

## 热门工作流对比

| 名称 | 星标 | 独特特性 | Agents | Commands | Skills |
|------|-----|----------|--------|----------|--------|
| Everything Claude Code | 133k | Instinct Scoring, AgentShield | 36 | 68 | 152 |
| Superpowers | 132k | TDD-first, Iron Laws | 5 | 3 | 14 |
| Spec Kit | 85k | 规格驱动, 宪法, 22+ 工具 | 0 | 9+ | 0 |
| gstack | 62k | 角色人设, /codex 审查 | 0 | 0 | 33 |
| Get Shit Done | 47k | 新鲜 200K 上下文, 波浪执行 | 21 | 59 | 0 |
| BMAD-METHOD | 43k | 完整 SDLC, 代理人设 | 0 | 0 | 40 |
| OpenSpec | 37k | Delta 规格, 棕地 | 0 | 11 | 0 |
| Compound Engineering | 13k | 复合学习, 多平台 CLI | 49 | 4 | 42 |
| HumanLayer | 10k | RPI, 上下文工程 | 6 | 27 | 0 |

## 推荐工作流

### 对于新功能

1. 使用 Plan agent 进行预规划研究
2. 创建详细规格
3. 使用特定功能的 subagents 实施
4. 使用第二个 agent 进行审查
5. 测试和部署

### 对于 Bug 修复

1. 使用 Explore agent 理解代码库
2. 识别根本原因
3. 实施修复
4. 验证修复
5. 提交 PR
`,

  'cli-flags': `# CLI 启动参数

## 常用启动参数

### 权限模式

| 参数 | 描述 |
|------|------|
| --permission-mode auto | 启用自动模式 (Beta) |
| --permission-mode plan | 计划模式 |
| --bypass-permissions | 绕过所有权限提示 |

### 模型选择

| 参数 | 描述 |
|------|------|
| --model claude-opus-4 | 使用 Opus 4 模型 |
| --model claude-sonnet-4 | 使用 Sonnet 4 模型 (默认) |
| --model claude-haiku-4 | 使用 Haiku 4 模型 |

### 努力级别

| 参数 | 描述 |
|------|------|
| --effort low | 低努力 |
| --effort medium | 中等努力 |
| --effort high | 高努力 |
| --effort max | 最大努力 (仅 Opus) |

### 环境变量

| 变量 | 描述 |
|------|------|
| CLAUDE_CODE_NO_FLICKER=1 | 启用无闪烁模式 |
| CLAUDE_CODE_USE_POWERSHELL_TOOL=1 | 使用 PowerShell 工具 |

### 其他选项

| 参数 | 描述 |
|------|------|
| --agent <name> | 使用特定代理 |
| --chrome | 启用 Chrome 集成 |
| --remote | 启用远程控制 |
| --help | 显示帮助 |

## 示例用法

\`\`\`bash
# 使用自动模式启动
claude --enable-auto-mode

# 使用特定模型和代理
claude --model claude-opus-4 --agent my-custom-agent

# 启用 Chrome 集成
claude --chrome

# 启用无闪烁模式
CLAUDE_CODE_NO_FLICKER=1 claude
\`\`\`
`,

  'powerups': `# Power-ups

交互式课程教授 Claude Code 功能与动画演示。

## 可用课程

Power-ups 是 Claude Code v2.1.90+ 中的交互式课程，帮助你学习各种功能：

### 基础课程

- **Getting Started** - Claude Code 入门
- **Slash Commands** - 掌握 slash commands
- **Context Management** - 有效管理上下文
- **Subagents** - 使用子代理

### 高级课程

- **Skills Development** - 开发自定义技能
- **MCP Integration** - 集成 MCP 服务器
- **Workflow Automation** - 自动化工作流
- **Best Practices** - 最佳实践和技巧

## 如何使用

1. 在 Claude Code 中输入 /powerup
2. 选择你想学习的课程
3. 跟随交互式演示
4. 在实践中学习

## 优势

- **交互式学习** - 不只是阅读，而是实际操作
- **动画演示** - 视觉化理解概念
- **即时反馈** - 立即看到你的操作结果
- **渐进式难度** - 从基础到高级

## 提示

- 为团队成员设置定期的 power-up 会话
- 在引入新功能时完成相关 power-ups
- 使用 power-ups 作为新团队成员的入职培训
- 定期重新访问以强化学习

---

开始使用: /powerup
`,
};

export const getContent = (id: string): string => {
  return contentMap[id] || contentMap['overview'];
};
