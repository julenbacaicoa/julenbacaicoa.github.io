document.addEventListener('DOMContentLoaded', function () {
  const blocks = document.querySelectorAll('.page__content .highlighter-rouge');

  blocks.forEach(block => {
    if (block.querySelector('.code-header')) return;

    // Busca un título inmediatamente antes (línea con {.code-title})
    let titleText = 'Code';
    const prev = block.previousElementSibling;
    if (prev && prev.classList.contains('code-title')) {
      titleText = prev.textContent.trim();
      // si no quieres que se vea ese título duplicado, lo ocultas:
      prev.style.display = 'none';
    }

    // Crea la barra
    const header = document.createElement('div');
    header.className = 'code-header';
    header.innerHTML = `<span>${titleText}</span><button class="code-copy-btn" type="button">Copy</button>`;
    block.insertBefore(header, block.firstChild);

    // Acción del botón copiar
    const btn = header.querySelector('.code-copy-btn');
    btn.addEventListener('click', () => {
      const codeEl = block.querySelector('pre, code');
      const text = codeEl ? (codeEl.innerText || codeEl.textContent) : '';
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '✓ Copied';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1400);
      });
    });
  });
});
