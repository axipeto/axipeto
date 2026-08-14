# Axípeto — Site Institucional

> Da dispersão ao eixo.

Site institucional da **Axípeto**, agência de marketing que atua como o eixo centrípeto
da estratégia digital dos seus clientes — reunindo branding, performance, conteúdo e dados
em um único centro.

## Stack

- HTML estático (single page)
- [Tailwind CSS](https://tailwindcss.com) via CDN, com design tokens customizados
- Google Fonts: `Syne` (display), `Plus Jakarta Sans` (corpo), `JetBrains Mono` (labels)
- Material Symbols Outlined (ícones)
- Sem build step — basta abrir `index.html`

## Estrutura

```
.
├── index.html                  # Página única
├── DESIGN.md                   # Design system "Kinetic Axis" (tokens + arquitetura)
├── assets/
│   └── img/
│       ├── hero-rings.jpg      # Background do hero (círculos concêntricos)
│       ├── brand/              # Logo, wordmark, marca, favicons
│       └── clients/            # Logos de clientes (marquee)
├── .nojekyll                   # Desliga o Jekyll no GitHub Pages
└── .gitignore
```

## Rodando localmente

```bash
python3 -m http.server 8000
```

Depois abra <http://localhost:8000>.

## Deploy — GitHub Pages

1. Suba o repositório para o GitHub.
2. **Settings → Pages → Source: Deploy from a branch**
3. Branch `main`, pasta `/ (root)` → **Save**
4. O site fica disponível em `https://<usuario>.github.io/<repo>/`

Para domínio próprio, crie um arquivo `CNAME` na raiz com o domínio
(ex.: `axipeto.com.br`) e configure o DNS apontando para o GitHub Pages.

## Design tokens

Definidos inline no `<script>` de configuração do Tailwind em `index.html`.

| Token | Valor | Uso |
|---|---|---|
| `surface` | `#FFF9EF` | Fundo principal (Warm Paper) |
| `surface-alt` | `#F6EDDC` | Containers tonais |
| `accent` | `#FEB700` | Amber Gold da marca |
| `spark` | `#00D7FE` | Destaque ciano |
| `ink` | `#1F1B13` | Texto principal |
| `ink-muted` | `#7F7668` | Texto secundário |

## Pendências

- [ ] Conectar o formulário de contato a um backend/serviço
- [ ] Acordeão da metodologia interativo (hoje o passo 02 está fixo aberto)
- [ ] Menu mobile (a navegação some abaixo de `md`)
- [ ] Páginas de Privacidade e Termos (links no rodapé apontam para `#`)
- [ ] URLs reais de LinkedIn e Instagram
- [ ] Logos de clientes faltantes: Selva, Kaimbe, Mar Produções, Carvalho Distribuições, Editora Formar
- [ ] Seções previstas no `DESIGN.md` ainda não implementadas: roda de serviços de 6 blocos,
      cases InPeace/UpCities com tabs, citação de abertura, canvas interativo no hero
- [ ] Trocar o Tailwind CDN por build local antes de escalar

## Licença

Todos os direitos reservados © Axípeto.
