/**
 * README inline do pacote Resend multi-produto.
 *
 * Não é um módulo importável de runtime — é um TS file com export `README`
 * (string) pra documentar setup, troubleshooting e operações no dashboard
 * Resend, sem precisar de arquivo .md no repo.
 *
 * Use:
 *   import { README } from "@/lib/integrations/resend/README";
 *   console.log(README);
 *
 * Ou abra direto este arquivo no editor.
 */

export const README = `
# Resend Multi-Produto — Guia de Operação

Este pacote (lib/integrations/resend) padroniza o uso do Resend em todos os
projetos do Gabriel. Cada projeto tem sua própria Audience, remetente e copy.

## 1. Criar Audience no dashboard Resend

1. Login em https://resend.com/audiences
2. "Create audience" → nome descritivo (ex: "Madureira Newsletter", "Sequência
   Viral Signups")
3. Copia o UUID da URL: \`https://resend.com/audiences/<UUID>\`
4. Cola na env var \`RESEND_<PRODUCT>_AUDIENCE_ID\` do projeto

## 2. Criar Custom Contact Properties (opcional, recomendado)

Ainda dentro da Audience → aba "Properties" → "New property". Criar 4:

| Property    | Tipo  | Exemplo            |
|-------------|-------|--------------------|
| source      | text  | madureira_home     |
| product     | text  | madureira          |
| signup_at   | text  | 2026-04-28T13:42Z  |
| lead_value  | text  | cold               |

Quando estiverem criadas, passa \`{ useCustomProperties: true }\` no
\`addContactToAudience(...)\`. Sem custom properties, o source vira prefixo
\`[source]\` no firstName (fallback).

## 3. Verificar domínio (DNS)

1. Resend → Domains → "Add domain" → ex: \`madureira.xyz\`
2. Copia os 3 registros DNS:
   - \`SPF\` (TXT)
   - \`DKIM\` (TXT, usualmente \`resend._domainkey\`)
   - \`DMARC\` (TXT, opcional mas recomendado)
3. Cola no provider de DNS (Cloudflare, Vercel DNS, Registro.br)
4. Volta no Resend → "Verify" → espera ~5min

Domínios sugeridos por produto:
- madureira:    \`madureira.xyz\`
- viral:        \`viral.kaleidos.com.br\` (subdomínio do kaleidos)
- kaleidos:     \`kaleidos.com.br\`
- autoblogger:  \`autoblogger.dev\`
- reels:        \`reels-viral.com\` (ou subdomínio)

## 4. Criar Automation (drip / welcome sequence)

Resend → Automations → "New automation":

1. Trigger: "Contact added to audience" → seleciona a Audience do produto
2. Adiciona steps com delay e email template
3. "Activate"

Quando o wrapper chama \`addContactToAudience\`, a Automation dispara
automaticamente. Não precisa mexer em código pra adicionar/editar passos.

### Sequências sugeridas

**Madureira (newsletter pessoal):**
- D0: Welcome (já mandado pelo \`sendWelcomeEmail\`, NÃO duplicar na Automation)
- D3: Case study — "como usei IA pra gerar 50 carrosséis em 1h"
- D7: CTA mentoria — "quer 30min comigo?"
- D14: Follow-up — pesquisa (1 pergunta) sobre dor principal

**Sequência Viral:**
- D0: Welcome com CTA "Gerar primeiro carrossel" (já é o sendWelcomeEmail)
- D2: Tutorial — "Template Twitter ou Futurista? Escolha de acordo com o tom"
- D5: Cupom Pro — "20% OFF no primeiro mês, válido por 48h"
- D10: Re-engajamento — "Você ainda não gerou nada. Posso te ajudar?"

**Kaleidos:**
- D0: Obrigado por entrar em contato (sendWelcomeEmail)
- D7: Case — "Como triplicamos o ARR de [cliente fintech]"
- D14: CTA booking — "Bora marcar uma call de 30min?"

**AutoBlogger:**
- D0: Welcome + CTA "Gerar primeiro artigo"
- D2: Best practices — "5 prompts que dão artigos rankáveis"
- D7: Cupom upgrade

**Reels Viral:**
- D0: Welcome + CTA "Analisar primeiro reel"
- D3: Tutorial avançado — "Como ler o storyboard cena a cena"
- D7: Upsell pro plan

## 5. Resend MCP no Claude Code

Pra testar e operar o Resend direto do Claude Code via MCP:

\`\`\`bash
claude mcp add resend -e RESEND_API_KEY=re_xxxxx -- npx -y resend-mcp
\`\`\`

Depois de instalado, ferramentas disponíveis:
- \`resend_send_email\`
- \`resend_list_audiences\`
- \`resend_list_contacts\`
- \`resend_create_audience\`
- (e mais — ver \`https://github.com/resendlabs/resend-mcp\`)

Use \`use context7\` no prompt pra pegar docs atualizadas do SDK Resend.

## 6. Checklist por produto

Pra cada projeto novo, antes de chamar os helpers:

- [ ] Domínio verificado no Resend
- [ ] Audience criada e UUID copiado
- [ ] Custom properties criadas (opcional)
- [ ] Env vars setadas no Vercel:
  - [ ] RESEND_API_KEY (compartilhada) OU RESEND_<PRODUCT>_API_KEY
  - [ ] RESEND_<PRODUCT>_AUDIENCE_ID
  - [ ] RESEND_<PRODUCT>_FROM_EMAIL
  - [ ] OWNER_EMAIL
- [ ] Automation criada e ativa (se for usar drip)
- [ ] Pasta lib/integrations/resend/ copiada do source-of-truth
  (madureira-site)
- [ ] Caller atualizado pra passar o \`product\` correto

## 7. Troubleshooting

**"already exists"**
Idempotência funciona. \`addContactToAudience\` retorna \`{ ok: true }\`.

**"422 Unprocessable Entity" na criação de contato**
Geralmente custom property que não existe na Audience. Cria no dashboard ou
desliga \`useCustomProperties\`.

**Email não chega**
1. Domínio verificado? Resend → Domains → status "verified"
2. SPF/DKIM corretos? Use \`dig TXT madureira.xyz\` pra checar
3. Verifica spam folder (especialmente Gmail no primeiro envio)
4. Resend → Logs → busca pelo email destinatário

**Welcome duplicado**
Se você ativar Automation com step "send welcome email" E o código já chama
\`sendWelcomeEmail\`, o lead recebe 2x. Escolha um caminho:
- Código manda welcome → Automation começa em D2/D3
- Automation manda welcome → comente \`sendWelcomeEmail\` no fanout

**Owner notification chegando duplicada**
\`notifyOwner\` é fire-and-forget mas só dispara em lead novo (depois do
dedupe Upstash em \`/api/newsletter/subscribe\`). Se chegar 2x, checa
deduplicação na camada do app.
`.trim();
