/* ==========================================================================
   Barbearia Freitas — main.js
   ========================================================================== */

/**
 * Imagens que ainda não existem na pasta img/ são escondidas.
 * Assim aparece o fundo reservado (degradê), e não o ícone de imagem quebrada.
 * Quando o arquivo for colocado na pasta, a foto aparece sozinha.
 */
function esconderImagensAusentes() {
  const imagens = document.querySelectorAll(".imagem-reserva > img");

  imagens.forEach((img) => {
    const esconder = () => {
      img.hidden = true;
    };

    // A imagem pode ter falhado antes deste script rodar
    if (img.complete && img.naturalWidth === 0) {
      esconder();
    } else {
      img.addEventListener("error", esconder, { once: true });
    }
  });
}

esconderImagensAusentes();
