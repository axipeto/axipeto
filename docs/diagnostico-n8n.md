# Diagnóstico — integração com n8n e Google Sheets

Página: `https://axipeto.com.br/diagnostico/` (arquivo `diagnostico/index.html`).

A página envia um `POST` para o webhook do n8n com o corpo em
`application/x-www-form-urlencoded`. Esse formato foi escolhido de propósito:
o navegador não faz *preflight* CORS para ele, o que evita um ponto de falha.

> As telas e nomes de opções do n8n mudam entre versões. Os nomes abaixo
> refletem o que eu conheço do n8n; se algo não bater com a sua tela,
> confira na documentação atual do n8n.

---

## 1. Configuração na página

No topo do `<script>` de `diagnostico/index.html`:

| Constante | Valor atual | O que fazer |
|---|---|---|
| `WEBHOOK_URL` | `https://axipeto.app.n8n.cloud/webhook/diagnostico` | Deve ser a **Production URL** do nó Webhook. Se o path no n8n for outro, troque aqui. |
| `AGENDA_URL` | vazio | Cole o link de agendamento. Vazio = botão "agendar" escondido. |
| `WHATSAPP` | `5527998244746` | Usado só se o envio falhar. |
| `UTM_DIAS` | `30` | Janela de atribuição das UTMs. |

---

## 2. Planilha (Google Sheets)

Crie uma planilha **Leads — Diagnóstico** com uma aba `leads` e esta linha 1
(exatamente estes nomes; o n8n mapeia pelos cabeçalhos):

```
lead_id	enviado_em	status	empresa	segmento	cidade	rede_social	rede_social_link	site	concorrente	objetivo	interesse	ja_investiu	investimento	visao_3_anos	nome	email	telefone	telefone_e164	consentimento	utm_source	utm_medium	utm_campaign	utm_content	utm_term	utm_id	fbclid	gclid	gbraid	wbraid	ttclid	li_fat_id	primeiro_toque	referrer	landing_page	user_agent	nota_busca	diagnostico_url	diagnostico_enviado_em
```

(Copie a linha acima e cole na célula A1 — as tabulações separam as colunas.)

- `status` é preenchido pelo n8n: `novo` → `diagnostico_gerado` → `aprovado` → `enviado`.
- As três últimas colunas ficam vazias por enquanto; serão usadas na Fase 3
  (diagnóstico com Claude).

---

## 3. Workflow n8n — Fase 2 (captação)

```
[Webhook] → [Set: normaliza] → [Google Sheets: Append row] → [Notificação] → [Respond to Webhook]
```

### Webhook
- **HTTP Method:** `POST`
- **Path:** `diagnostico`
- **Respond:** `Using 'Respond to Webhook' Node`
- **Options → Allowed Origins (CORS):** `https://axipeto.com.br`
  (durante testes locais, acrescente a origem local ou use `*`).
  Sem isso o navegador pode bloquear a leitura da resposta e a página mostra
  a tela de erro mesmo com o lead salvo.

Os campos chegam em `{{$json.body.<campo>}}` — ex.: `{{$json.body.empresa}}`.
Confirme isso no primeiro teste, olhando a saída do nó.

### Set (Edit Fields)
- Campo `status` = `novo`
- Descartar a requisição se `{{$json.body.consentimento}}` for diferente de `sim`
  (use um nó **IF** antes, se preferir).

### Google Sheets — Append Row
- Credencial: sua conta Google.
- Documento: **Leads — Diagnóstico**, aba `leads`.
- Mapping: **Map Automatically** (os nomes dos campos já batem com os cabeçalhos).

### Notificação
WhatsApp, e-mail ou Slack — o que você usa. Sugestão de texto:

```
Novo lead de diagnóstico 🟡
{{$json.body.empresa}} ({{$json.body.segmento}}, {{$json.body.cidade}})
Investimento: {{$json.body.investimento}} · Objetivo: {{$json.body.objetivo}}
Origem: {{$json.body.utm_source}} / {{$json.body.utm_campaign}} / {{$json.body.utm_content}}
{{$json.body.nome}} · {{$json.body.telefone}} · {{$json.body.email}}
```

### Respond to Webhook
- Respond With: **JSON** → `{ "ok": true }`
- Código 200.

**Importante:** responda só **depois** de gravar na planilha. Assim, se o
Sheets falhar, a página mostra o erro e oferece o WhatsApp — o lead não se perde.

### Testando
1. Abra o workflow no editor e clique em **Listen for test event**.
2. Na página, troque temporariamente `/webhook/` por `/webhook-test/` na
   `WEBHOOK_URL`, ou dispare com curl:

```bash
curl -X POST https://axipeto.app.n8n.cloud/webhook-test/diagnostico -d "empresa=Teste&nome=Fulano&email=teste@exemplo.com&consentimento=sim&utm_source=meta"
```

3. Quando funcionar, **ative** o workflow (a Production URL só responde com ele ativo).

---

## 4. UTMs nos anúncios

A página lê automaticamente: `utm_source`, `utm_medium`, `utm_campaign`,
`utm_content`, `utm_term`, `utm_id`, `fbclid`, `gclid`, `gbraid`, `wbraid`,
`ttclid`, `li_fat_id`.

Padrão sugerido para o Meta Ads (campo "Parâmetros de URL" do anúncio):

```
utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}
```

Os `{{...}}` acima são parâmetros dinâmicos do Meta Ads — confira os nomes
disponíveis na tela de criação do anúncio.

Regras de atribuição:
- **Último toque** (`utm_*`): vale a UTM mais recente dentro de 30 dias, mesmo
  que a pessoa volte depois sem UTM na URL.
- **Primeiro toque** (`primeiro_toque`): `utm_source / utm_campaign` da
  primeira visita com UTM naquele navegador.
- Fica salvo no `localStorage` do visitante; em aba anônima ou com dados
  bloqueados, só a UTM da URL atual é enviada.

### Pixel / GTM
A página não instala pixel. Se o Meta Pixel (`fbq`) ou o GTM (`dataLayer`)
estiverem presentes, ela dispara:

| Evento | Quando |
|---|---|
| `diagnostico_etapa` (dataLayer) | a cada etapa exibida (`etapa`: 0–7) — serve para medir abandono |
| `diagnostico_enviado` (dataLayer) | envio confirmado |
| `diagnostico_erro` (dataLayer) | falha no envio |
| `fbq('track', 'Lead')` | envio confirmado, com `eventID` = `lead_id` (permite deduplicar com a API de Conversões) |

---

## 5. Próximo — Fase 3 (diagnóstico com Claude)

Depois que a captação estiver rodando, o mesmo workflow ganha um ramo
(após o Respond, para não atrasar a página):

```
→ [HTTP Request: API da Anthropic com web_search + web_fetch] → [Code: monta HTML]
→ [Sheets: update status=diagnostico_gerado] → [Aprovação manual] → [E-mail ao lead]
```

Isso fica para a próxima etapa (prompt, JSON de saída e template do e-mail).
