// Validação do formulário. Sem serviço de envio configurado, NÃO simula envio.
(() => {
  const f = document.getElementById('form-contato');
  if (!f) return;
  const ENDPOINT = ''; // Cole aqui a URL de um serviço de formulários (ex.: Formspree). Vazio = envio não conectado.
  const status = document.getElementById('status'), btn = f.querySelector('[type=submit]');
  const regras = {
    nome: (v) => v.length >= 2 || 'Informe seu nome (mínimo 2 caracteres).',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Informe um e-mail válido, como nome@dominio.com.',
    assunto: (v) => v.length >= 3 || 'Informe o assunto.',
    mensagem: (v) => v.length >= 10 || 'Escreva uma mensagem com pelo menos 10 caracteres.'
  };
  const campos = Object.keys(regras);
  function validar(c) {
    const r = regras[c](f.elements[c].value.trim()), ok = r === true;
    f.elements[c].setAttribute('aria-invalid', String(!ok));
    document.getElementById('erro-' + c).textContent = ok ? '' : r;
    return ok;
  }
  campos.forEach((c) => f.elements[c].addEventListener('blur', () => validar(c)));

  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (btn.disabled) return;
    const ruins = campos.filter((c) => !validar(c));
    if (ruins.length) {
      status.textContent = `Corrija ${ruins.length} ${ruins.length > 1 ? 'campos' : 'campo'} antes de enviar.`;
      f.elements[ruins[0]].focus();
      return;
    }
    if (!ENDPOINT) { status.textContent = 'Dados validados, mas o envio ainda não está conectado a um serviço. Nenhuma mensagem foi enviada.'; return; }
    btn.disabled = true; status.textContent = 'Enviando…';
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(f))) });
      if (!r.ok) throw new Error(r.status);
      status.textContent = 'Mensagem enviada. Obrigado pelo contato!'; f.reset();
    } catch { status.textContent = 'Não foi possível enviar agora. Tente novamente mais tarde.'; }
    finally { btn.disabled = false; }
  });
})();
