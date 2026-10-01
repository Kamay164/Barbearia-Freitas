# Barbearia Freitas — Landing page

Projeto fictício de portfólio: landing page de uma barbearia. O visitante encontra contato/WhatsApp para agendar, serviços e preços, horários, mapa com endereço e demais informações.

## Stack e regras

- HTML, CSS e JavaScript puros. Sem frameworks, sem build, sem dependências.
- Idioma do site e dos textos: português do Brasil (`lang="pt-BR"`).
- Mobile-first: estilizar primeiro para 375px e ampliar com `min-width`.
- HTML semântico e acessível (landmarks, um `h1`, ordem lógica de títulos, `alt` em imagens, foco visível, contraste AA).
- Respeitar `prefers-reduced-motion`.
- Agendamento apenas por link do WhatsApp (`https://wa.me/<numero>?text=<mensagem>`).
- Mapa por iframe do Google Maps (sem chave de API), com `loading="lazy"`.

## Estrutura

```
index.html        página única
css/              estilos (base.css, depois um arquivo por responsabilidade)
js/               scripts (config.js com os dados do negócio, main.js)
img/              fotos do site em WebP, logo e ícones (nomes em img/LEIA-ME.txt)
img/originais/    fotos originais em alta resolução (fora do Git; fonte do script abaixo)
otimizar-imagens.py  gera os .webp de img/ a partir de img/originais/
assets/           outros recursos (fontes, ícones), se necessário
PLAN.md           plano de conteúdo e direção visual (etapa 2)
```

## Convenções

- Todos os dados do negócio (nome, telefone, preços, endereço, horários) ficam em `js/config.js`. Nunca duplicar esses valores no HTML ou em outros scripts.
- Cores, fontes e espaçamentos como variáveis CSS em `:root`.
- Classes em kebab-case, nomes descritivos (estilo BEM leve: `servicos__item`).
- Comentários só onde a intenção não for óbvia.
- Dados fictícios: usar telefone de exemplo claramente falso e endereço de exemplo.

## Como trabalhar

- Uma etapa por vez, seguindo a ordem combinada. Ao concluir, mostrar como verificar.
- Estilizar uma seção por vez para manter o contexto pequeno.
- Verificar em 375px, 768px e 1440px; sem rolagem horizontal.
- Commits pequenos, mensagem no imperativo, em português.
