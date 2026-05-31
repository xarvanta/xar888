/**
 * Xarvanta — Main App
 */

// ========== Page Navigation ==========
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  navLinks.forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-links a[data-page="${pageId}"]`);
  if (activeLink) activeLink.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Nav clicks
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const page = el.dataset.page;
    showPage(page);
    navLinksContainer.classList.remove('open');
  });
});

// Hamburger
hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
});

// ========== Product Detail Page ==========
function buildProductDetail(productKey) {
  const p = PRODUCTS[productKey];
  if (!p) return;

  const container = document.getElementById('product-detail-content');
  const imgCount = p.imageCount || 0;
  let galleryHtml = '';

  if (imgCount > 0) {
    galleryHtml = `<div class="gallery-container">
      <div class="gallery-main">
        <button class="gallery-nav gallery-prev" onclick="prevImage('${productKey}')">‹</button>
        <img id="gallery-img" src="img/${productKey}/1.jpg" alt="${p.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22><rect fill=%22%23eee%22 width=%22400%22 height=%22300%22/><text x=%22200%22 y=%22150%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2220%22>No Image</text></svg>'">
        <button class="gallery-nav gallery-next" onclick="nextImage('${productKey}')">›</button>
      </div>
      <div class="gallery-dots" id="gallery-dots"></div>
    </div>`;
  } else {
    galleryHtml = `<div class="gallery-container">
      <div class="gallery-main no-images">
        <div class="gallery-placeholder">
          <span>${p.emoji}</span>
          <p>Add product photos</p>
          <small>Put images in <code>img/${productKey}/</code> folder (1.jpg, 2.jpg...)</small>
        </div>
      </div>
    </div>`;
  }

  let featuresHtml = p.features.map(f => `<li>${f}</li>`).join('');

  container.innerHTML = `
    <div class="product-detail">
      ${galleryHtml}
      <div class="product-detail-info">
        <h2>${p.emoji} ${p.title}</h2>
        <p class="pd-desc">${p.description}</p>
        <h4>What I Source:</h4>
        <ul class="pd-features">${featuresHtml}</ul>
        <div class="pd-cta">
          <p>Interested? Let's talk about your requirements.</p>
          <a href="#" class="btn btn-primary" data-page="contact">Contact Me</a>
          <a href="https://wa.me/85255894516" target="_blank" class="btn btn-whatsapp">💬 WhatsApp</a>
        </div>
      </div>
    </div>
  `;

  // Bind CTA buttons
  container.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      showPage(el.dataset.page);
    });
  });

  // Reset gallery state
  currentImageIndex = 1;
  currentProductKey = productKey;
  updateGallery(productKey, imgCount);

  // Bind imageCount for prev/next
  window.__imgCount = imgCount;
}

// Gallery state
let currentImageIndex = 1;
let currentProductKey = null;

function updateGallery(key, count) {
  if (count === 0) return;
  const img = document.getElementById('gallery-img');
  if (img) {
    img.src = `img/${key}/${currentImageIndex}.jpg?t=${Date.now()}`;
  }
  const dots = document.getElementById('gallery-dots');
  if (dots) {
    dots.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      const dot = document.createElement('span');
      dot.className = 'gallery-dot' + (i === currentImageIndex ? ' active' : '');
      dot.onclick = () => { currentImageIndex = i; updateGallery(key, count); };
      dots.appendChild(dot);
    }
  }
}

function prevImage(key) {
  const count = window.__imgCount || PRODUCTS[key]?.imageCount || 0;
  if (count === 0) return;
  currentImageIndex = currentImageIndex <= 1 ? count : currentImageIndex - 1;
  updateGallery(key, count);
}

function nextImage(key) {
  const count = window.__imgCount || PRODUCTS[key]?.imageCount || 0;
  if (count === 0) return;
  currentImageIndex = currentImageIndex >= count ? 1 : currentImageIndex + 1;
  updateGallery(key, count);
}

// Product card clicks
document.querySelectorAll('[data-product]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const product = el.dataset.product;
    buildProductDetail(product);
    showPage('product-detail');
  });
});

// ========== Contact Form ==========
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  // 如果还没配 formspree，阻止默认提交
  if (this.action.includes('formspree.io/f/your-form-id')) {
    e.preventDefault();
    alert('📧 Form is ready! Configure your form backend (Formspree, EmailJS, or similar) in index.html action attribute.\n\nMeanwhile, reach me directly:\nEmail: trade@xarvanta.com\nWhatsApp: +852 5589 4516');
  }
});

// ========== Keyboard Gallery Nav ==========
document.addEventListener('keydown', e => {
  if (document.getElementById('page-product-detail').classList.contains('active')) {
    if (e.key === 'ArrowLeft') prevImage(currentProductKey);
    if (e.key === 'ArrowRight') nextImage(currentProductKey);
  }
});

// ========== Touch Swipe for Gallery ==========
let touchStartX = 0;
let touchEndX = 0;
document.addEventListener('touchstart', e => {
  if (document.getElementById('page-product-detail').classList.contains('active')) {
    touchStartX = e.changedTouches[0].screenX;
  }
});
document.addEventListener('touchend', e => {
  if (document.getElementById('page-product-detail').classList.contains('active')) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }
});
function handleSwipe() {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextImage(currentProductKey);
    else prevImage(currentProductKey);
  }
}
