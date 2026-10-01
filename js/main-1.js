/* ==========================================================================
   Barbearia Freitas — main.js
   Depende de js/config.js (carregado antes).
   ========================================================================== */

const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

/* --------------------------------------------------------------------------
   Utilitários
   -------------------------------------------------------------------------- */

/** "09:00" -> 540 (minutos desde 0h) */
function paraMinutos(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

/** "09:00" -> "9h", "09:30" -> "9h30" */
function formatarHora(hora) {
  const [h, m] = hora.split(":").map(Number);
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

/** 120 -> "R$ 120" */
function formatarPreco(valor) {
  return `R$ ${valor.toLocaleString("pt-BR")}`;
}

/** Monta o link do WhatsApp com a mensagem já preenchida */
function linkWhatsApp(servico) {
  const mensagem = servico
    ? CONFIG.mensagens.servico.replace("{servico}", servico)
    : CONFIG.mensagens.padrao;
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/**
 * Dia da semana (0–6) e minutos desde 0h no fuso da barbearia,
 * independentemente do fuso de quem está visitando.
 */
function agoraNoFuso(data = new Date()) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: CONFIG.fusoHorario,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(data);

  const valor = (tipo) => partes.find((p) => p.type === tipo).value;
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(valor("weekday"));

  return { dia, minutos: Number(valor("hour")) * 60 + Number(valor("minute")) };
}

/* --------------------------------------------------------------------------
   Status "Aberto agora"
   -------------------------------------------------------------------------- */

/**
 * Recebe { dia, minutos } e devolve { aberto, texto }.
 * Função pura: facilita testar cenários (aberto, antes de abrir, etc.).
 */
function calcularStatus({ dia, minutos }) {
  const hoje = CONFIG.horarios[dia];

  if (hoje) {
    const abre = paraMinutos(hoje[0]);
    const fecha = paraMinutos(hoje[1]);

    if (minutos >= abre && minutos < fecha) {
      return { aberto: true, texto: `Aberto agora · fecha às ${formatarHora(hoje[1])}` };
    }
    if (minutos < abre) {
      return { aberto: false, texto: `Fechado · abre hoje às ${formatarHora(hoje[0])}` };
    }
  }

  // Procura o próximo dia com expediente
  for (let i = 1; i <= 7; i++) {
    const proximoDia = (dia + i) % 7;
    const horario = CONFIG.horarios[proximoDia];
    if (horario) {
      const quando = i === 1 ? "amanhã" : DIAS[proximoDia];
      return { aberto: false, texto: `Fechado · abre ${quando} às ${formatarHora(horario[0])}` };
    }
  }

  return { aberto: false, texto: "Fechado" };
}

function atualizarStatus() {
  const elemento = document.querySelector("[data-status]");
  if (!elemento) return;

  const { aberto, texto } = calcularStatus(agoraNoFuso());
  elemento.textContent = texto;
  elemento.dataset.estado = aberto ? "aberto" : "fechado";
  elemento.hidden = false;
}

/* --------------------------------------------------------------------------
   Dados do config.js na página
   -------------------------------------------------------------------------- */

function aplicarLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = linkWhatsApp(link.dataset.servico);
  });

  document.querySelectorAll("[data-telefone]").forEach((el) => {
    el.textContent = CONFIG.telefoneExibicao;
  });

  document.querySelectorAll("[data-instagram]").forEach((link) => {
    link.href = CONFIG.instagram;
  });

  const busca = encodeURIComponent(CONFIG.endereco.buscaMapa);

  const mapa = document.querySelector("[data-mapa]");
  if (mapa) mapa.src = `https://www.google.com/maps?q=${busca}&output=embed`;

  const comoChegar = document.querySelector("[data-como-chegar]");
  if (comoChegar) comoChegar.href = `https://www.google.com/maps/dir/?api=1&destination=${busca}`;
}

function aplicarServicos() {
  CONFIG.servicos.forEach((servico) => {
    const botao = document.querySelector(`.servico__agendar[data-servico="${CSS.escape(servico.nome)}"]`);
    const card = botao?.closest(".servico");
    if (!card) return;

    const preco = card.querySelector(".servico__preco");
    if (preco) {
      preco.value = servico.preco;
      preco.textContent = formatarPreco(servico.preco);
      if (servico.aPartirDe) {
        const prefixo = document.createElement("small");
        prefixo.textContent = "a partir de ";
        preco.prepend(prefixo);
      }
    }

    const duracao = card.querySelector(".servico__duracao");
    if (duracao) duracao.textContent = `${servico.duracao} min`;
  });
}

