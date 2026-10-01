# PLAN — Barbearia Freitas

Plano de conteúdo e direção visual (etapa 2). Nada aqui está implementado ainda.
Todos os dados são **fictícios** (projeto de portfólio). O rodapé do site deixa isso explícito.

---

## 1. Marca

- **Nome:** Barbearia Freitas
- **Slogan:** "Tradição no corte, cuidado no detalhe."
- **Tom de voz:** algo amigavel, aonde os amigos vão pra cortar cabelo e conversar
- **Posicionamento:** barbearia de bairro com acabamento premium. Clássica no ofício, moderna no atendimento.
- **Fundação (fictícia):** 2014, pelo barbeiro Rafael Freitas.

## 2. Direção visual

**Conceito:** "clássico moderno". Fundo escuro e quente, tipografia serifada nos títulos, detalhes em latão (dourado envelhecido), muito respiro entre as seções e fotos em tons quentes.

### Paleta (variáveis CSS)

| Token | Cor | Uso |
|---|---|---|
| `--cor-fundo` | `#141210` | fundo da página |
| `--cor-superficie` | `#1E1B18` | cards e seções alternadas |
| `--cor-borda` | `#2E2A25` | divisórias e bordas de cards |
| `--cor-texto` | `#F2EDE4` | texto principal |
| `--cor-texto-suave` | `#B8AFA3` | textos secundários e legendas |
| `--cor-destaque` | `#C9A25F` | latão: botões, preços, detalhes |
| `--cor-destaque-hover` | `#DDB774` | hover dos botões |
| `--cor-whatsapp` | `#25D366` | botão flutuante (ícone em `#0B2E17` para manter o contraste) |

- Os pares de texto e fundo ficam acima de AA (texto principal ≈ 15:1, texto suave ≈ 8:1, destaque sobre o fundo ≈ 8:1).
- Os botões principais usam fundo `--cor-destaque` com texto `--cor-fundo`.
- O contraste vai ser conferido com ferramenta na etapa 8.

### Tipografia (Google Fonts, com `display=swap`)

- **Títulos:** DM Serif Display. Serifada e elegante, com ar de barbearia tradicional.
- **Texto e interface:** Manrope (400, 600, 700). Limpa e muito legível no celular.
- **Escala fluida com `clamp()`:**
  - h1: de 2.5rem até 4.5rem
  - h2: de 2rem até 3rem
  - h3: 1.25rem
  - corpo: 1rem (1.0625rem a partir de 768px)
  - altura de linha: 1.6 no corpo e 1.1 nos títulos

### Elementos visuais

- **Fio decorativo:** uma linha fina dourada com um pequeno losango no centro, acima de cada h2. É a "assinatura" visual do site.
- **Cards:** cantos pouco arredondados (6px), borda de 1px em `--cor-borda`, sem sombras pesadas.
- **Ícones:** SVG inline, traço fino (estilo Lucide), na cor do destaque.
- **Fotos:** tons quentes e contraste alto. No hero, a foto recebe um gradiente escuro por cima para garantir a leitura do texto.

### Espaçamento e layout

- Escala de espaço: 4, 8, 12, 16, 24, 32, 48, 64, 96px (`--espaco-1` a `--espaco-9`).
- Conteúdo com largura máxima de 1120px e margem lateral de 16px no celular e 24px a partir de 768px.
- Espaço vertical das seções: 64px no celular e 96px no desktop.
- Pontos de quebra: 768px (tablet) e 1024px (desktop).

### Movimento

- Seções e cards aparecem com fade e subida de 16px, uma vez só, ao entrar na tela (IntersectionObserver).
- Com `prefers-reduced-motion`, tudo aparece já no lugar, sem animação.
- No hover, botões e cards mudam de cor ou borda em 150ms.

---

## 3. Estrutura da página

Ordem das seções (âncoras entre parênteses):

1. **Cabeçalho fixo:** logo em texto, menu (Serviços, Sobre, Equipe, Galeria, Contato) e o botão "Agendar". No celular, o menu vira hambúrguer.
2. **Hero** (`#inicio`)
3. **Serviços e preços** (`#servicos`)
4. **Sobre e diferenciais** (`#sobre`)
5. **Equipe** (`#equipe`)
6. **Galeria** (`#galeria`)
7. **Depoimentos** (`#depoimentos`)
8. **Horários e localização** (`#contato`)
9. **Perguntas frequentes** (`#faq`)
10. **Chamada final:** faixa com o botão de agendar.
11. **Rodapé**
12. **Botão flutuante do WhatsApp:** fixo no canto inferior direito, em todas as telas.

---

## 4. Conteúdo por seção

### Hero

