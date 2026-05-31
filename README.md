# Xarvanta 外贸网站

## 结构

```
xarvanta-site/
├── index.html           # 主页面
├── css/style.css        # 样式（移动优先）
├── js/
│   ├── products.js      # 产品数据 ← 改文字、图片数量在这里
│   └── app.js           # 页面逻辑
└── img/
    ├── electronics/     # 封面: cover.jpg  轮播: 1.jpg 2.jpg ...
    ├── adult/
    ├── toys/
    └── other/
```

## 换图

把图片放到 `img/` 对应文件夹：
- `cover.jpg` = 产品卡片封面
- `1.jpg, 2.jpg, 3.jpg...` = 详情页轮播图

然后在 `js/products.js` 里把 `imageCount` 改成你放的张数。

## 换文字

打开 `js/products.js`，直接改对应产品的 title、description、features。

## 部署

整个文件夹上传到 GitHub 仓库，Cloudflare Pages 绑定后自动部署。
