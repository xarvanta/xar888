# Xarvanta 外贸网站 — 使用说明

## 目录结构

```
xarvanta-site/
├── index.html              # 主页面（打开这个看效果）
├── css/
│   └── style.css           # 样式
├── js/
│   ├── products.js         # 产品数据（改文字在这里）
│   └── app.js              # 页面逻辑
└── img/
    ├── electronics/        # 电子产品图片
    │   ├── cover.jpg       # 封面图（产品卡片上显示的）
    │   ├── 1.jpg           # 详情页轮播图
    │   ├── 2.jpg
    │   └── ...
    ├── adult/              # 成人用品图片
    │   ├── cover.jpg
    │   ├── 1.jpg
    │   └── ...
    ├── toys/               # 玩具图片
    │   ├── cover.jpg
    │   ├── 1.jpg
    │   └── ...
    ├── other/              # 其他产品图片
    │   ├── cover.jpg
    │   ├── 1.jpg
    │   └── ...
    └── about.jpg            # 个人照片（可选）
```

## 如何更换图片

把新的图片放进对应文件夹，**文件名必须一致**：

| 文件 | 尺寸建议 | 说明 |
|------|---------|------|
| `cover.jpg` | 800×600px | 产品卡片封面 |
| `1.jpg`, `2.jpg`, `3.jpg`... | 1200×900px | 详情页轮播图 |

然后在 `js/products.js` 里修改 `imageCount`：

```js
electronics: {
  ...
  imageCount: 3   // 改成你放了多少张图
},
```

## 如何修改文字

打开 `js/products.js`，直接改对应产品的 `title`、`description`、`features`。

## 部署到 GitHub + Cloudflare

1. 把 `xarvanta-site/` 里所有文件上传到 GitHub 仓库
2. Cloudflare Pages 绑定该仓库，自动部署

## 联系表单

表单目前是演示模式。要真正接收客户留言，推荐用：
- **Formspree** (免费): 注册后把 action 里的 `your-form-id` 替换
- **EmailJS**: 通过 JS 直接发邮件
- 或者用 **Netlify Forms**（Cloudflare 不支持，换 Netlify 部署）

当前会弹窗提示客户通过 WhatsApp/Email 直接联系你。
