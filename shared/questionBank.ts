// Tipos de intenção do usuário
export type UserIntention = 
  | 'QUERO_RELACIONAMENTO' 
  | 'QUERO_SEXO' 
  | 'JA_FIQUEI_QUERO_NOVAMENTE' 
  | 'NAO_FIQUEI_QUERO_FICAR';

// Papéis sexuais
export type SexualRole = 
  | 'ATIVO' 
  | 'VERSATIL_ATIVO' 
  | 'VERSATIL_PASS' 
  | 'PASS';

// Sistema de características para compatibilidade
export enum SexualTrait {
  // Para relacionamentos
  VALORES = 'valores',
  OBJETIVOS_VIDA = 'objetivos_vida',
  COMUNICACAO_EMOCIONAL = 'comunicacao_emocional',
  EXCLUSIVIDADE = 'exclusividade',
  FREQUENCIA_RELACIONAMENTO = 'frequencia_relacionamento',
  CUIDADO_POS = 'cuidado_pos',
  
  // Para sexo casual
  HIGIENE = 'higiene',
  PERFORMANCE = 'performance',
  INTENSIDADE_SEXUAL = 'intensidade_sexual',
  ABERTURA_SEXUAL = 'abertura_sexual',
  PROTECAO = 'protecao',
  
  // Para continuidade (já ficou)
  MELHORIA_EXPERIENCIA = 'melhoria_experiencia',
  CONSISTENCIA = 'consistencia',
  
  // Para primeiro encontro (não ficou)
  PRIMEIRAS_IMPRESSOES = 'primeiras_impressoes',
  EXPECTATIVAS_INICIAIS = 'expectativas_iniciais',
  
  // Físico e técnico por papel
  FISICO_ATIVO = 'fisico_ativo',
  TECNICA_ATIVO = 'tecnica_ativo',
  FISICO_PASSIVO = 'fisico_passivo',
  ADAPTACAO_PASSIVO = 'adaptacao_passivo',
  VERSATILIDADE = 'versatilidade'
}

export interface QuestionRule {
  questionId: string;
  op: 'eq' | 'in' | 'gte' | 'lte';
  value: string | string[] | number;
}

export interface AdaptiveQuestion {
  id: string;
  trait: SexualTrait;
  category: string;
  type: 'radio' | 'input' | 'textarea' | 'number';
  question: string;
  options?: string[];
  placeholder?: string;
  required: boolean;
  // Nova estrutura para filtrar por intenção e papel
  intentions: UserIntention[]; // Para quais intenções esta pergunta se aplica
  roles: SexualRole[]; // Para quais papéis esta pergunta se aplica
  when?: QuestionRule[]; // Condições para mostrar esta pergunta
  followUps?: Record<string, string[]>; // Opção -> IDs de perguntas follow-up
  weight: number; // Importância na compatibilidade (0-1)
}

// ================================
// BANCO DE PERGUNTAS POR INTENÇÃO
// ================================

