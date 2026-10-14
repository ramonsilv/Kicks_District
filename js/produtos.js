// Catálogo: busca, filtro por categoria, ordenação e modal de detalhes.
(() => {
  const $ = (id) => document.getElementById(id);
  const grade = $('grade');
  if (!grade || !window.PRODUTOS) return;
  const q = $('busca'), cat = $('categoria'), ord = $('ordem'), vazio = $('vazio'), cont = $('contagem'), dlg = $('detalhe');
  const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  [...new Set(PRODUTOS.map((p) => p.categoria))].forEach((c) => cat.append(new Option(c, c)));

  function render() {
    const t = norm(q.value.trim());
    let lista = PRODUTOS.filter((p) => (!cat.value || p.categoria === cat.value) && (!t || norm(p.nome + ' ' + p.categoria).includes(t)));
    if (ord.value === 'az') lista = [...lista].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    // Quando houver "preco" nos dados, adicione aqui as ordenações por menor/maior preço.
    grade.replaceChildren(...lista.map((p) => KD.criarCard(p)));
    vazio.hidden = lista.length > 0;
    cont.textContent = lista.length + (lista.length === 1 ? ' modelo' : ' modelos');
  }
  function limpar() { q.value = ''; cat.value = ''; ord.value = 'original'; render(); q.focus(); }

  function abrir(id) {
    const p = PRODUTOS.find((x) => x.id === id);
    if (!p) return;
    $('d-img').src = p.img; $('d-img').alt = 'Tênis ' + p.nome;
    $('d-cat').textContent = p.categoria; $('d-nome').textContent = p.nome; $('d-desc').textContent = p.desc;
    dlg.showModal(); // Esc, foco preso e retorno do foco ao botão de origem são nativos do <dialog>
  }

  [q, cat, ord].forEach((c) => c.addEventListener('input', render));
  $('limpar').addEventListener('click', limpar);
  $('limpar-vazio').addEventListener('click', limpar);
  grade.addEventListener('click', (e) => { const a = e.target.closest('a[data-id]'); if (a) { e.preventDefault(); abrir(a.dataset.id); } });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

  const url = new URLSearchParams(location.search), c0 = url.get('cat');
  if (c0 && [...cat.options].some((o) => o.value === c0)) cat.value = c0;
  render();
  if (url.get('produto')) abrir(url.get('produto'));
})();
