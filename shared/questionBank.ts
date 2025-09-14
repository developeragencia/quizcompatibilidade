// New cascading intention system
export type PrimaryIntention = 'RELACIONAMENTO' | 'SEXO';

export type RelationshipSubIntention = 
  | 'JA_FIQUEI'
  | 'NUNCA_FIQUEI'
  | 'E_MEU_EX'
  | 'SO_FICAMOS_NAO_NAMORAMOS';

export type SexSubIntention = 
  | 'JA_FIQUEI_QUERO_NOVAMENTE'
  | 'NAO_FIQUEI_QUERO_FICAR';

export type UserIntention = 
  | `RELACIONAMENTO_${RelationshipSubIntention}`
  | `SEXO_${SexSubIntention}`;

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
  VERSATILIDADE = 'versatilidade',
  
  // Para contextos específicos
  TRANSICAO_HOOKUP_RELACIONAMENTO = 'transicao_hookup_relacionamento',
  HISTORIA_EX = 'historia_ex',
  SUPERACAO_PASSADO = 'superacao_passado',
  PRIMEIROS_PASSOS = 'primeiros_passos',
  CONSTRUCAO_CONFIANCA = 'construcao_confianca',
  RESOLUCAO_PROBLEMAS_ANTERIORES = 'resolucao_problemas_anteriores',
  CASUAL_PARA_SERIO = 'casual_para_serio',
  EXPECTATIVAS_SEXUAIS_REPETIDAS = 'expectativas_sexuais_repetidas',
  ANSIEDADE_PRIMEIRA_VEZ = 'ansiedade_primeira_vez',
  COMPATIBILIDADE_INICIAL = 'compatibilidade_inicial'
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
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
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS', 'SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS', 'SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS', 'SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
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
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS', 'SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['VERSATIL_ATIVO', 'VERSATIL_PASS'],
    weight: 0.75
  },

  // ===========================================
  // PERGUNTAS ESPECÍFICAS POR CONTEXTO
  // ===========================================
  
  // =======================================
  // RELACIONAMENTO_JA_FIQUEI (Transição de hookup para relacionamento)
  // =======================================
  
  {
    id: 'ja_fiquei_transicao_motivo',
    trait: SexualTrait.TRANSICAO_HOOKUP_RELACIONAMENTO,
    category: 'Transição para Relacionamento',
    type: 'radio',
    question: 'Por que você quer transformar isso em relacionamento?',
    options: [
      'A química sexual foi incrível e quero mais',
      'Ele tem tudo que procuro num parceiro',
      'Sinto que pode rolar algo sério entre nós',
      'Cansei de ficar com várias pessoas, quero algo estável'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'A química sexual foi incrível e quero mais': ['ja_fiquei_sexo_qualidade'],
      'Sinto que pode rolar algo sério entre nós': ['ja_fiquei_sinais_reciprocidade']
    },
    weight: 0.9
  },

  {
    id: 'ja_fiquei_sexo_qualidade',
    trait: SexualTrait.TRANSICAO_HOOKUP_RELACIONAMENTO,
    category: 'Transição para Relacionamento',
    type: 'radio',
    question: 'Como foi a experiência sexual com ele?',
    options: [
      'Perfeita, tivemos uma conexão incrível',
      'Muito boa, mas podemos melhorar com tempo',
      'Boa no geral, gostei do jeito dele',
      'Satisfatória, mas o que mais me atrai é a pessoa'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'ja_fiquei_sinais_reciprocidade',
    trait: SexualTrait.TRANSICAO_HOOKUP_RELACIONAMENTO,
    category: 'Transição para Relacionamento',
    type: 'radio',
    question: 'Que sinais ele dá de que também quer algo sério?',
    options: [
      'Conversa comigo todos os dias, demonstra interesse',
      'Me trata com carinho, não como hookup casual',
      'Fala sobre planos futuros incluindo eu',
      'Ainda não tenho certeza, preciso descobrir'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Ainda não tenho certeza, preciso descobrir': ['ja_fiquei_como_abordar']
    },
    weight: 0.9
  },

  {
    id: 'ja_fiquei_como_abordar',
    trait: SexualTrait.TRANSICAO_HOOKUP_RELACIONAMENTO,
    category: 'Transição para Relacionamento',
    type: 'radio',
    question: 'Como você pretende abordar o assunto?',
    options: [
      'Vou falar diretamente que quero namorar',
      'Vou sugerir exclusividade primeiro',
      'Vou deixar rolar naturalmente e ver os sinais',
      'Vou perguntar o que ele pensa sobre relacionamentos'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'ja_fiquei_expectativas_mudanca',
    trait: SexualTrait.TRANSICAO_HOOKUP_RELACIONAMENTO,
    category: 'Transição para Relacionamento',
    type: 'radio',
    question: 'O que você espera que mude se virarem namorados?',
    options: [
      'Mais intimidade emocional e carinho',
      'Exclusividade e compromisso',
      'Mais tempo juntos e planos em comum',
      'Que não mude muito, já está bom assim'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'ja_fiquei_medo_rejeicao',
    trait: SexualTrait.TRANSICAO_HOOKUP_RELACIONAMENTO,
    category: 'Transição para Relacionamento',
    type: 'radio',
    question: 'Qual seu maior medo nessa transição?',
    options: [
      'Que ele só me veja como hookup casual',
      'Que estrague o que já temos de bom',
      'Que ele não esteja pronto para compromisso',
      'Que descobrimos que não somos compatíveis'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  // =======================================
  // RELACIONAMENTO_NUNCA_FIQUEI (Construindo relacionamento do zero)
  // =======================================

  {
    id: 'nunca_fiquei_primeira_atracao',
    trait: SexualTrait.PRIMEIROS_PASSOS,
    category: 'Primeiros Passos',
    type: 'radio',
    question: 'O que mais te atrai nesta pessoa?',
    options: [
      'A personalidade e jeito de ser',
      'A aparência física e presença',
      'A inteligência e forma de pensar',
      'A energia e química que sinto'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'nunca_fiquei_conhecimento_mutuo',
    trait: SexualTrait.CONSTRUCAO_CONFIANCA,
    category: 'Construindo Confiança',
    type: 'radio',
    question: 'Como vocês se conheceram?',
    options: [
      'Apps de relacionamento',
      'Através de amigos em comum',
      'Em ambientes sociais (festas, eventos)',
      'Trabalho, estudos ou atividades em comum'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.7
  },

  {
    id: 'nunca_fiquei_ritmo_ideal',
    trait: SexualTrait.PRIMEIROS_PASSOS,
    category: 'Primeiros Passos',
    type: 'radio',
    question: 'Qual ritmo você prefere para conhecê-lo melhor?',
    options: [
      'Devagar, construindo confiança antes da intimidade',
      'Natural, deixando as coisas fluírem',
      'Um pouco mais rápido, gosto de intensidade',
      'Muito devagar, preciso ter certeza primeiro'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Devagar, construindo confiança antes da intimidade': ['nunca_fiquei_construir_confianca'],
      'Muito devagar, preciso ter certeza primeiro': ['nunca_fiquei_inseguracas']
    },
    weight: 0.9
  },

  {
    id: 'nunca_fiquei_construir_confianca',
    trait: SexualTrait.CONSTRUCAO_CONFIANCA,
    category: 'Construindo Confiança',
    type: 'radio',
    question: 'Como você gosta de construir confiança?',
    options: [
      'Conversas profundas sobre sonhos e valores',
      'Experiências juntos, conhecer no dia a dia',
      'Demonstrações de carinho e atenção',
      'Tempo de qualidade e intimidade emocional'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'nunca_fiquei_inseguracas',
    trait: SexualTrait.CONSTRUCAO_CONFIANCA,
    category: 'Construindo Confiança',
    type: 'radio',
    question: 'Quais são suas principais inseguranças?',
    options: [
      'Medo de não ser o suficiente pra ele',
      'Ansiedade sobre performance sexual',
      'Receio de me abrir emocionalmente',
      'Medo de repetir erros de relacionamentos passados'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'nunca_fiquei_expectativas_primeiro_beijo',
    trait: SexualTrait.PRIMEIROS_PASSOS,
    category: 'Primeiros Passos',
    type: 'radio',
    question: 'Como você imagina o primeiro momento íntimo?',
    options: [
      'Romântico e especial, com calma',
      'Natural e espontâneo quando rolar clima',
      'Com paixão e intensidade',
      'Sem pressa, quando ambos estivermos prontos'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  // =======================================
  // RELACIONAMENTO_E_MEU_EX (Reatando com ex-parceiro)
  // =======================================

  {
    id: 'ex_motivo_termino',
    trait: SexualTrait.HISTORIA_EX,
    category: 'História do Relacionamento',
    type: 'radio',
    question: 'Qual foi o principal motivo do término?',
    options: [
      'Problemas de comunicação e brigas',
      'Diferenças de objetivos de vida',
      'Infidelidade ou questões de confiança',
      'Circunstâncias externas (distância, trabalho, família)'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Problemas de comunicação e brigas': ['ex_melhorou_comunicacao'],
      'Infidelidade ou questões de confiança': ['ex_confianca_perdoao'],
      'Circunstâncias externas (distância, trabalho, família)': ['ex_situacao_mudou']
    },
    weight: 0.95
  },

  {
    id: 'ex_melhorou_comunicacao',
    trait: SexualTrait.RESOLUCAO_PROBLEMAS_ANTERIORES,
    category: 'Resolvendo Problemas',
    type: 'radio',
    question: 'Como você melhorou sua comunicação?',
    options: [
      'Aprendi a expressar meus sentimentos sem atacar',
      'Pratico mais a escuta e empatia',
      'Busquei terapia ou ajuda profissional',
      'Amadureci e tenho mais paciência agora'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'ex_confianca_perdoao',
    trait: SexualTrait.SUPERACAO_PASSADO,
    category: 'Superação',
    type: 'radio',
    question: 'Como você lida com as questões de confiança?',
    options: [
      'Perdoei completamente e quero recomeçar',
      'Ainda tenho algumas inseguranças, mas quero tentar',
      'Ele demonstrou mudanças genuínas',
      'Decidimos ser transparentes sobre tudo'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.95
  },

  {
    id: 'ex_situacao_mudou',
    trait: SexualTrait.RESOLUCAO_PROBLEMAS_ANTERIORES,
    category: 'Resolvendo Problemas',
    type: 'radio',
    question: 'Como a situação mudou agora?',
    options: [
      'Não temos mais distância geográfica',
      'Nossa situação profissional está mais estável',
      'Questões familiares foram resolvidas',
      'Ambos amadurecemos e temos mais clareza'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'ex_tempo_separados',
    trait: SexualTrait.HISTORIA_EX,
    category: 'História do Relacionamento',
    type: 'radio',
    question: 'Quanto tempo ficaram separados?',
    options: [
      'Algumas semanas a poucos meses',
      '3 a 6 meses',
      '6 meses a 1 ano',
      'Mais de 1 ano'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Mais de 1 ano': ['ex_mudancas_pessoais'],
      '6 meses a 1 ano': ['ex_saudade_vs_razao']
    },
    weight: 0.8
  },

  {
    id: 'ex_mudancas_pessoais',
    trait: SexualTrait.SUPERACAO_PASSADO,
    category: 'Superação',
    type: 'radio',
    question: 'Como vocês mudaram durante esse tempo?',
    options: [
      'Amadurecemos muito, somos pessoas melhores',
      'Tivemos outras experiências e sabemos o que queremos',
      'Resolvemos questões pessoais que afetavam o relacionamento',
      'Percebemos que éramos feitos um para o outro'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'ex_intimidade_diferente',
    trait: SexualTrait.SUPERACAO_PASSADO,
    category: 'Superação',
    type: 'radio',
    question: 'Como você vê a intimidade física agora?',
    options: [
      'Vai ser ainda melhor, conhecemos bem um ao outro',
      'Sinto um pouco de estranheza, mas vai passar',
      'É como se nunca tivéssemos parado',
      'Quero redescobrir ele de forma nova'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  // =======================================
  // RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS (Transição de casual para sério)
  // =======================================

  {
    id: 'casual_para_serio_duracao',
    trait: SexualTrait.CASUAL_PARA_SERIO,
    category: 'Casual para Sério',
    type: 'radio',
    question: 'Há quanto tempo vocês ficam casualmente?',
    options: [
      'Algumas semanas',
      '1 a 3 meses',
      '3 a 6 meses',
      'Mais de 6 meses'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Mais de 6 meses': ['casual_para_serio_porque_agora']
    },
    weight: 0.85
  },

  {
    id: 'casual_para_serio_porque_agora',
    trait: SexualTrait.CASUAL_PARA_SERIO,
    category: 'Casual para Sério',
    type: 'radio',
    question: 'Por que quer transformar em relacionamento agora?',
    options: [
      'Percebemos que temos mais em comum do que pensávamos',
      'Cansei da situação casual, quero estabilidade',
      'Sinto que ele também quer algo mais sério',
      'Estou desenvolvendo sentimentos mais profundos'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'casual_para_serio_regras_atuais',
    trait: SexualTrait.CASUAL_PARA_SERIO,
    category: 'Casual para Sério',
    type: 'radio',
    question: 'Como funciona o esquema casual de vocês?',
    options: [
      'Ficamos só nós dois, mas sem compromisso',
      'Cada um fica com outras pessoas também',
      'Não falamos sobre exclusividade',
      'É mais como amigos que fazem sexo'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Cada um fica com outras pessoas também': ['casual_para_serio_exclusividade_mudanca'],
      'É mais como amigos que fazem sexo': ['casual_para_serio_sentimentos']
    },
    weight: 0.85
  },

  {
    id: 'casual_para_serio_exclusividade_mudanca',
    trait: SexualTrait.CASUAL_PARA_SERIO,
    category: 'Casual para Sério',
    type: 'radio',
    question: 'Como você se sente sobre exclusividade?',
    options: [
      'Já parei de ficar com outros faz tempo',
      'Estou disposto a parar se virarmos namorados',
      'Ainda gosto da liberdade, mas posso mudar',
      'Preciso ter certeza que vale a pena primeiro'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'casual_para_serio_sentimentos',
    trait: SexualTrait.CASUAL_PARA_SERIO,
    category: 'Casual para Sério',
    type: 'radio',
    question: 'Como seus sentimentos mudaram?',
    options: [
      'Comecei a sentir mais carinho e apego',
      'Penso nele mais do que deveria para algo casual',
      'Sinto ciúmes quando ele fica com outros',
      'Percebo que nossa conexão vai além do sexo'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'casual_para_serio_medo_perder',
    trait: SexualTrait.CASUAL_PARA_SERIO,
    category: 'Casual para Sério',
    type: 'radio',
    question: 'Qual seu maior medo nessa transição?',
    options: [
      'Que ele prefira manter tudo como está',
      'Que estrague nossa amizade e química',
      'Que descubra que não somos compatíveis romanticamente',
      'Que o relacionamento seja menos divertido que o casual'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'casual_para_serio_diferencial',
    trait: SexualTrait.CASUAL_PARA_SERIO,
    category: 'Casual para Sério',
    type: 'radio',
    question: 'O que faz essa pessoa especial comparada aos outros casuais?',
    options: [
      'A conexão emocional é única',
      'O sexo é muito melhor com ele',
      'Nos damos bem fora da cama também',
      'Sinto que posso ser eu mesmo com ele'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  // =======================================
  // SEXO_JA_FIQUEI_QUERO_NOVAMENTE (Expansão - mais variedade)
  // =======================================

  {
    id: 'ja_fiquei_sexo_frequencia_desejada',
    trait: SexualTrait.EXPECTATIVAS_SEXUAIS_REPETIDAS,
    category: 'Repetindo a Experiência',
    type: 'radio',
    question: 'Com que frequência gostaria de se encontrar com ele?',
    options: [
      'Sempre que possível, virou vício',
      'Algumas vezes por semana',
      'Fins de semana quando der vontade',
      'Sem compromisso, quando rolar clima'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'ja_fiquei_sexo_pontos_altos',
    trait: SexualTrait.MELHORIA_EXPERIENCIA,
    category: 'Melhorando a Experiência',
    type: 'radio',
    question: 'O que mais gostou no encontro anterior?',
    options: [
      'A química e conexão que rolou',
      'O jeito dele na cama, a técnica',
      'A intensidade e paixão',
      'Como me senti à vontade e confortável'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'ja_fiquei_sexo_areas_melhorar',
    trait: SexualTrait.MELHORIA_EXPERIENCIA,
    category: 'Melhorando a Experiência',
    type: 'radio',
    question: 'O que poderia ser melhor no próximo encontro?',
    options: [
      'Mais foreplay e preliminares',
      'Comunicação sobre preferências',
      'Mais tempo sem pressa',
      'Experimentar posições diferentes'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Comunicação sobre preferências': ['ja_fiquei_sexo_feedback'],
      'Experimentar posições diferentes': ['ja_fiquei_sexo_experimentacao']
    },
    weight: 0.9
  },

  {
    id: 'ja_fiquei_sexo_feedback',
    trait: SexualTrait.MELHORIA_EXPERIENCIA,
    category: 'Melhorando a Experiência',
    type: 'radio',
    question: 'Como vocês lidam com feedback sexual?',
    options: [
      'Falamos abertamente sobre o que gostamos',
      'Damos dicas no momento, de forma sutil',
      'Ainda estamos aprendendo a nos comunicar',
      'Preferimos descobrir na prática'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'ja_fiquei_sexo_experimentacao',
    trait: SexualTrait.MELHORIA_EXPERIENCIA,
    category: 'Melhorando a Experiência',
    type: 'radio',
    question: 'Que tipo de experimentação vocês querem tentar?',
    options: [
      'Posições que não fizemos ainda',
      'Lugares diferentes (não só cama)',
      'Brinquedos ou acessórios',
      'Role-play ou fantasias'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.7
  },

  {
    id: 'ja_fiquei_sexo_emocional_vs_fisico',
    trait: SexualTrait.EXPECTATIVAS_SEXUAIS_REPETIDAS,
    category: 'Repetindo a Experiência',
    type: 'radio',
    question: 'Como você vê essa repetição?',
    options: [
      'Puramente sexual, uma ótima transa',
      'Sexo com química emocional especial',
      'Amizade colorida gostosa',
      'Pode rolar algo mais se continuar assim'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  // =======================================
  // SEXO_NAO_FIQUEI_QUERO_FICAR (Expansão - específicas para primeira vez)
  // =======================================

  {
    id: 'nao_fiquei_ansiedade_nivel',
    trait: SexualTrait.ANSIEDADE_PRIMEIRA_VEZ,
    category: 'Primeira Vez',
    type: 'radio',
    question: 'Quão ansioso você está para o primeiro encontro?',
    options: [
      'Bem ansioso, é alguém que me interessa muito',
      'Um pouco nervoso, mas animado',
      'Tranquilo, deixando rolar naturalmente',
      'Confiante, gosto de novas experiências'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Bem ansioso, é alguém que me interessa muito': ['nao_fiquei_pressao_performance'],
      'Um pouco nervoso, mas animado': ['nao_fiquei_expectativas_realisticas']
    },
    weight: 0.8
  },

  {
    id: 'nao_fiquei_pressao_performance',
    trait: SexualTrait.ANSIEDADE_PRIMEIRA_VEZ,
    category: 'Primeira Vez',
    type: 'radio',
    question: 'O que mais te deixa ansioso?',
    options: [
      'Medo de não ter uma boa performance',
      'Receio de não agradar fisicamente',
      'Ansiedade sobre minha experiência/inexperiência',
      'Medo de não rolar química'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'nao_fiquei_expectativas_realisticas',
    trait: SexualTrait.COMPATIBILIDADE_INICIAL,
    category: 'Compatibilidade',
    type: 'radio',
    question: 'Suas expectativas para o primeiro encontro:',
    options: [
      'Sexo incrível desde o primeiro momento',
      'Boa química, mas pode melhorar com tempo',
      'Conhecer como ele é na intimidade',
      'Ver se somos compatíveis sexualmente'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'nao_fiquei_ambiente_ideal',
    trait: SexualTrait.COMPATIBILIDADE_INICIAL,
    category: 'Compatibilidade',
    type: 'radio',
    question: 'Como imagina o ambiente ideal para vocês?',
    options: [
      'Na casa de um de nós, ambiente privado',
      'Motel, lugar neutro e sem pressa',
      'Onde rolar, se a química estiver boa',
      'Prefiro conhecer melhor antes de decidir'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.75
  },

  {
    id: 'nao_fiquei_comunicacao_preferencias',
    trait: SexualTrait.ANSIEDADE_PRIMEIRA_VEZ,
    category: 'Primeira Vez',
    type: 'radio',
    question: 'Como vocês conversam sobre preferências?',
    options: [
      'Já conversamos sobre o que gostamos',
      'Vamos descobrindo na hora',
      'Ele parece experiente, confio no feeling dele',
      'Ainda não falamos sobre isso'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'nao_fiquei_experiencia_comparacao',
    trait: SexualTrait.COMPATIBILIDADE_INICIAL,
    category: 'Compatibilidade',
    type: 'radio',
    question: 'Como você se sente em relação à experiência dele?',
    options: [
      'Parece bem experiente, isso me atrai',
      'Temos níveis similares de experiência',
      'Eu sou mais experiente que ele',
      'Não sei muito sobre a experiência dele ainda'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'nao_fiquei_depois_primeiro_encontro',
    trait: SexualTrait.COMPATIBILIDADE_INICIAL,
    category: 'Compatibilidade',
    type: 'radio',
    question: 'O que você espera após o primeiro encontro?',
    options: [
      'Que vire algo regular se for bom',
      'Avaliar se queremos repetir',
      'Pode ser só uma experiência única',
      'Quero ver se rola algo além do sexo'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
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