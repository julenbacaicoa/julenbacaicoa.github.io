(function () {
  function enhanceCodeBlocks() {
    const blocks = document.querySelectorAll('.highlighter-rouge, .highlight');
    blocks.forEach(block => {
      if (block.dataset.enhanced) return; // evitar duplicados
      block.dataset.enhanced = "true";

      // Crear barra de título
      const titleBar = document.createElement('div');
      titleBar.className = 'code-title';
      titleBar.innerHTML = `
        <span>Snippet</span>
        <button class="code-copy-btn">Copiar</button>
      `;

      // Insertar título antes del <pre>
      const pre = block.querySelector('pre');
      if (pre) {
        block.insertBefore(titleBar, pre);
      }

      // Acción del botón
      const btn = titleBar.querySelector('.code-copy-btn');
      btn.addEventListener('click', () => {
        const codeEl = block.querySelector('pre, code');
        const text = codeEl ? (codeEl.innerText || codeEl.textContent) : '';
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = '✓ Copiado';
          setTimeout(() => btn.textContent = 'Copiar', 1500);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceCodeBlocks);
  } else {
    enhanceCodeBlocks();
  }
})();
