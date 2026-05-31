/**
 * Product Data
 * ============
 * 改文字、图片数量在这里
 *
 * 图片放在: img/electronics/1.jpg, 2.jpg...
 * 封面图: cover.jpg
 * 轮播图: 1.jpg, 2.jpg, 3.jpg ...
 *
 * imageCount: 你放了几张轮播图就写几
 */

const PRODUCTS = [
  {
    key: "electronics",
    title: "Electronics",
    emoji: "📱",
    description: "From smartphones to smart home devices, Shenzhen is the world's electronics capital. I connect you with reliable factories that deliver quality.",
    features: ["Smartphones & Tablets", "Earphones & Audio", "Chargers & Cables", "Smart Home Devices", "PC Components", "Custom Electronics"],
    imageCount: 0,
    bg: "#e3f2fd"
  },
  {
    key: "adult",
    title: "Adult Products",
    emoji: "🔞",
    description: "Discreet sourcing of adult wellness products. I work with factories that prioritize quality, safety, and export compliance.",
    features: ["Wellness Products", "Intimate Accessories", "Massage Devices", "Lingerie", "Custom OEM/ODM", "Discreet Packaging"],
    imageCount: 0,
    bg: "#fce4ec"
  },
  {
    key: "toys",
    title: "Toys & Games",
    emoji: "🧸",
    description: "Educational toys, plush, RC toys, board games — I help you find the right manufacturers with safety certifications.",
    features: ["Educational Toys", "Plush & Stuffed Animals", "RC Toys & Drones", "Board Games", "Outdoor Toys", "Custom Manufacturing"],
    imageCount: 0,
    bg: "#fff3e0"
  },
  {
    key: "other",
    title: "Other Products",
    emoji: "📦",
    description: "Home goods, packaging, promotional items, custom manufacturing. If it's made in China, I can find the right factory.",
    features: ["Home & Kitchen", "Packaging Materials", "Promotional Items", "Custom Manufacturing", "Pet Supplies", "Fashion Accessories"],
    imageCount: 0,
    bg: "#f3e5f5"
  }
];
