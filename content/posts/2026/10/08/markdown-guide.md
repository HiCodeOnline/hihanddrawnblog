---
title: "Markdown 排版速查：这个博客支持的写作元素"
date: "2026-10-08"
category: "写作"
tags: ["Markdown", "排版", "教程"]
excerpt: "本文展示这个博客支持的所有 Markdown 元素，包括标题、段落、列表、引用、代码块、表格、图片等，方便写作时查阅。"
---

这篇文章集中展示博客支持的 Markdown 元素，方便写作时参考。

## 标题层级

从二级标题到六级标题，都会自动生成目录锚点。

### 三级标题示例

#### 四级标题示例

## 段落与强调

这是一段普通的正文。可以使用 **粗体**、*斜体*、~~删除线~~ 和 `行内代码`。

> 这是一段引用文字。引用会带有左侧的绿色边框和淡绿色背景，适合用来放名言或重点内容。

## 列表

无序列表：
- 第一项
- 第二项
  - 嵌套项 A
  - 嵌套项 B
- 第三项

有序列表：
1. 第一步：准备材料
2. 第二步：开始制作
3. 第三步：享用成品

任务列表：
- [x] 已完成的任务
- [ ] 待完成的任务
- [ ] 另一个待办

## 代码块

支持语法高亮的代码块：

```javascript
function greeting(name) {
  return `你好，${name}！欢迎来到手帐博客。`;
}

console.log(greeting("旅人"));
```

```css
.paper-card {
  background: white;
  border-radius: 1rem;
  transition: all 0.3s ease;
}
```

## 表格

| 功能 | 支持 | 说明 |
|------|:----:|------|
| 标题 | ✅ | h1-h6 |
| 列表 | ✅ | 有序/无序/任务 |
| 代码 | ✅ | 语法高亮 |
| 表格 | ✅ | GFM 表格 |
| 数学公式 | ❌ | 暂未支持 |

## 链接与图片

这是一个 [普通链接](https://flatpaper.nep.me/) 的示例。

图片会自动带有圆角和阴影：

![风景插画](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=watercolor%20illustration%20of%20a%20cozy%20desk%20with%20coffee%20notebook%20and%20plants%20warm%20healing%20style&image_size=landscape_16_9)

## 分割线

上面是图片，下面是分割线。

---

以上就是常用的排版元素啦，祝你写作愉快！
