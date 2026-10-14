// Comportamentos compartilhados: menu, cabeçalho, ano, imagens com falha, destaques e carrossel.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };

  document.documentElement.classList.add('js');

  // Card de produto (usado também por produtos.js). Textos entram via textContent.
  window.KD = { criarCard(p) {
    const li = el('li', 'card'), img = el('img'), box = el('div'), a = el('a', 'btn ghost', 'Ver detalhes');
    img.src = p.img; img.alt = 'Tênis ' + p.nome; img.loading = 'lazy';
    a.href = 'produtos.html?produto=' + encodeURIComponent(p.id); a.dataset.id = p.id;
    box.append(el('span', 'tag', p.categoria), el('h3', '', p.nome), el('p', '', p.desc), a);
    li.append(img, box);
    return li;
  } };

  // Menu móvel
  const hd = $('.hd'), btn = $('.menu-btn'), nav = $('#menu');
  if (btn && nav) {
    const set = (aberto) => {
      nav.classList.toggle('aberto', aberto);
      btn.setAttribute('aria-expanded', String(aberto));
      btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    };
    btn.addEventListener('click', () => set(!nav.classList.contains('aberto')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('aberto')) { set(false); btn.focus(); } });
    matchMedia('(min-width: 721px)').addEventListener('change', () => set(false));
  }
  if (hd) addEventListener('scroll', () => hd.classList.toggle('rolou', scrollY > 10), { passive: true });

  $$('[data-ano]').forEach((e) => { e.textContent = new Date().getFullYear(); });
  document.addEventListener('error', (e) => { if (e.target.tagName === 'IMG') e.target.classList.add('falha'); }, true);

  // Destaques da home
  const dest = $('#destaques');
  if (dest && window.PRODUTOS) window.PRODUTOS.filter((p) => p.destaque).forEach((p) => dest.append(window.KD.criarCard(p)));

  // Carrossel
  const car = $('.car');
  if (!car) return;
  const tr = $('.car-tr', car), slides = $$('img', tr), dots = $('.car-dots', car), pb = $('.car-pause', car), n = slides.length;
  let i = 0, timer = null, pausado = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const bolinhas = slides.map((_, j) => {
    const b = el('button'); b.type = 'button';
    b.setAttribute('aria-label', `Ir para o slide ${j + 1} de ${n}`);
    b.addEventListener('click', () => { ir(j); pausar(true); });
    dots.append(b); return b;
  });
  function ir(k) {
    i = (k + n) % n;
    tr.style.transform = `translateX(${-100 * i}%)`;
    slides.forEach((s, j) => s.setAttribute('aria-hidden', String(j !== i)));
    bolinhas.forEach((b, j) => (j === i ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
  }
  function parar() { clearInterval(timer); timer = null; }
  function tocar() { if (!pausado && n > 1 && !timer) timer = setInterval(() => ir(i + 1), 6000); }
  function pausar(p) {
    pausado = p; pb.textContent = p ? 'Reproduzir' : 'Pausar';
    pb.setAttribute('aria-label', p ? 'Retomar apresentação automática' : 'Pausar apresentação automática');
    p ? parar() : tocar();
  }
  $('.prev', car).addEventListener('click', () => { ir(i - 1); pausar(true); });
  $('.next', car).addEventListener('click', () => { ir(i + 1); pausar(true); });
  pb.addEventListener('click', () => pausar(!pausado));
  car.addEventListener('mouseenter', parar); car.addEventListener('mouseleave', tocar);
  car.addEventListener('focusin', parar); car.addEventListener('focusout', tocar);
  car.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { ir(i - 1); pausar(true); }
    if (e.key === 'ArrowRight') { ir(i + 1); pausar(true); }
  });
  if (n < 2) $$('.car-nav, .car-ctl', car).forEach((e) => { e.hidden = true; });
  ir(0); pausar(pausado);
})();
