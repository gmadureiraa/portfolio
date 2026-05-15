export const TABLES = {
  EMAIL_LIST: "email-list",
};

export const socialLinks = {
  instagram: "https://www.instagram.com/ogmadureira",
  x: "https://x.com/ogmadureira",
  linkedin: "https://www.linkedin.com/in/gabrielmadureira/",
};

export const siteMeta = {
  brand: "madureira",
  handle: "@ogmadureira",
  tagline: "marketing, IA e bastidor de quem constrói",
  description:
    "Newsletter pessoal do Madureira. Marketing direto, IA aplicada e bastidor de quem constrói. Uma por semana, zero spam.",
  cadence: "uma por semana",
  spam: "zero spam",
};

export const navTabs = [
  { label: "Início", href: "/" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Links", href: "/links" },
];

// Categorias usadas como filtros secundários na seção "Cartas do Madureira"
export const newsletterCategories = [
  "Todas",
  "Marketing",
  "IA & Automação",
  "Cases & Bastidor",
  "Carrosséis",
];

export type Issue = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readMinutes: number;
  excerpt: string;
  body: string;
};

// Mock 8 edições — Gabriel substitui depois pelo MDX/CMS real
export const issues: Issue[] = [
  {
    slug: "antes-do-mvp-escreve-a-tese",
    number: "01",
    title: "Antes do MVP, escreve a tese.",
    subtitle:
      "A maioria das startups começa programando. Quem dura, começa escrevendo uma tese de uma frase só.",
    category: "Marketing",
    date: "2026-05-09",
    readMinutes: 6,
    excerpt:
      "Vi 4 founders quebrarem produto bom porque o posicionamento era ruim. Antes de qualquer linha de código, escreve isso aqui.",
    body: `Vi 4 founders nesse trimestre quebrarem produto bom porque o **posicionamento era ruim**. Não falta feature. Falta uma frase clara que o mercado consegue repetir.

A tese é isso: uma frase, no máximo duas, que responde "pra quem é, contra quem, e por quê agora". Se você não consegue escrever, o problema não é o app. É a clareza.

## Como escrever a sua

Pega um caderno (papel mesmo) e responde 3 perguntas. **Sem editar enquanto escreve.**

1. Quem é o **pior cliente possível** desse produto? (a antitese)
2. Que crença do mercado essa pessoa carrega que está errada agora?
3. Que evidência nova fez isso virar agora, e não em 2018?

Depois junta as 3 respostas em uma frase só. Não duas. Uma.

## Exemplo real

A tese da Kaleidos não é "agência de marketing digital". É:

> Marketeiros de marca conseguem rodar conteúdo viral com menos gente do que o mercado acredita, porque IA generativa fechou o gap entre roteiro e render.

Isso filtra cliente. Isso filtra contratação. Isso filtra produto. **Sem a tese escrita, tudo vira opinião.**

## O erro mais comum

Tese com mais de uma vírgula é tese fraca. Se você precisa explicar, não é tese. É lista de features escrita em prosa.

Reescreve até a frase doer um pouco. A tese certa exclui clientes que você queria atender. Boa tese custa caro.`,
  },
  {
    slug: "ia-nao-substitui-criativo-substitui-rascunho",
    number: "02",
    title: "IA não substitui criativo. Substitui rascunho.",
    subtitle:
      "Gente boa fica melhor com IA. Gente mediana fica pior. A diferença é em qual etapa você usa.",
    category: "IA & Automação",
    date: "2026-05-02",
    readMinutes: 7,
    excerpt:
      "Testei 3 fluxos com IA no time de copy. Um funcionou, dois quase me custaram cliente. A diferença não é a ferramenta. É onde você encaixa.",
    body: `Testei 3 fluxos com IA no time de copy esse mês. Um funcionou bem. Dois quase me custaram cliente. **A diferença não é a ferramenta**. É em que etapa do processo você encaixa.

## O que funcionou

Gerar 50 variações de hook em 4 minutos. Copy senior escolhe 3. Reescreve as 3. Publica.

Tempo total: 12 minutos. Antes eram 90.

## O que quebrou

Pedir pra IA "fazer o post completo, pronto pra publicar". A peça saiu tecnicamente correta e emocionalmente morta. Cliente não bate o olho e sente nada. **Pior: nem dá pra explicar por quê.**

## A regra mental

IA é boa pra alargar opções e pra acabar rascunho. É ruim pra escolher e pra fechar. Escolha é trabalho humano. Fechamento também.

Quem trata a IA como estagiário sênior ganha. Quem trata como copywriter pronto perde cliente em 60 dias.`,
  },
  {
    slug: "stripe-quebrou-as-3-da-manha",
    number: "03",
    title: "Stripe quebrou as 3 da manhã. O que aprendi.",
    subtitle:
      "Webhook fora do ar, R$ 12k em assinaturas sumindo. Bastidor real, sem filtro de LinkedIn.",
    category: "Cases & Bastidor",
    date: "2026-04-25",
    readMinutes: 5,
    excerpt:
      "Acordei 4h da manhã com Slack pingando. Webhook do Stripe parou de bater no Supabase. R$ 12k em assinaturas em risco. O que fiz nas primeiras 2 horas.",
    body: `Acordei 4h05 com Slack pingando. Webhook do Stripe parou de bater no endpoint do Supabase. **R$ 12k em assinaturas em risco** porque o sistema não sabia quem tinha pago.

Primeira coisa que NÃO fiz: entrar em pânico. Segunda: abrir o painel da Stripe. Terceira: ler o log.

## A descoberta dolorosa

A causa não era o Stripe. Era um middleware meu que adicionou validação CSRF na rota errada. Subiu na sexta. Quebrou no domingo de madrugada.

Lição cara: **toda rota de webhook é uma rota pública controlada**, e middleware genérico não entra nela. Hoje tenho exclusão explícita por path no matcher.

## O que faria diferente

1. Webhook em rota separada do app web, projeto Vercel à parte.
2. Alerta no Sentry com SLA de 30 minutos pra qualquer 5xx em /api/stripe/*.
3. Retry queue no Upstash Redis, não confiando 100% no replay manual do Stripe.

Custou uma madrugada. Aprendizado vale 12k? Vale.`,
  },
  {
    slug: "o-carrossel-que-fez-1-2m-de-views",
    number: "04",
    title: "O carrossel que fez 1.2M de views.",
    subtitle: "Não foi sorte. Foi formato. Aqui está a engenharia exata.",
    category: "Carrosséis",
    date: "2026-04-18",
    readMinutes: 8,
    excerpt:
      "Slide 1 com pergunta. Slide 2 com confissão em primeira pessoa. Slide 3 com número concreto. Anatomia completa.",
    body: `Carrossel publicado dia 12. Em 6 dias bateu 1.2M de views, 47k saves, 2.3k DMs. **Não foi sorte.** Foi formato.

## Anatomia slide por slide

Slide 1 — pergunta direta, sem explicar. 4 palavras no máximo. Fonte: Fraunces italic enorme.

Slide 2 — confissão em primeira pessoa. "Eu também achava isso até..." quebra a parede entre creator e leitor. Sem isso, vira post de blog.

Slide 3 — **número concreto**. Sem número, o slide vira opinião. Com número, vira evidência. Aqui veio "R$ 12k em 1 dia".

Slides 4-7 — desenvolvimento. Cada slide entrega 1 ideia. Não 2. Uma.

Slide 8 — princípio em barra preta, fonte serif. É o slide que vai pro screenshot.

Slide 9 — CTA. ManyChat trigger. Palavra-chave única. Salva no perfil.

## O que NÃO fazer

Carrossel informativo neutro. Tipo "5 dicas pra...". **Morto na chegada.** Mercado tem 9000 desses. Ninguém salva.

Carrossel funciona quando você assina embaixo. Sem voz pessoal, é só PowerPoint colorido.`,
  },
  {
    slug: "ferramenta-do-mes-cursor-vs-claude-code",
    number: "05",
    title: "Cursor vs Claude Code — depois de 60 dias.",
    subtitle: "Usei os dois pesado em 4 projetos. Qual ganha pra quê.",
    category: "IA & Automação",
    date: "2026-04-11",
    readMinutes: 9,
    excerpt:
      "Bench real, 60 dias, 4 projetos. Onde o Cursor brilha, onde o Claude Code mata. Não é guerra santa.",
    body: `Usei os dois pesado em 4 projetos diferentes esse trimestre. Não é guerra santa. **Cada um ganha numa coisa.**

## Cursor ganha em

UI tweaks rápidos. Você vê o diff inline, aceita ou rejeita, segue. Para quem mexe muito em CSS/Tailwind, é mais rápido.

## Claude Code ganha em

Refactor cross-file. Migração de banco. Setup de pipeline. **Tudo que envolve mais de 3 arquivos e precisa de memória de contexto longa.**

## A regra que adotei

Feature pequena visual → Cursor. Mudança estrutural → Claude Code com um plano antes.

Quem joga só com um perde os dois.`,
  },
  {
    slug: "como-cobrar-mais-sem-perder-cliente",
    number: "06",
    title: "Como cobrar mais sem perder cliente.",
    subtitle: "3 movimentos que dobraram meu ticket sem aumentar churn.",
    category: "Marketing",
    date: "2026-04-04",
    readMinutes: 6,
    excerpt: "Cliente que paga pouco te trata mal. Aqui está como subir preço com elegância.",
    body: `Cliente que paga pouco te trata mal. Quem cobra preço justo é respeitado. **Esses são os 3 movimentos** que usei pra dobrar meu ticket no último ano sem aumentar churn.

## 1. Renomeia o produto

Não é "consultoria mensal". É "operação de marketing fracionada". Mesmo trabalho, posicionamento novo. Preço novo automaticamente.

## 2. Adiciona um piso

Mínimo de 6 meses. Quem não topa, não era cliente. Quem topa, vira parceiro.

## 3. Mostra o custo de oportunidade

Não justifica o preço listando entregáveis. Mostra o que o cliente perde sem você. **"R$ 200k em receita não realizada por trimestre" pesa mais que "12 posts por mês".**`,
  },
  {
    slug: "supabase-rls-pegadinha",
    number: "07",
    title: "A pegadinha de RLS no Supabase que me custou 3 dias.",
    subtitle: "Bug silencioso. Sem erro no console. Apenas linhas sumindo. Aqui é o diagnóstico.",
    category: "Cases & Bastidor",
    date: "2026-03-28",
    readMinutes: 7,
    excerpt:
      "Usuário cria registro, salva, vê na tela. F5 e some. Sem erro. RLS lendo o auth.uid() errado.",
    body: `Bug clássico que perdi 3 dias caçando. Usuário cria registro no app, vê salvar, F5 e some. **Sem erro no console, sem erro no servidor.** Apenas linha não aparece.

## A causa

RLS estava com policy "select" pedindo auth.uid() = user_id. Mas o insert usava service_role (server-side action) e gravava user_id como string vazia em vez do uuid certo.

Resultado: linha existia no banco. RLS bloqueava na leitura.

## O fix

Sempre validar que auth.uid() retorna o uuid esperado **antes** de inserir, usando "auth.uid() is not null" na policy de insert.

E ter um teste E2E que faz signup → insert → select. **3 dias por causa de teste que não existia.**`,
  },
  {
    slug: "newsletter-gera-mais-que-instagram",
    number: "08",
    title: "Newsletter gera 4x mais receita que Instagram. Por enquanto.",
    subtitle:
      "Dados reais dos meus 3 últimos clientes B2B. Por que email volta e quando não funciona.",
    category: "Marketing",
    date: "2026-03-21",
    readMinutes: 8,
    excerpt:
      "Comparei attribution de 3 clientes B2B em 90 dias. Newsletter pagou 4x mais. Mas tem ressalva importante.",
    body: `Comparei attribution de 3 clientes B2B nos últimos 90 dias. **Newsletter pagou 4x mais receita** que conteúdo orgânico em redes sociais.

## Os números

Cliente A — R$ 47k via newsletter, R$ 11k via Instagram.
Cliente B — R$ 89k via newsletter, R$ 22k via Instagram.
Cliente C — R$ 31k via newsletter, R$ 8k via Instagram.

Padrão claro. Mas **tem ressalva importante**.

## Quando newsletter NÃO funciona

Produto de impulso (R$ 50-200, decisão emocional). Newsletter é ruim disso. Instagram + creator fit é melhor.

Produto B2B caro (R$ 5k+/mês, decisão racional, ciclo de venda longo). **Aqui newsletter mata.** Porque é o único canal onde o lead lê com atenção, dentro da própria caixa de entrada, sem algoritmo no meio.

## A conclusão

Não é newsletter > Instagram. É newsletter > Instagram **para produtos B2B caros**. Pra resto, depende.

O erro é tratar canal como religião em vez de matemática.`,
  },
];

export const popularSlugs = ["antes-do-mvp-escreve-a-tese", "o-carrossel-que-fez-1-2m-de-views", "ia-nao-substitui-criativo-substitui-rascunho", "newsletter-gera-mais-que-instagram"];