- **Selo pequeno:** "Desde 2014 · Belo Horizonte, MG"
- **h1:** "Tradição no corte, cuidado no detalhe."
- **Subtítulo:** "Corte, barba e acabamento feitos com calma, por barbeiros que conhecem o seu estilo. Agende pelo WhatsApp em menos de um minuto."
- **Botão principal:** "Agendar pelo WhatsApp"
- **Botão secundário:** "Ver serviços e preços" (leva a `#servicos`)
- **Status ao vivo:** "Aberto agora · fecha às 20h" ou "Fechado · abre terça às 9h"

### Serviços e preços

- **h2:** "Serviços e preços"
- **Introdução:** "Preços fixos, sem surpresa. Todos os serviços incluem lavagem e finalização."
- **Botão em cada card:** "Agendar este serviço" (abre o WhatsApp com o nome do serviço na mensagem).

| Serviço | Descrição curta | Duração | Preço |
|---|---|---|---|
| Corte | Máquina e tesoura, do clássico ao degradê. | 40 min | R$ 50 |
| Barba | Toalha quente, navalha e balm hidratante. | 30 min | R$ 40 |
| Corte + Barba | O combo completo, com desconto. | 70 min | R$ 80 |
| Barboterapia | Barba com vapor de ozônio, esfoliação e massagem facial. | 45 min | R$ 55 |
| Corte infantil | Até 12 anos, com paciência de sobra. | 30 min | R$ 40 |
| Acabamento (pezinho) | Contorno e nuca entre um corte e outro. | 15 min | R$ 20 |
| Sobrancelha | Alinhamento na navalha ou na pinça. | 10 min | R$ 20 |
| Platinado / luzes | Descoloração com tonalização. Inclui avaliação. | 120 min | a partir de R$ 120 |

- **Destaque:** "Corte + Barba" leva o selo "Mais pedido".

### Sobre e diferenciais

- **h2:** "Barbearia de bairro, padrão de alto nível"
- **Texto:** "A Freitas nasceu em 2014, quando o Rafael transformou uma cadeira alugada num espaço próprio na Savassi. A ideia continua a mesma: atendimento sem pressa, conversa boa e um corte que dura até a próxima visita."
- **4 diferenciais** (ícone e frase curta):
  - Hora marcada, sem fila
  - Produtos profissionais
  - Café e cerveja gelada por conta da casa
  - Wi-Fi e ar-condicionado

### Equipe

- **h2:** "Quem cuida de você"

| Nome | Função | Especialidade |
|---|---|---|
| Rafael Freitas | Fundador e barbeiro | Cortes clássicos e navalha |
| Diego Moura | Barbeiro | Degradês e desenhos |
| Lucas Andrade | Barbeiro | Barba e barboterapia |

- **Foto:** 1 retrato por barbeiro, no formato 4:5.

### Galeria

- **h2:** "Trabalhos recentes"
- **Fotos:** 6 em grade (2 colunas no celular, 3 no desktop), com espaço preparado para evitar que o layout pule.
- **Legenda opcional:** o nome do corte, por exemplo "Degradê navalhado".
- **Instagram:** um link no final, "Veja mais no Instagram".

### Depoimentos

- **h2:** "O que dizem os clientes"
- **3 depoimentos fictícios**, com primeiro nome e inicial e 5 estrelas:
  - "Corto aqui há 6 anos e nunca saí insatisfeito. O Rafael sabe exatamente o que eu quero." — Marcelo T.
  - "Levei meu filho de 5 anos e ele saiu querendo voltar. Paciência nota 10." — Juliana R.
  - "Agendei pelo WhatsApp em 1 minuto e fui atendido no horário. Raro hoje em dia." — André P.

### Horários e localização

- **h2:** "Horários e como chegar"
- **Coluna com o mapa:** iframe do Google Maps, carregado só quando aparece na tela (`loading="lazy"`), e o botão "Como chegar" (abre o Google Maps).
- **Coluna de informações:**
  - **Endereço:** Rua Antônio de Albuquerque, 850 — Savassi, Belo Horizonte/MG, 30112-010 (fictício).
  - **Referência:** "a duas quadras da Praça da Savassi".
  - **Horários:** Seg fechado · Ter a Sex 9h–20h · Sáb 8h–18h · Dom fechado. A linha do dia de hoje aparece destacada.
  - **WhatsApp:** (31) 90000-0000 (fictício).
  - **Pagamento:** Pix, débito, crédito e dinheiro.

> **Nota sobre o mapa:** para não apontar para um estabelecimento real, o iframe busca o **bairro** ("Savassi, Belo Horizonte"), não o número da rua.

### Perguntas frequentes

