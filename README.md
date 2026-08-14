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
├── index.html                  # Página principal
├── privacidade.html            # Política de Privacidade (LGPD)
├── termos.html                 # Termos de Uso
├── DESIGN.md                   # Design system "Kinetic Axis" (tokens + arquitetura)
├── assets/
│   ├── css/
│   │   ├── base.css            # Estilos compartilhados pelas 3 páginas
│   │   └── legal.css           # Tipografia das páginas de texto legal
│   ├── js/
│   │   └── tailwind-config.js  # Design tokens (compartilhado)
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

Definidos em `assets/js/tailwind-config.js`, carregado pelas três páginas.

| Token | Valor | Uso |
|---|---|---|
| `surface` | `#FFFFFF` | Fundo principal |
| `surface-alt` | `#FAFAFA` | Seções de contraste (cases, metodologia, rodapé) |
| `accent` | `#FEB700` | Amber Gold da marca |
| `spark` | `#00D7FE` | Destaque ciano |
| `ink` | `#1F1B13` | Texto principal |
| `ink-muted` | `#7F7668` | Texto secundário |

## Formulário de contato

O formulário abre uma conversa no WhatsApp com os dados já preenchidos —
não há backend envolvido.

Campos obrigatórios: nome, e-mail, WhatsApp e empresa. Opcionais: cargo e
"maior desafio". Validação e máscara de telefone são feitas no cliente.

**Limitação conhecida:** como o envio final acontece dentro do WhatsApp,
o site não registra quem preencheu e desistiu antes de apertar enviar.
Para ter esse histórico, seria preciso espelhar o envio em um serviço
tipo Formspree em paralelo.

## Pendências

- [ ] Menu mobile (a navegação some abaixo de `md`)
- [x] ~~Logos de clientes faltantes~~ — todos os 13 incluídos
- [ ] **Últimas lacunas nas páginas legais** (marcadas com `.pendente`, destaque
      amarelo): e-mail de contato, e-mail do encarregado/DPO e prazo de retenção
      de contatos que não evoluem para negociação
- [ ] **Revisão jurídica** de `privacidade.html` e `termos.html` antes de
      tratá-las como documentos oficiais
- [ ] **Substituir por logos reais:** `rdamazio.png` é um mockup de papelaria e
      `docevida.png` é um mockup de cartão de visita — nenhum dos dois é um
      arquivo de logo. Pedir os originais em PNG com fundo transparente
- [ ] Seções previstas no `DESIGN.md` ainda não implementadas: roda de serviços de 6 blocos,
      cases InPeace/UpCities com tabs, citação de abertura, canvas interativo no hero
- [ ] Trocar o Tailwind CDN por build local antes de escalar

## Empresa

Site operado por **CONTAINER PUBLICIDADE LTDA** — CNPJ 22.867.935/0001-02,
Rua Guanabara, nº 1490, Itapuã, Vila Velha/ES, que atua sob a marca Axípeto.

## Licença

Todos os direitos reservados © Axípeto.
