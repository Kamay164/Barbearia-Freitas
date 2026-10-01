/* ==========================================================================
   Barbearia Freitas — config.js
   Fonte única dos dados do negócio. Para mudar telefone, preços, endereço
   ou horários, altere SOMENTE este arquivo: o main.js atualiza a página.
   (Dados fictícios — projeto de portfólio.)
   ========================================================================== */

const CONFIG = {
  nome: "Barbearia Freitas",

  // Número com DDI + DDD, só dígitos (usado nos links do WhatsApp)
  whatsapp: "5531900000000",
  telefoneExibicao: "(31) 90000-0000",

  instagram: "https://instagram.com/",

  endereco: {
    linha: "Rua Antônio de Albuquerque, 850 — Savassi",
    cidade: "Belo Horizonte/MG",
    cep: "30112-010",
    // O mapa busca o bairro, não o número, para não apontar um local real
    buscaMapa: "Savassi, Belo Horizonte",
  },

  // Fuso usado no status "Aberto agora" (independe do relógio do visitante)
  fusoHorario: "America/Sao_Paulo",

  // 0 = domingo ... 6 = sábado; null = fechado. Formato "HH:MM".
  horarios: {
    0: null,
    1: null,
    2: ["09:00", "20:00"],
    3: ["09:00", "20:00"],
    4: ["09:00", "20:00"],
    5: ["09:00", "20:00"],
    6: ["08:00", "18:00"],
  },

  mensagens: {
    padrao: "Olá! Vim pelo site e gostaria de agendar um horário.",
    // {servico} é trocado pelo nome do serviço
    servico: "Olá! Vim pelo site e gostaria de agendar: *{servico}*. Qual o próximo horário disponível?",
  },

  // "nome" precisa ser igual ao data-servico do botão no index.html
  servicos: [
    { nome: "Corte", duracao: 40, preco: 50 },
    { nome: "Barba", duracao: 30, preco: 40 },
    { nome: "Corte + Barba", duracao: 70, preco: 80 },
    { nome: "Barboterapia", duracao: 45, preco: 55 },
    { nome: "Corte infantil", duracao: 30, preco: 40 },
    { nome: "Acabamento (pezinho)", duracao: 15, preco: 20 },
    { nome: "Sobrancelha", duracao: 10, preco: 20 },
    { nome: "Platinado / luzes", duracao: 120, preco: 120, aPartirDe: true },
  ],
};