- **h2:** "Perguntas frequentes"
- **Formato:** `<details>`/`<summary>`, acessível sem precisar de JS.
- **Perguntas e respostas:**
  - **Preciso agendar?** — "Recomendamos. Encaixes acontecem, mas quem marca tem prioridade."
  - **Quanto tempo antes devo agendar?** — "Para sábados, de 2 a 3 dias. Nos outros dias, costuma ter horário no mesmo dia."
  - **Posso remarcar ou cancelar?** — "Pode, é só avisar pelo WhatsApp com 2 horas de antecedência."
  - **Atendem crianças?** — "Sim, a partir de 2 anos."
  - **Tem estacionamento?** — "Não temos estacionamento próprio, mas há um estacionamento conveniado a 50 m."

### Chamada final

- **Texto:** "Bora marcar o próximo corte?"
- **Botão:** "Agendar pelo WhatsApp"

### Rodapé

- **Conteúdo:** logo, endereço resumido, links para Instagram e WhatsApp, e o texto "© 2026 Barbearia Freitas".
- **Aviso:** "Projeto fictício desenvolvido para portfólio por Vinicius."
- **Créditos:** créditos das fotos.

---

## 5. WhatsApp

- **Número fictício:** `5531900000000`, guardado em `config.js`.
- **Mensagem padrão:** "Olá! Vim pelo site e gostaria de agendar um horário."
- **Mensagem por serviço:** "Olá! Vim pelo site e gostaria de agendar: *{serviço}*. Qual o próximo horário disponível?"
- **Link:** os links são montados em JS com `encodeURIComponent`. No HTML, cada botão já vem com um `href` padrão, então o agendamento funciona mesmo sem JS.

## 6. Status "Aberto agora"

- **Fuso:** o cálculo usa sempre o horário de Brasília (`America/Sao_Paulo`, via `Intl.DateTimeFormat`), não o relógio de quem está visitando.
- **Estados possíveis:**
  - "Aberto agora · fecha às HHh"
  - "Abre hoje às HHh"
  - "Fechado · abre {dia} às HHh"
- **Fonte dos dados:** os horários vêm de `config.js`.

## 7. Formato do `js/config.js`

```js
const CONFIG = {
  nome: "Barbearia Freitas",
  whatsapp: "5531900000000",
  telefoneExibicao: "(31) 90000-0000",
  instagram: "https://instagram.com/",
  endereco: {
    linha: "Rua Antônio de Albuquerque, 850 — Savassi",
    cidade: "Belo Horizonte/MG",
    cep: "30112-010",
    buscaMapa: "Savassi, Belo Horizonte",
  },
  // 0 = domingo ... 6 = sábado; null = fechado
  horarios: {
    0: null,
    1: null,
    2: ["09:00", "20:00"],
    3: ["09:00", "20:00"],
    4: ["09:00", "20:00"],
    5: ["09:00", "20:00"],
    6: ["08:00", "18:00"],
  },
  servicos: [
    { nome: "Corte", descricao: "...", duracao: 40, preco: 50, destaque: false },
    // ...
  ],
};
```

- **Seções renderizadas por JS a partir do `config.js`:** a lista de serviços, a tabela de horários e o status.
- **HTML estático:** todo o resto.
- **SEO:** a lista de serviços fica também no HTML estático, para o Google ler.
- **Divisão de responsabilidades:** o JS só preenche preços e links. Para evitar duplicar dados, o `config.js` é a fonte da verdade e há uma verificação simples na etapa 9.

## 8. Imagens

- **Origem:** Unsplash ou Pexels (licença livre), com crédito no rodapé.
- **Formato e tamanhos:** WebP, em 2 tamanhos (`srcset`).
  - hero: 1920 e 960px de largura
  - galeria: 800 e 400px
  - equipe: 600 e 300px
- **Lista necessária:**
  - 1 foto do hero (barbeiro trabalhando, luz quente)
  - 3 retratos da equipe
  - 6 fotos da galeria
  - 1 imagem para compartilhamento em redes, de 1200×630
- **Até as fotos finais chegarem:** blocos de cor com a proporção certa, para o layout não pular.

## 9. SEO e compartilhamento

- **title:** "Barbearia Freitas | Corte e barba na Savassi, BH"
- **description:** "Corte, barba e barboterapia na Savassi, em Belo Horizonte. Preços fixos, hora marcada e agendamento rápido pelo WhatsApp."
- **Prévia em redes:** tags Open Graph e Twitter Card com a imagem de 1200×630.
- **Dados estruturados:** JSON-LD do tipo `BarberShop`, com nome, endereço, telefone, horários e faixa de preço "$$".
- **Ícone da aba:** monograma "BF" em SVG.

## 10. Critérios de pronto (para as próximas etapas)

- Sem rolagem horizontal em 375, 768 e 1440px.
- Navegação completa pelo teclado, com foco visível.
- Lighthouse com nota 90 ou mais em Performance, Acessibilidade, Boas práticas e SEO.
- Todos os botões de agendamento abrem o WhatsApp com a mensagem correta.
- O status "Aberto agora" está correto em pelo menos 4 cenários simulados: aberto, antes de abrir, depois de fechar e domingo.
