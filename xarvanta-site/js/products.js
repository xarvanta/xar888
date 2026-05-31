/**
 * Product Data
 * ============
 * 峰哥 → 在这里改产品文字、加图片
 *
 * 图片放在对应文件夹：
 *   img/electronics/  →  1.jpg, 2.jpg, 3.jpg ...
 *   img/adult/        →  1.jpg, 2.jpg, 3.jpg ...
 *   img/toys/         →  1.jpg, 2.jpg, 3.jpg ...
 *   img/other/        →  1.jpg, 2.jpg, 3.jpg ...
 *
 * 封面图叫 cover.jpg
 * 轮播图叫 1.jpg, 2.jpg, 3.jpg ...（按数字顺序）
 */

const PRODUCTS = {
  electronics: {
    title: "Electronics",
    emoji: "📱",
    description: "I source a wide range of electronics from Shenzhen — the world's electronics capital. From smartphones and accessories to smart home devices and PC components, I connect you with reliable factories that deliver quality.",
    features: [
      "Smartphones & Tablets",
      "Earphones & Audio",
      "Chargers & Cables",
      "Smart Home Devices",
      "PC & Laptop Components",
      "Custom Electronics"
    ],
    // 图片数量（自动加载 img/electronics/1.jpg, 2.jpg ...）
    imageCount: 0
  },
  adult: {
    title: "Adult Products",
    emoji: "🔞",
    description: "Discreet sourcing of adult wellness and intimate products. I work with factories that prioritize quality materials, safety standards, and export compliance.",
    features: [
      "Adult Wellness Products",
      "Intimate Accessories",
      "Massage Devices",
      "Lingerie & Apparel",
      "Custom OEM/ODM",
      "Discreet Packaging Available"
    ],
    imageCount: 0
  },
  toys: {
    title: "Toys & Games",
    emoji: "🧸",
    description: "From educational toys to outdoor games, I help you find the right manufacturers. All factories are vetted for quality, safety certifications, and export experience.",
    features: [
      "Educational Toys",
      "Plush Dolls & Stuffed Animals",
      "RC Toys & Drones",
      "Board Games & Puzzles",
      "Outdoor & Sports Toys",
      "Custom Toy Manufacturing"
    ],
    imageCount: 0
  },
  other: {
    title: "Other Products",
    emoji: "📦",
    description: "Need something else? I source home goods, packaging, promotional items, and custom manufacturing. If it's made in China, I can find the right factory.",
    features: [
      "Home & Kitchen Goods",
      "Packaging Materials",
      "Promotional Items",
      "Custom Manufacturing",
      "Pet Supplies",
      "Fashion Accessories"
    ],
    imageCount: 0
  }
};