function aplicarHorarios() {
  const tabela = document.querySelector("[data-horarios]");
  if (!tabela) return;

  const { dia: hoje } = agoraNoFuso();

  tabela.querySelectorAll("tr[data-dia]").forEach((linha) => {
    const dia = Number(linha.dataset.dia);
    const horario = CONFIG.horarios[dia];
    const celula = linha.querySelector("td");

    if (celula) {
      celula.textContent = horario
        ? `${formatarHora(horario[0])}–${formatarHora(horario[1])}`
        : "Fechado";
    }

    const ehHoje = dia === hoje;
    linha.classList.toggle("hoje", ehHoje);
    if (ehHoje) {
      linha.setAttribute("aria-current", "date");
    } else {
      linha.removeAttribute("aria-current");
    }
  });
}

/* --------------------------------------------------------------------------
   Menu do celular
   -------------------------------------------------------------------------- */

function iniciarMenu() {
  const botao = document.querySelector(".menu-botao");
  const menu = document.getElementById("menu-principal");
  if (!botao || !menu) return;

  const rotulo = botao.querySelector(".visualmente-oculto");

  const definir = (aberto) => {
    botao.setAttribute("aria-expanded", String(aberto));
    if (rotulo) rotulo.textContent = aberto ? "Fechar menu" : "Abrir menu";
  };

  botao.addEventListener("click", () => {
    definir(botao.getAttribute("aria-expanded") !== "true");
  });

  // Fecha ao escolher um link
  menu.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) definir(false);
  });

  // Fecha com Esc e devolve o foco ao botão
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
      definir(false);
      botao.focus();
    }
  });

  // Fecha ao clicar fora do cabeçalho
  document.addEventListener("click", (evento) => {
    if (!evento.target.closest(".cabecalho")) definir(false);
  });

  // No desktop o menu fica sempre visível: garante o estado fechado
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (mq) => {
    if (mq.matches) definir(false);
  });
}

/* --------------------------------------------------------------------------
   Destaque da seção atual no menu
   -------------------------------------------------------------------------- */

function iniciarMenuAtivo() {
  const links = [...document.querySelectorAll(".menu__link")];
  const secoes = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !secoes.length) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        links.forEach((link) => {
          const ativo = link.getAttribute("href") === `#${entrada.target.id}`;
          if (ativo) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    // Considera "atual" a seção que cruza a faixa central da tela
    { rootMargin: "-45% 0px -50% 0px" }
  );

  secoes.forEach((secao) => observador.observe(secao));
}

/* --------------------------------------------------------------------------
   Animação ao rolar
   -------------------------------------------------------------------------- */

function iniciarRevelar() {
  if (!("IntersectionObserver" in window)) return;

  const alvos = document.querySelectorAll(
    ".cabecalho-secao, .servicos > li, .sobre__texto, .diferencial, .barbeiro, .galeria__item, .depoimento, .contato__mapa, .contato__info, .faq, .chamada__interno"
  );

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("revelado");
        observador.unobserve(entrada.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );

  alvos.forEach((alvo) => {
    alvo.classList.add("revelar");
    observador.observe(alvo);
  });
}

/* --------------------------------------------------------------------------
   Imagens ausentes
   Fotos que ainda não estão na pasta img/ são escondidas: aparece o fundo
   reservado, e não o ícone de imagem quebrada.
   -------------------------------------------------------------------------- */

function esconderImagensAusentes() {
  document.querySelectorAll(".imagem-reserva > img, .logo__imagem").forEach((img) => {
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

/* --------------------------------------------------------------------------
   Início
   -------------------------------------------------------------------------- */

esconderImagensAusentes();
aplicarLinks();
aplicarServicos();
aplicarHorarios();
atualizarStatus();
iniciarMenu();
iniciarMenuAtivo();
iniciarRevelar();

// Mantém o status e o dia destacado corretos com a página aberta
setInterval(() => {
  atualizarStatus();
  aplicarHorarios();
}, 60 * 1000);
