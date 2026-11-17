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
| `WEBHOOK_URL` | `https://axipeto.app.n8n.cloud/webhook/f6ab1951-ad65-47b9-bc89-7544ab512eaf` | **Production URL** do nó Webhook. Só responde com o workflow ativo. |
| `AGENDA_URL` | `https://calendar.app.google/Hqn1kFbBmeCuauAE8` | Link do Google Agenda. Vazio = botão "agendar" escondido. |

**Modo teste:** abra `https://axipeto.com.br/diagnostico/?teste=1` — o envio vai
para `/webhook-test/...` (a Test URL), que só responde enquanto o editor do n8n
está em *Listen for test event*.
| `WHATSAPP` | `5527998244746` | Usado só se o envio falhar. |
| `UTM_DIAS` | `30` | Janela de atribuição das UTMs. |

---

## 2. Planilha (Google Sheets)

Planilha: [Leads - Daignostico](https://docs.google.com/spreadsheets/d/1N7h1ILuZfJ6q3jGKAlRTDWynXdVM_JCNRMii_zjzfOI/edit) — aba `Página1`. Linha 1
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

O workflow pronto está em [`n8n/01-captacao-diagnostico.json`](../n8n/01-captacao-diagnostico.json).

```
[Webhook] → [Normaliza lead] → [Salva na planilha] → [Responde ao site] → [Me avisa por e-mail]
```

A resposta ao site sai **depois** de gravar na planilha: se o Sheets falhar, a
página mostra o erro e oferece o WhatsApp, e o lead não se perde. O e-mail de
aviso vem depois da resposta, então uma falha nele não afeta quem preencheu.

> Escrevi o JSON a partir do formato de exportação do n8n que conheço, mas não
> pude importá-lo num n8n de verdade daqui. Se algum nó vier com aviso ou
> campo vazio, ajuste pela tela — a configuração esperada de cada nó está abaixo.

### Passo 1 — Liberar o caminho do webhook
O workflow importado usa o mesmo path do webhook que você já criou
(`f6ab1951-…`). Dois webhooks ativos não podem ter o mesmo path, então
**apague ou desative** o workflow antigo antes (ou apague só o nó Webhook dele).

### Passo 2 — Importar
1. No n8n: **Workflows → Add workflow**.
2. Menu **⋯** (canto superior direito) → **Import from File…** → escolha
   `n8n/01-captacao-diagnostico.json`.
   (Alternativa: abra o arquivo, copie todo o conteúdo e cole com Ctrl+V no
   editor vazio.)

### Passo 3 — Conferir cada nó

**Webhook — formulário**
- HTTP Method `POST` · Path `f6ab1951-ad65-47b9-bc89-7544ab512eaf`
- Respond: `Using 'Respond to Webhook' Node`
- Options → **Allowed Origins (CORS)**: `https://axipeto.com.br`
  (se for testar a página em outro endereço, acrescente-o separado por vírgula)

**Normaliza lead** (Code, JavaScript)
- Recusa envios sem consentimento, sem e-mail válido ou sem empresa (gera erro →
  a página mostra a tela de erro).
- Devolve só as 36 colunas preenchidas pelo formulário, com `status = novo`.
- Põe um apóstrofo antes de valores que começam com `= + - @`. Sem isso, o
  Sheets transformaria `+5527999998888` em número (ou um texto malicioso em
  fórmula). O apóstrofo não aparece na célula.

**Salva na planilha** (Google Sheets → Append Row)
- **Credential:** conecte sua conta Google (*Sign in with Google*).
- **Document:** `Leads - Daignostico` · **Sheet:** `Página1`
  (o arquivo vem com esses dois campos vazios de propósito — selecione na lista).
- **Mapping Column Mode:** `Map Automatically`.
- Options → **Cell Format:** `Let Google Sheets format` (USER_ENTERED).

**Responde ao site** (Respond to Webhook)
- Respond With `JSON` · Response Body `{"ok": true}`

**Me avisa por e-mail** (Gmail → Send)
- **Credential:** sua conta Gmail.
- **To:** troque `COLOQUE_SEU_EMAIL_AQUI` pelo seu e-mail.
- O e-mail traz os dados do lead, a origem (UTMs) e um link direto para o
  WhatsApp da pessoa. Prefere receber no WhatsApp ou Slack? Troque este nó;
  o texto pode ser o mesmo.

### Passo 4 — Testar
1. Clique em **Test workflow** (ou *Listen for test event* no nó Webhook).
2. Abra `https://axipeto.com.br/diagnostico/?teste=1` e preencha — ou, enquanto
   a página não estiver no ar, dispare:

```bash
curl -i -X POST https://axipeto.app.n8n.cloud/webhook-test/f6ab1951-ad65-47b9-bc89-7544ab512eaf -d "lead_id=teste-1&empresa=Teste&nome=Fulano&email=teste@exemplo.com&telefone_e164=%2B5527999998888&consentimento=sim&utm_source=meta"
```

3. Confira: resposta `{"ok": true}`, linha nova na planilha (com o telefone
   como texto), e-mail de aviso recebido. Apague a linha de teste.
4. **Ative** o workflow (chave *Active* no topo). Só assim a Production URL,
   que a página usa, passa a responder.

### Se der errado
| Sintoma | Causa provável |
|---|---|
| Página mostra erro, mas a linha aparece na planilha | CORS: confira *Allowed Origins* no Webhook |
| curl devolve 404 "webhook not registered" | Workflow inativo (Production URL) ou editor não está escutando (Test URL) |
| Erro "Lead recusado: …" na execução | Envio sem consentimento/e-mail/empresa — o filtro funcionou |
| Colunas vazias na planilha | Cabeçalhos da linha 1 diferentes dos nomes dos campos |
| Erro ao ativar: path em uso | O workflow antigo ainda tem o mesmo path (Passo 1) |

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
