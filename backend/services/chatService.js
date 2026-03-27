/**
 * ChatService
 * Mentor de carreira com persona inspirada em Naval Ravikant / Ray Dalio.
 * Mock inicial — pronto para integração com OpenAI/Anthropic API.
 */

const MENTOR_RESPONSES = {
  carreira: [
    "Escolha um mercado em crescimento e desenvolva uma habilidade rara dentro dele. A interseção é onde o valor está.",
    "A melhor carreira não é a mais bem paga — é aquela em que você continua aprendendo com prazer após anos.",
    "Reputação é o ativo que você constrói em décadas e pode perder em dias. Cuide disso como capital.",
  ],
  investimento: [
    "Não invisto em nada que não consigo explicar em três frases simples. Complexidade disfarça incerteza.",
    "O mercado é um mecanismo de transferência de dinheiro dos impacientes para os pacientes. — Buffett entendeu isso.",
    "Diversificação protege contra o que você não sabe. Concentração te enriquece com o que você sabe.",
  ],
  decisão: [
    "Antes de decidir, pergunte: se eu errar, qual o custo real? Se o custo for aceitável, decida rápido.",
    "A maioria das decisões importantes pode ser revertida. Paralisia por análise custa mais do que erros reversíveis.",
    "Decisões ruins com boas intenções ainda são decisões ruins. Resultados importam, não narrativas.",
  ],
  mentalidade: [
    "Humildade intelectual não é fraqueza — é a base de todo aprendizado real. Quem acha que sabe para de crescer.",
    "Não optimize para parecer bem-sucedido. Optimize para ser. A diferença é enorme.",
    "Foque no processo, não no resultado. Você controla um, não o outro.",
  ],
  dados: [
    "Dados sem contexto são ruído. Dados com contexto são insight. A diferença está em quem faz as perguntas certas.",
    "Um bom analista não é o que encontra padrões — é o que distingue correlação de causalidade.",
    "O perigo dos dados não é a falta deles. É a confiança excessiva quando você os tem.",
  ],
  default: [
    "Que pergunta mais interessante. Me diz mais sobre o que está por trás dela.",
    "Antes de responder, preciso entender: você está buscando clareza ou validação?",
    "A questão mais importante não é o que fazer — é por que você quer fazer isso.",
    "Pense assim: daqui a 5 anos, o que você lamentaria mais? Ter tentado ou não ter tentado?",
  ],
};

function detectTopic(message) {
  const msg = message.toLowerCase();
  if (/carreira|emprego|trabalho|área|profissão|futuro/.test(msg)) return "carreira";
  if (/invest|ação|bolsa|mercado|dinheiro|renda/.test(msg)) return "investimento";
  if (/decidir|decisão|escolha|devo|melhor opção/.test(msg)) return "decisão";
  if (/mentalidade|mindset|foco|disciplina|hábito/.test(msg)) return "mentalidade";
  if (/dado|análise|estatística|número|métrica/.test(msg)) return "dados";
  return "default";
}

function getMentorResponse(message) {
  const topic = detectTopic(message);
  const responses = MENTOR_RESPONSES[topic];
  const index = Math.floor(Math.random() * responses.length);

  return {
    response: responses[index],
    topic,
    timestamp: new Date().toISOString(),
    disclaimer: "Este chat é uma simulação educacional. Não constitui recomendação financeira.",
  };
}

module.exports = { getMentorResponse };
