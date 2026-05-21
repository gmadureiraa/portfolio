/**
 * Insere a primeira newsletter no DB.
 *
 * Uso: bun run scripts/seed-newsletter-01.ts
 */

import { upsertNewsletter } from "../lib/db/newsletter";

const content_md = `A maioria dos empreendedores vai da ideia direto pro MVP acreditando que está mais perto do dinheiro.

E é exatamente aí que o dinheiro começa a sumir.

Não porque fazer MVP seja errado. Querer testar rápido faz todo sentido.

O problema é chegar no MVP sem saber o que está testando.

Quando não existe uma tese por trás, qualquer resultado vira dado confuso.

Usuário não engajou? Talvez o produto. Talvez o mercado. Talvez o timing.

Você não sabe. E sem saber, o próximo passo é chute.

![O caminho que 99% dos empreendedores fazem vs o caminho com tese.](/newsletter/ideia-tese-mvp-hero.png)

## "Por que esse negócio precisa existir agora?"

Nos últimos meses, meus mentorados chegavam nessa situação: ideia na cabeça, um pé no MVP, e uma certeza enorme de que estavam no caminho certo.

Parei cada um deles com a mesma pergunta:

> Por que esse negócio precisa existir agora?

Não o produto. Não as features. O **porquê**.

Isso é a tese. Ela não nasce de intuição. Nasce de análise: da frustração real que o mercado carrega, do timing, de como os concorrentes estão posicionados, onde eles falham, qual lugar ainda está vago.

Um dos meus mentorados, executivo com larga experiência na área dele, chegou com ideia, página criada no Lovable e modelo de negócio rascunhado. Fechamos a mentoria com tese validada e clientes pagantes antes da primeira versão do produto sair do papel.

Tese validada. Produto direcionado.

## A tese não atrasa o MVP. Profissionaliza a ideia antes de chegar nele.

Você sabe o que está testando.

Você sabe por que aquilo importa.

Você sabe o que os resultados significam de verdade.

O caminho não é ideia → MVP.

É **ideia → tese → MVP**.

## Eu já cometi esse erro. 27 vezes.

Falo isso porque eu errei. Muito.

Lancei mais de 27 projetos pessoais nos últimos anos. Cada um com uma ideia que eu achava genial. Gastei tempo deixando bonito, perfeito, com landing impecável e copy refinada.

Resultado: a maioria morreu em silêncio porque eu não tinha analisado se o mercado realmente precisava daquilo. Era empolgação sem tese.

Há alguns meses comecei a fazer diferente. Olhei pra dentro da [Kaleidos](https://kaleidos.com.br), minha agência, e perguntei:

> Qual é o problema real que TODOS os meus clientes têm e que eu venho resolvendo manualmente toda semana?

A resposta apareceu em três dias: criação de conteúdo viral em escala.

Daí veio a tese: existe um sistema completo pra resolver isso, do scraping ao agendamento, e ele pode virar produto.

Antes de codar uma linha, listei o que faria, validei com clientes reais da Kaleidos, e só então parti pro MVP.

## É assim que nasceu o Projeto Viral

Já tem três peças no ar:

- **Reels Viral** — cola um link de reel, a IA devolve roteiro, storyboard e análise pronta pra adaptar. [Live](https://reels-viral.vercel.app).
- **Sequência Viral** — gera carrosséis Instagram do zero a partir de um briefing seu. [Live](https://viral.kaleidos.com.br).
- **Radar Viral** — monitora os melhores criadores do teu nicho e te avisa quando algo bomba. Já em uso interno na Kaleidos.

E vem mais uma:

- **Biblioteca Viral** — banco curado de carrosséis e reels reais com transcrição, hook e análise. Em construção agora.

Cada peça nasceu de uma tese clara: economizar horas de trabalho real que a agência fazia toda semana. Não é um produto procurando problema. É problema que virou produto.

## Próxima edição

Vou abrir os números do Projeto Viral em primeira mão: o que funcionou, o que não, qual o roadmap, e, pra quem está na lista, vou liberar um **cupom de acesso antecipado** antes da virada pública.

Se você já está aqui, é só esperar terça que vem.

Se chegou agora, entra na lista pelo formulário no fim da página.

E me responde uma coisa antes de seguir:

**Qual etapa está travando você agora? A falta de tese ou o MVP?**

Me conta no direct ([@ogmadureira](https://instagram.com/ogmadureira)) ou responde esse e-mail.

Até a próxima.

— Gabriel
`;

const result = await upsertNewsletter({
  slug: "ideia-tese-mvp",
  title: "Antes do MVP, escreve a tese.",
  excerpt:
    "A maioria dos empreendedores vai da ideia direto pro MVP achando que está mais perto do dinheiro. É exatamente aí que ele começa a sumir.",
  content_md,
  hero_image_url: "/newsletter/ideia-tese-mvp-hero.png",
  og_image_url: "/newsletter/ideia-tese-mvp-hero.png",
  published_at: new Date(),
  author_name: "Gabriel Madureira",
});

if (!result) {
  console.error("✗ upsert returned null — DB não configurado?");
  process.exit(1);
}

console.log("✓ newsletter publicada");
console.log("  id:", result.id);
console.log("  slug:", result.slug);
console.log("  title:", result.title);
console.log("  reading_time_min:", result.reading_time_min);
console.log("  published_at:", result.published_at);
console.log("  url: https://madureira.xyz/newsletter/" + result.slug);