export const QUESTION_BANK: AdaptiveQuestion[] = [

  // =====================================
  // PERGUNTAS PARA QUERO_RELACIONAMENTO
  // =====================================
  
  // VALORES E OBJETIVOS DE VIDA
  {
    id: 'relacionamento_objetivo',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'O que você busca em um relacionamento?',
    options: [
      'Relacionamento sério com possibilidade de morar junto',
      'Namoro estável mas cada um na sua casa',
      'Dating exclusivo para conhecer melhor',
      'Amizade colorida com carinho e consistência'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Relacionamento sério com possibilidade de morar junto': ['relacionamento_tempo_morar', 'relacionamento_filhos'],
      'Dating exclusivo para conhecer melhor': ['relacionamento_tempo_decisao']
    },
    weight: 0.95
  },

  {
    id: 'relacionamento_tempo_morar',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Em quanto tempo você pensaria em morar junto?',
    options: [
      'Após 6 meses a 1 ano se der certo',
      'Entre 1 a 2 anos de relacionamento',
      'Mais de 2 anos, sem pressa',
      'Não tenho pressa, quando sentir que é o momento'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'relacionamento_filhos',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Como você vê a questão de ter filhos?',
    options: [
      'Definitivamente quero ter filhos no futuro',
      'Talvez, depende do parceiro e situação',
      'Não penso nisso agora, vou decidir mais tarde',
      'Não quero ter filhos'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'relacionamento_valores',
    trait: SexualTrait.VALORES,
    category: 'Valores e Compatibilidade',
    type: 'radio',
    question: 'O que mais valoriza em um parceiro?',
    options: [
      'Honestidade e transparência total',
      'Carinho e demonstrações de afeto',
      'Ambição e objetivos de vida similares',
      'Humor e química natural'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  // COMUNICAÇÃO EMOCIONAL
  {
    id: 'comunicacao_conflitos',
    trait: SexualTrait.COMUNICACAO_EMOCIONAL,
    category: 'Comunicação',
    type: 'radio',
    question: 'Como você resolve conflitos em relacionamentos?',
    options: [
      'Converso na hora para resolver logo',
      'Espero um tempo para acalmar, depois converso',
      'Preciso de espaço, converso quando me sinto pronto',
      'Evito conflitos, prefiro manter a paz'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Converso na hora para resolver logo': ['comunicacao_intensidade'],
      'Evito conflitos, prefiro manter a paz': ['comunicacao_expressao']
    },
    weight: 0.9
  },

  {
    id: 'comunicacao_intensidade',
    trait: SexualTrait.COMUNICACAO_EMOCIONAL,
    category: 'Comunicação',
    type: 'radio',
    question: 'Como é sua comunicação quando você está chateado?',
    options: [
      'Falo diretamente o que me incomoda',
      'Explico com calma como me sinto',
      'Fico mais quieto até resolver internamente',
      'Preciso que o parceiro perceba que algo está errado'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  // EXCLUSIVIDADE E FREQUÊNCIA
  {
    id: 'exclusividade_importancia',
    trait: SexualTrait.EXCLUSIVIDADE,
    category: 'Exclusividade',
    type: 'radio',
    question: 'Quão importante é a exclusividade para você?',
    options: [
      'Essencial desde o início - só fico com uma pessoa',
      'Importante após algumas semanas de dating',
      'Negociável conforme a situação',
      'Não sou muito possessivo'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Essencial desde o início - só fico com uma pessoa': ['ciumes_nivel']
    },
    weight: 0.9
  },

  {
    id: 'frequencia_encontros',
    trait: SexualTrait.FREQUENCIA_RELACIONAMENTO,
    category: 'Tempo Juntos',
    type: 'radio',
    question: 'Com que frequência gostaria de se ver em um relacionamento?',
    options: [
      'Todos os dias ou quase todos',
      '3-4 vezes por semana',
      '2-3 vezes por semana',
      '1-2 vezes por semana, valorizamos nosso espaço'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.75
  },

  // CUIDADO PÓS-SEXO EM RELACIONAMENTOS
  {
    id: 'aftercare_relacionamento',
    trait: SexualTrait.CUIDADO_POS,
    category: 'Intimidade e Carinho',
    type: 'radio',
    question: 'Como você gosta de ser tratado após o sexo em um relacionamento?',
    options: [
      'Muito carinho, conversa e conexão emocional',
      'Abraços e um tempo relaxando juntos',
      'Um pouco de carinho, depois cada um no seu canto',
      'Varia conforme o humor e cansaço'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  // ===============================
  // PERGUNTAS PARA QUERO_SEXO
  // ===============================
  
  // HIGIENE E PREPARAÇÃO
  {
    id: 'higiene_casual',
    trait: SexualTrait.HIGIENE,
    category: 'Higiene e Preparação',
    type: 'radio',
    question: 'Como você se prepara para um encontro sexual casual?',
    options: [
      'Preparação completa - banho, higiene íntima, perfume',
      'Preparação padrão - banho e cuidados básicos',
      'Preparação rápida - o essencial',
      'Gosto de ser mais espontâneo'
    ],
    required: true,
    intentions: ['QUERO_SEXO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Preparação completa - banho, higiene íntima, perfume': ['higiene_expectativa_parceiro']
    },
    weight: 0.9
  },

  {
    id: 'higiene_expectativa_parceiro',
    trait: SexualTrait.HIGIENE,
    category: 'Higiene e Preparação',
    type: 'radio',
    question: 'O que você espera do parceiro casual?',
    options: [
      'O mesmo nível de cuidado que eu tenho',
      'Pelo menos limpo e cheiroso',
      'Não sou muito exigente',
      'A química supera tudo'
    ],
    required: true,
    intentions: ['QUERO_SEXO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  // PERFORMANCE E INTENSIDADE
  {
    id: 'intensidade_casual',
    trait: SexualTrait.INTENSIDADE_SEXUAL,
    category: 'Intensidade Sexual',
    type: 'radio',
    question: 'Que tipo de intensidade você procura no sexo casual?',
    options: [
      'Bem intenso e apaixonado',
      'Equilibrado entre intenso e suave',
      'Mais suave e sensual',
      'Depende da química no momento'
    ],
    required: true,
    intentions: ['QUERO_SEXO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  // ABERTURA SEXUAL
  {
    id: 'abertura_casual',
    trait: SexualTrait.ABERTURA_SEXUAL,
    category: 'Experimentação',
    type: 'radio',
    question: 'Quão aberto você é para experimentar em encontros casuais?',
    options: [
      'Muito aberto, gosto de experimentar coisas novas',
      'Aberto se rolar química e confiança',
      'Prefiro o básico que já sei que funciona',
      'Bem conservador, nada muito ousado'
    ],
    required: true,
    intentions: ['QUERO_SEXO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Muito aberto, gosto de experimentar coisas novas': ['kinks_interesse_casual']
    },
    weight: 0.75
  },

  {
    id: 'kinks_interesse_casual',
    trait: SexualTrait.ABERTURA_SEXUAL,
    category: 'Experimentação',
    type: 'radio',
    question: 'Que tipo de experimentação mais te interessa?',
    options: [
      'Dominação e controle',
      'Posições e lugares diferentes',
      'Brinquedos e acessórios',
      'Role-play e fantasias'
    ],
    required: true,
    intentions: ['QUERO_SEXO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.6
  },

  // PROTEÇÃO E SEGURANÇA
  {
    id: 'protecao_casual',
    trait: SexualTrait.PROTECAO,
    category: 'Proteção e Segurança',
    type: 'radio',
    question: 'Como você lida com proteção no sexo casual?',
    options: [
      'Sempre uso camisinha, sem exceção',
      'Uso camisinha, mas converso sobre testes',
      'Depende da pessoa e da situação',
      'Confio mais na pessoa que na proteção'
    ],
    required: true,
    intentions: ['QUERO_SEXO'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.95
  },

  // =======================================
  // PERGUNTAS PARA JA_FIQUEI_QUERO_NOVAMENTE
  // =======================================
  
  {
    id: 'melhoria_experiencia',
    trait: SexualTrait.MELHORIA_EXPERIENCIA,
    category: 'Melhorando a Experiência',
    type: 'radio',
    question: 'O que você gostaria de melhorar no próximo encontro?',
    options: [
      'Mais tempo e menos pressa',
      'Mais comunicação sobre o que gostamos',
      'Experimentar posições ou técnicas diferentes',
      'Mais carinho e conexão emocional'
    ],
    required: true,
    intentions: ['JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'consistencia_encontros',
    trait: SexualTrait.CONSISTENCIA,
    category: 'Continuidade',
    type: 'radio',
    question: 'Com que frequência gostaria de se encontrar novamente?',
    options: [
      'Sempre que possível, virou rotina gostosa',
      'Algumas vezes por semana',
      'Fim de semana ou quando der vontade',
      'Sem compromisso, quando pintar clima'
    ],
    required: true,
    intentions: ['JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  // ====================================
  // PERGUNTAS PARA NAO_FIQUEI_QUERO_FICAR
  // ====================================
  
  {
    id: 'primeira_impressao',
    trait: SexualTrait.PRIMEIRAS_IMPRESSOES,
    category: 'Primeiro Encontro',
    type: 'radio',
    question: 'O que mais te atraiu nesta pessoa?',
    options: [
      'Aparência física e atração sexual',
      'Jeito de ser e personalidade',
      'Conversa e conexão mental',
      'Mistério e vontade de conhecer melhor'
    ],
    required: true,
    intentions: ['NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'expectativas_primeiro_encontro',
    trait: SexualTrait.EXPECTATIVAS_INICIAIS,
    category: 'Primeiro Encontro',
    type: 'radio',
    question: 'O que você espera do primeiro encontro íntimo?',
    options: [
      'Sexo incrível e muita química',
      'Conhecer melhor a pessoa na intimidade',
      'Quebrar o gelo de forma gostosa',
      'Ver se rola compatibilidade sexual'
    ],
    required: true,
    intentions: ['NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  // =======================================
  // PERGUNTAS ESPECÍFICAS POR PAPEL SEXUAL
  // =======================================
  
  // PERGUNTAS PARA ATIVOS
  {
    id: 'ativo_tamanho',
    trait: SexualTrait.FISICO_ATIVO,
    category: 'Características Físicas',
    type: 'number',
    question: 'Qual o tamanho do seu pênis? (cm)',
    placeholder: 'Ex: 18',
    required: true,
    intentions: ['QUERO_SEXO', 'JA_FIQUEI_QUERO_NOVAMENTE', 'NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO'],
    weight: 0.7
  },

  {
    id: 'ativo_resistencia',
    trait: SexualTrait.TECNICA_ATIVO,
    category: 'Performance',
    type: 'radio',
    question: 'Como você avalia sua resistência?',
    options: [
      'Excelente - aguento bastante tempo',
      'Boa - consigo satisfazer bem',
      'Normal - varia conforme o dia',
      'Ainda estou melhorando'
    ],
    required: true,
    intentions: ['QUERO_SEXO', 'JA_FIQUEI_QUERO_NOVAMENTE', 'NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO'],
    weight: 0.8
  },

  {
    id: 'ativo_estilo_dominacao',
    trait: SexualTrait.TECNICA_ATIVO,
    category: 'Estilo Sexual',
    type: 'radio',
    question: 'Como você gosta de conduzir o sexo?',
    options: [
      'Bem dominante e no controle',
      'Firme mas atento ao parceiro',
      'Equilibrado, deixo o parceiro participar',
      'Mais suave e carinhoso'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO', 'QUERO_SEXO', 'JA_FIQUEI_QUERO_NOVAMENTE', 'NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO'],
    weight: 0.85
  },

  // PERGUNTAS PARA PASSIVOS
  {
    id: 'passivo_bunda',
    trait: SexualTrait.FISICO_PASSIVO,
    category: 'Características Físicas',
    type: 'radio',
    question: 'Como você descreveria sua bunda?',
    options: [
      'Grande e empinada',
      'Média e proporcional',
      'Pequena mas firme',
      'Atlética e definida'
    ],
    required: true,
    intentions: ['QUERO_SEXO', 'JA_FIQUEI_QUERO_NOVAMENTE', 'NAO_FIQUEI_QUERO_FICAR'],
    roles: ['PASS', 'VERSATIL_PASS'],
    weight: 0.6
  },

  {
    id: 'passivo_adaptacao',
    trait: SexualTrait.ADAPTACAO_PASSIVO,
    category: 'Adaptação',
    type: 'radio',
    question: 'Como é sua adaptação inicial?',
    options: [
      'Me adapto rápido a qualquer tamanho',
      'Preciso ir com calma no início',
      'Preciso de muito carinho e paciência',
      'Depende muito do tamanho do parceiro'
    ],
    required: true,
    intentions: ['QUERO_SEXO', 'JA_FIQUEI_QUERO_NOVAMENTE', 'NAO_FIQUEI_QUERO_FICAR'],
    roles: ['PASS', 'VERSATIL_PASS'],
    followUps: {
      'Preciso de muito carinho e paciência': ['passivo_cuidado_preferido'],
      'Depende muito do tamanho do parceiro': ['passivo_tamanho_limite']
    },
    weight: 0.9
  },

  {
    id: 'passivo_cuidado_preferido',
    trait: SexualTrait.ADAPTACAO_PASSIVO,
    category: 'Tratamento',
    type: 'radio',
    question: 'Como você gosta de ser tratado?',
    options: [
      'Com muito carinho e delicadeza sempre',
      'Carinhoso no início, pode intensificar depois',
      'Posso aguentar intensidade desde o início',
      'Gosto de ser dominado e controlado'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO', 'QUERO_SEXO', 'JA_FIQUEI_QUERO_NOVAMENTE', 'NAO_FIQUEI_QUERO_FICAR'],
    roles: ['PASS', 'VERSATIL_PASS'],
    weight: 0.85
  },

  {
    id: 'passivo_tamanho_limite',
    trait: SexualTrait.ADAPTACAO_PASSIVO,
    category: 'Limitações',
    type: 'radio',
    question: 'Qual tamanho você consegue lidar melhor?',
    options: [
      'Qualquer tamanho, sou bem adaptável',
      'Até 20cm consigo bem',
      'Prefiro entre 15-18cm',
      'Até 15cm é mais confortável'
    ],
    required: true,
    intentions: ['QUERO_SEXO', 'JA_FIQUEI_QUERO_NOVAMENTE', 'NAO_FIQUEI_QUERO_FICAR'],
    roles: ['PASS', 'VERSATIL_PASS'],
    weight: 0.75
  },

  // PERGUNTAS PARA VERSÁTEIS
  {
    id: 'versatil_preferencia',
    trait: SexualTrait.VERSATILIDADE,
    category: 'Versatilidade',
    type: 'radio',
    question: 'Em que posição você se sente mais à vontade?',
    options: [
      'Sendo ativo na maioria das vezes',
      'Sendo passivo na maioria das vezes',
      'Verdadeiramente 50/50',
      'Depende do parceiro e da química'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO', 'QUERO_SEXO', 'JA_FIQUEI_QUERO_NOVAMENTE', 'NAO_FIQUEI_QUERO_FICAR'],
    roles: ['VERSATIL_ATIVO', 'VERSATIL_PASS'],
    weight: 0.8
  },

  {
    id: 'versatil_decisao',
    trait: SexualTrait.VERSATILIDADE,
    category: 'Versatilidade',
    type: 'radio',
    question: 'Como vocês decidem quem vai ser ativo/passivo?',
    options: [
      'Converso abertamente antes',
      'Deixo rolar naturalmente no momento',
      'Prefiro que o parceiro tome a iniciativa',
      'Gosto de alternar durante o encontro'
    ],
    required: true,
    intentions: ['QUERO_RELACIONAMENTO', 'QUERO_SEXO', 'JA_FIQUEI_QUERO_NOVAMENTE', 'NAO_FIQUEI_QUERO_FICAR'],
    roles: ['VERSATIL_ATIVO', 'VERSATIL_PASS'],
    weight: 0.75
  }
];

// ================================
// FUNÇÕES DE FILTRAGEM E UTILIDADE
// ================================

/**
 * Filtra perguntas baseado na intenção e papel sexual do usuário
 */
export function getQuestionsForIntentionAndRole(
  intention: UserIntention, 
  role: SexualRole
): AdaptiveQuestion[] {
  return QUESTION_BANK.filter(question => 
    question.intentions.includes(intention) && question.roles.includes(role)
  );
}

/**
 * Pega perguntas universais que se aplicam a qualquer intenção
 */
export function getUniversalQuestions(): AdaptiveQuestion[] {
  return QUESTION_BANK.filter(question => 
    question.intentions.length === 4 // Se aplica a todas as intenções
  );
}

/**
 * Pega perguntas específicas para uma intenção, independente do papel
 */
export function getQuestionsForIntention(intention: UserIntention): AdaptiveQuestion[] {
  return QUESTION_BANK.filter(question => question.intentions.includes(intention));
}

/**
 * Pega perguntas específicas para um papel, independente da intenção
 */
export function getQuestionsForRole(role: SexualRole): AdaptiveQuestion[] {
  return QUESTION_BANK.filter(question => question.roles.includes(role));
}

/**
 * Pega perguntas de follow-up baseado na resposta anterior
 */
export function getFollowUpQuestions(questionId: string, answer: string): string[] {
  const question = QUESTION_BANK.find(q => q.id === questionId);
  return question?.followUps?.[answer] || [];
}

/**
 * Converte resposta em score de compatibilidade (0-1)
 */
export function mapAnswerToScore(question: AdaptiveQuestion, answer: string): number {
  if (!question.options) {
    // Para inputs numéricos
    if (question.type === 'number') {
      const value = parseFloat(answer);
      if (question.id === 'ativo_tamanho') {
        // Normalizar tamanho de pênis (12-25cm range típico)
        return Math.max(0, Math.min(1, (value - 12) / 13));
      }
    }
    return 0.5; // Default para inputs de texto
  }
  
  const optionIndex = question.options.indexOf(answer);
  if (optionIndex === -1) return 0.5;
  
  // Normalizar para 0-1 (primeira opção = 1, última = 0)
  return 1 - (optionIndex / (question.options.length - 1));
}

/**
 * Calcula compatibilidade entre duas pessoas baseado nas respostas
 */
export function calculateCompatibility(
  user1Answers: Record<string, string>,
  user2Answers: Record<string, string>
): number {
  let totalWeight = 0;
  let compatibilitySum = 0;

  // Pega apenas questões que ambos responderam
  const commonQuestions = Object.keys(user1Answers).filter(
    questionId => questionId in user2Answers
  );

  commonQuestions.forEach(questionId => {
    const question = QUESTION_BANK.find(q => q.id === questionId);
    if (!question) return;

    const user1Score = mapAnswerToScore(question, user1Answers[questionId]);
    const user2Score = mapAnswerToScore(question, user2Answers[questionId]);
    
    // Compatibilidade = 1 - diferença absoluta entre scores
    const compatibility = 1 - Math.abs(user1Score - user2Score);
    
    compatibilitySum += compatibility * question.weight;
    totalWeight += question.weight;
  });

  return totalWeight > 0 ? compatibilitySum / totalWeight : 0;
}

/**
 * Pega todas as categorias de perguntas disponíveis
 */
export function getQuestionCategories(): string[] {
  return Array.from(new Set(QUESTION_BANK.map(q => q.category)));
}

/**
 * Pega perguntas organizadas por categoria
 */
export function getQuestionsByCategory(
  intention: UserIntention, 
  role: SexualRole
): Record<string, AdaptiveQuestion[]> {
  const questions = getQuestionsForIntentionAndRole(intention, role);
  const result: Record<string, AdaptiveQuestion[]> = {};
  
  questions.forEach(question => {
    if (!result[question.category]) {
      result[question.category] = [];
    }
    result[question.category].push(question);
  });
  
  return result;
}