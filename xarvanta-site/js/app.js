/**
 * Xarvanta App — Mobile First
 */

// ========== Navigation ==========
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const page = el.dataset.page;
    showPage(page);
    navLinks.classList.remove('open');
  });
});

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-links a[data-page="${pageId}"]`);
  if (activeLink) activeLink.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== Render Products ==========
function renderProductCard(p) {
  return `
    <a href="#" class="product-card" data-key="${p.key}">
      <div class="product-card-img" style="background:${p.bg}">
        <img src="img/${p.key}/cover.jpg" alt="${p.title}" class="product-photo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="product-emoji-fallback"><span>${p.emoji}</span><small>Add photo</small></div>
      </div>
      <div class="product-card-body">
        <h3>${p.emoji} ${p.title}</h3>
        <p>${p.features.slice(0,3).join(' · ')}</p>
      </div>
    </a>`;
}

function renderProducts() {
  const homeGrid = document.getElementById('homeProducts');
  const productsGrid = document.getElementById('productsGrid');
  if (homeGrid) homeGrid.innerHTML = PRODUCTS.map(renderProductCard).join('');
  if (productsGrid) productsGrid.innerHTML = PRODUCTS.map(renderProductCard).join('');
}
renderProducts();

// ========== Product Detail ==========
let currentKey = null;
let currentIdx = 1;

document.querySelectorAll('[data-key]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const key = el.dataset.key;
    const p = PRODUCTS.find(x => x.key === key);
    if (!p) return;
    showProductDetail(p);
  });
});

function showProductDetail(p) {
  currentKey = p.key;
  currentIdx = 1;
  const count = p.imageCount || 0;

  const container = document.getElementById('product-detail-content');

  let galleryHtml = '';
  if (count > 0) {
    let dots = '';
    for (let i = 1; i <= count; i++) dots += `<span class="gallery-dot${i===1?' active':''}" data-idx="${i}"></span>`;
    galleryHtml = `
      <div class="gallery">
        <div class="gallery-main">
          <img id="galleryImg" src="img/${p.key}/1.jpg" alt="${p.title}" />
          <button class="gallery-nav-left" onclick="galleryPrev()">‹</button>
          <button class="gallery-nav-right" onclick="galleryNext()">›</button>
        </div>
        <div class="gallery-dots">${dots}</div>
      </div>`;
  } else {
    galleryHtml = `
      <div class="gallery">
        <div class="gallery-main no-img">
          <div style="text-align:center;padding:60px 20px">
            <div style="font-size:64px;margin-bottom:12px">${p.emoji}</div>
            <p style="color:#999">Add photos to <code>img/${p.key}/</code></p>
            <p style="color:#bbb;font-size:0.85rem">Name files: 1.jpg, 2.jpg, 3.jpg...</p>
          </div>
        </div>
      </div>`;
  }

  container.innerHTML = `
    <div class="product-detail">
      ${galleryHtml}
      <div class="product-detail-info">
        <h2>${p.emoji} ${p.title}</h2>
        <p class="pd-desc">${p.description}</p>
        <ul class="pd-features">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
        <div class="pd-cta">
          <p><strong>Interested?</strong> Let's talk about your requirements.</p>
          <a href="https://wa.me/85255894516" target="_blank" class="btn btn-whatsapp" style="width:100%;margin-bottom:8px">💬 WhatsApp Me</a>
          <a href="mailto:trade@xarvanta.com" class="btn btn-outline" style="width:100%">📧 trade@xarvanta.com</a>
        </div>
      </div>
    </div>`;

  showPage('product-detail');

  // Bind gallery dots
  document.querySelectorAll('.gallery-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      currentIdx = parseInt(dot.dataset.idx);
      updateGallery(p.key, count);
    });
  });

  // Keyboard
  window.__galleryKey = p.key;
  window.__galleryCount = count;
}

function updateGallery(key, count) {
  const img = document.getElementById('galleryImg');
  if (img) img.src = `img/${key}/${currentIdx}.jpg?t=${Date.now()}`;
  document.querySelectorAll('.gallery-dot').forEach(d => {
    d.classList.toggle('active', parseInt(d.dataset.idx) === currentIdx);
  });
}

function galleryPrev() {
  const key = window.__galleryKey;
  const count = window.__galleryCount;
  if (!key || !count) return;
  currentIdx = currentIdx <= 1 ? count : currentIdx - 1;
  updateGallery(key, count);
}

function galleryNext() {
  const key = window.__galleryKey;
  const count = window.__galleryCount;
  if (!key || !count) return;
  currentIdx = currentIdx >= count ? 1 : currentIdx + 1;
  updateGallery(key, count);
}

// Keyboard arrows
document.addEventListener('keydown', e => {
  if (document.getElementById('page-product-detail').classList.contains('active')) {
    if (e.key === 'ArrowLeft') galleryPrev();
    if (e.key === 'ArrowRight') galleryNext();
  }
});

// Touch swipe
let touchX = 0;
document.addEventListener('touchstart', e => {
  if (document.getElementById('page-product-detail').classList.contains('active')) {
    touchX = e.changedTouches[0].screenX;
  }
});
document.addEventListener('touchend', e => {
  if (document.getElementById('page-product-detail').classList.contains('active')) {
    const diff = touchX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) galleryNext();
      else galleryPrev();
    }
  }
});

// ========== Contact Form ==========
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  if (this.action.includes('your-form-id') || this.action === window.location.href) {
    e.preventDefault();
    const msg = "📧 Form ready! Configure a backend service (Formspree / EmailJS) to receive messages.\n\nMeanwhile, reach me directly:\nEmail: trade@xarvanta.com\nWhatsApp: +852 5589 4516";
    if (confirm(msg + '\n\nOpen WhatsApp now?')) {
      window.open('https://wa.me/85255894516', '_blank');
    }
  }
});
