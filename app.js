/* ====== App JS ====== */

// Products list
const prodList = document.getElementById('prodList');
const detail = document.getElementById('detail');
const detailContent = document.getElementById('detailContent');

function renderProducts(target) {
  target.innerHTML = PRODS.map(p => `
    <a href="#" class="prod-card" onclick="showDetail('${p.key}')">
      <div class="prod-card-img" style="background:${p.bg}">
        <img src="img/${p.key}/cover.jpg" alt="${p.title}" onerror="this.style.display='none';this.nextElementSibling.textContent='${p.emoji}';this.nextElementSibling.style.display='flex'">
        <div class="prod-card-emoji" style="display:none;font-size:2rem">${p.emoji}</div>
      </div>
      <div class="prod-card-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>
      <span class="prod-card-arrow">›</span>
    </a>
  `).join('');
}
renderProducts(prodList);

// Detail 
let curKey = null, curIdx = 1, curCount = 0;

function showDetail(key) {
  event.preventDefault();
  const p = PRODS.find(x => x.key === key);
  if (!p) return;
  curKey = key; curIdx = 1; curCount = p.count || 0;

  let galHtml = '';
  if (curCount > 0) {
    let dots = '';
    for(let i=1;i<=curCount;i++) dots += `<div class="gal-dot${i===1?' active':''}" onclick="goDot(${i})"></div>`;
    galHtml = `
      <div class="gallery">
        <img id="galImg" src="img/${key}/1.jpg" alt="${p.title}" />
        <button class="gal-left" onclick="galPrev()">‹</button>
        <button class="gal-right" onclick="galNext()">›</button>
        <div class="gal-dots">${dots}</div>
      </div>`;
  } else {
    galHtml = `
      <div class="gallery" style="display:flex;align-items:center;justify-content:center;aspect-ratio:auto;padding:60px 20px;background:${p.bg}">
        <div style="text-align:center">
          <div style="font-size:64px;margin-bottom:8px">${p.emoji}</div>
          <p style="color:#999;font-size:0.9rem">Add photos</p>
          <p style="color:#bbb;font-size:0.78rem">img/${key}/1.jpg, 2.jpg...</p>
        </div>
      </div>`;
  }

  detailContent.innerHTML = `
    <div class="detail-main">
      ${galHtml}
      <div class="detail-info">
        <h2>${p.emoji} ${p.title}</h2>
        <p>${p.desc}</p>
        <ul class="detail-feats">${p.list.map(f => `<li>${f}</li>`).join('')}</ul>
        <div class="detail-cta">
          <p>Interested? Let's talk.</p>
          <a href="https://wa.me/85255894516" target="_blank" class="btn btn-wa">💬 WhatsApp Me</a>
          <a href="mailto:trade@xarvanta.com" class="btn btn-outline">📧 trade@xarvanta.com</a>
        </div>
      </div>
    </div>`;

  // Hide product list, show detail
  document.querySelector('.products').style.display = 'none';
  document.querySelector('.about').style.display = 'none';
  detail.style.display = 'block';
  window.scrollTo({top:0,behavior:'smooth'});
}

function hideDetail() {
  event.preventDefault();
  detail.style.display = 'none';
  document.querySelector('.products').style.display = 'block';
  document.querySelector('.about').style.display = 'block';
  window.scrollTo({top:document.querySelector('.products').offsetTop - 70,behavior:'smooth'});
}

// Gallery
function updateGal() {
  const img = document.getElementById('galImg');
  if (img) img.src = `img/${curKey}/${curIdx}.jpg?t=${Date.now()}`;
  document.querySelectorAll('.gal-dot').forEach((d,i) => d.classList.toggle('active', i+1 === curIdx));
}
function galPrev() { if(curCount) { curIdx = curIdx <= 1 ? curCount : curIdx-1; updateGal(); } }
function galNext() { if(curCount) { curIdx = curIdx >= curCount ? 1 : curIdx+1; updateGal(); } }
function goDot(i) { curIdx = i; updateGal(); }

// Keyboard
document.addEventListener('keydown', e => {
  if(detail.style.display === 'block') {
    if(e.key === 'ArrowLeft') galPrev();
    if(e.key === 'ArrowRight') galNext();
  }
});

// Touch
let tx = 0;
document.addEventListener('touchstart', e => {
  if(detail.style.display === 'block') tx = e.changedTouches[0].screenX;
});
document.addEventListener('touchend', e => {
  if(detail.style.display === 'block') {
    const diff = tx - e.changedTouches[0].screenX;
    if(Math.abs(diff) > 50) diff > 0 ? galNext() : galPrev();
  }
});

// Nav
function goHome() { event?.preventDefault(); location.reload(); }
function showProducts() { event?.preventDefault(); document.querySelector('.products').scrollIntoView({behavior:'smooth'}); }
function scrollToContact() { event?.preventDefault(); document.querySelector('.contact').scrollIntoView({behavior:'smooth'}); }

// Contact form — sends to Feishu webhook
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const form = this;
  const data = new FormData(form);

  const name = data.get('name') || '(no name)';
  const email = data.get('email') || '(no email)';
  const phone = data.get('phone') || '(not provided)';
  const category = data.get('category') || '(not selected)';
  const message = data.get('message') || '(empty)';

  const feishuMsg = `**📩 New Inquiry from xarvanta.com**\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Category:* ${category}\n*Message:* ${message}`;

  fetch('https://open.feishu.cn/open-apis/bot/v2/hook/a37d3028-bac8-4bcf-8586-3b192a48414a', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msg_type: 'text', content: { text: feishuMsg } })
  }).then(() => {
    alert('✅ Message sent! I will reply within 24 hours.');
  }).catch(() => {
    alert('✅ Message received! I will reply within 24 hours.\n\n(You can reach me now on WhatsApp: +852 5589 4516)');
  });
  form.reset();
});

// Fix nav scroll
document.querySelectorAll('.nav-right a').forEach(a => a.addEventListener('click', e => {
  // Allow default scroll behavior
}));
