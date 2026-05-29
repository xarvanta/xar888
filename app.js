// ========== Navigation & Page Routing ==========
const navLinks = document.querySelectorAll('.nav-links a, .logo');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const pages = {
  home: document.getElementById('page-home'),
  products: document.getElementById('page-products'),
  'product-detail': document.getElementById('page-product-detail'),
  about: document.getElementById('page-about'),
  contact: document.getElementById('page-contact'),
};

// Page routing — intercept all data-page clicks
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-page]');
  if (!link) return;
  e.preventDefault();

  const page = link.dataset.page;
  if (page === 'product-detail') {
    const product = link.dataset.product || 'electronics';
    showProductDetail(product);
  }
  showPage(page);
  closeMobileNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function showPage(id) {
  Object.values(pages).forEach(p => p?.classList.remove('active'));
  if (pages[id]) pages[id].classList.add('active');

  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });
}

function closeMobileNav() {
  navLinksContainer.classList.remove('open');
}

hamburger?.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
});

// ========== Product Data ==========
const products = {
  electronics: {
    title: 'Electronics',
    emoji: '📱',
    bg: '#e3f2fd',
    subtitle: 'Consumer Electronics & Accessories',
    description: 'From smart devices to everyday electronics — we connect you with reliable manufacturers across China\'s electronics hubs (Shenzhen, Dongguan, Shanghai).',
    features: [
      'Consumer electronics & gadgets',
      'Mobile phone accessories',
      'Smart home devices',
      'Wearables & audio products',
      'Custom PCB & components',
      'Quality inspection & testing',
      'MOQ negotiation for small buyers',
    ],
  },
  adult: {
    title: 'Adult Products',
    emoji: '🔞',
    bg: '#fce4ec',
    subtitle: 'Adult Wellness & Intimate Products',
    description: 'Discreet sourcing for adult wellness products. We work with verified manufacturers who meet international quality and safety standards.',
    features: [
      'Adult wellness & massage devices',
      'Intimate accessories & toys',
      'Discreet packaging & shipping',
      'Quality & safety compliance',
      'Private label & OEM available',
      'Fast & confidential communication',
    ],
  },
  toys: {
    title: 'Toys & Games',
    emoji: '🧸',
    bg: '#fff3e0',
    subtitle: 'Educational & Entertainment Toys',
    description: 'Sourcing toys for all ages — from educational wooden toys to electronic games and plush products. We ensure compliance with safety regulations.',
    features: [
      'Educational & learning toys',
      'Electronic & interactive toys',
      'Plush & stuffed animals',
      'Outdoor & sport toys',
      'Board games & puzzles',
      'CE, EN71, ASTM compliance',
      'Custom design & branding',
    ],
  },
  other: {
    title: 'Other Products',
    emoji: '📦',
    bg: '#f3e5f5',
    subtitle: 'Home, Packaging, Promotional & Custom',
    description: 'Have a unique request? We source across multiple categories. From home goods to promotional products and packaging — if it\'s made in China, we can help.',
    features: [
      'Home & kitchen products',
      'Packaging materials & design',
      'Promotional & corporate gifts',
      'Custom manufacturing requests',
      'Raw materials sourcing',
      'Supply chain coordination',
      'No minimum — everything is possible',
    ],
  },
};

// ========== Product Detail ==========
function showProductDetail(slug) {
  const p = products[slug];
  if (!p) return;

  const container = document.getElementById('product-detail-content');
  container.innerHTML = `
    <div class="product-detail-header">
      <span class="product-detail-category">${p.emoji} ${p.subtitle}</span>
      <h1>${p.title}</h1>
      <p>${p.description}</p>
    </div>
    <div class="product-detail-body">
      <div class="product-detail-image" style="background:${p.bg};">
        <span style="filter:drop-shadow(0 4px 8px rgba(0,0,0,0.05));">${p.emoji}</span>
      </div>
      <div>
        <h2>What We Offer</h2>
        <ul>
          ${p.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div class="product-detail-cta">
          <a href="#" class="btn btn-primary" data-page="contact">Inquire About ${p.title}</a>
        </div>
      </div>
    </div>
  `;
}