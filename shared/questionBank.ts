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

// Constantes para validação
export const ALL_INTENTIONS: UserIntention[] = [
  'RELACIONAMENTO_JA_FIQUEI',
  'RELACIONAMENTO_NUNCA_FIQUEI', 
  'RELACIONAMENTO_E_MEU_EX',
  'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS',
  'SEXO_JA_FIQUEI_QUERO_NOVAMENTE',
  'SEXO_NAO_FIQUEI_QUERO_FICAR'
];

export const ALL_ROLES: SexualRole[] = [
  'ATIVO',
  'VERSATIL_ATIVO', 
  'VERSATIL_PASS',
  'PASS'
];

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
  
  // VALORES E OBJETIVOS DE VIDA - Contextualizadas por intenção
  {
    id: 'relacionamento_objetivo_ja_fiquei',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Como você quer transformar o que vocês já viveram em relacionamento?',
    options: [
      'Relacionamento sério - já temos química, agora quero compromisso',
      'Namoro exclusivo - manter nossa liberdade mas só nós dois',
      'Dating mais sério - conhecer outros lados dele além do sexual',
      'Amizade colorida consistente - sexo regular com carinho'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Relacionamento sério - já temos química, agora quero compromisso': ['relacionamento_tempo_morar_ja_fiquei', 'relacionamento_filhos_ja_fiquei']
    },
    weight: 0.95
  },

  {
    id: 'relacionamento_objetivo_nunca_fiquei',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento', 
    type: 'radio',
    question: 'O que você busca construir com esta pessoa?',
    options: [
      'Relacionamento sério desde o início - ele me parece ideal',
      'Namoro para conhecer melhor - ir devagar mas com intenção',
      'Dating exclusivo - testar compatibilidade sem pressa',
      'Conexão especial - ver aonde nossa química pode levar'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Relacionamento sério desde o início - ele me parece ideal': ['relacionamento_tempo_morar_nunca_fiquei', 'relacionamento_filhos_nunca_fiquei']
    },
    weight: 0.95
  },

  {
    id: 'relacionamento_objetivo_ex',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio', 
    question: 'Como você vê a reconstrução do relacionamento com seu ex?',
    options: [
      'Relacionamento maduro - somos pessoas melhores agora',
      'Segunda chance mais consciente - sabemos nossos erros',
      'Namoro renovado - manter o que era bom, mudar o que não era',
      'Reconexão gradual - reconstruir confiança passo a passo'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Relacionamento maduro - somos pessoas melhores agora': ['relacionamento_tempo_morar_ex', 'relacionamento_filhos_ex']
    },
    weight: 0.95
  },

  {
    id: 'relacionamento_objetivo_casual_para_serio',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Como quer transformar o esquema casual em relacionamento?',
    options: [
      'Namoro exclusivo - oficializar o que já somos na prática', 
      'Relacionamento sério - dar o próximo passo natural',
      'Dating comprometido - sair da zona de incerteza',
      'Parceria estável - unir o melhor do casual com segurança emocional'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Relacionamento sério - dar o próximo passo natural': ['relacionamento_tempo_morar_casual_para_serio', 'relacionamento_filhos_casual_para_serio']
    },
    weight: 0.95
  },

  {
    id: 'relacionamento_tempo_morar_ja_fiquei',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Considerando que vocês já se conhecem intimamente, quando pensaria em morar junto?',
    options: [
      'Após 6 meses de namoro - já temos base sexual boa',
      '1 ano de relacionamento - tempo para ver se funciona em tudo',
      'Mais de 1 ano - quero ter certeza da parte emocional',
      'Quando sentir segurança total - sexo é só uma parte'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'relacionamento_tempo_morar_nunca_fiquei',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Em quanto tempo você pensaria em morar junto com ele?',
    options: [
      'Após 1 a 2 anos - tempo para nos conhecermos completamente',
      'Entre 6 meses a 1 ano se a conexão for especial',
      'Mais de 2 anos - prefiro ter absoluta certeza',
      'Quando sentirmos que somos almas gêmeas'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'relacionamento_tempo_morar_ex',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Considerando que vocês já moraram/conviveram antes, como veem isso agora?',
    options: [
      'Mais rápido que antes - já sabemos que funciona',
      '1 a 2 anos - tempo para reconstruir confiança',
      'Muito devagar - precisamos ter certeza desta vez',
      'Quando resolvermos todas as questões do passado'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'relacionamento_tempo_morar_casual_para_serio',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Já que vocês se veem regularmente, quando pensaria em morar junto?',
    options: [
      'Logo após oficializar - já passamos muito tempo juntos',
      '6 meses a 1 ano de namoro oficial',
      '1 a 2 anos - queremos ter certeza da mudança',
      'Sem pressa - primeiro vamos nos acostumar a ser um casal'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'relacionamento_filhos_ja_fiquei',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Se o relacionamento com ele der certo, como vê a questão de filhos?',
    options: [
      'Quero ter filhos - seria ótimo se ele também quiser',
      'Talvez, depende de como evoluir nosso relacionamento',
      'Não é prioridade agora - foco em nos consolidar primeiro',
      'Não quero filhos - espero que ele entenda isso'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'relacionamento_filhos_nunca_fiquei',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Como você vê a possibilidade de formar uma família com ele?',
    options: [
      'Definitivamente quero filhos se virarmos um casal sério',
      'Talvez, precisamos nos conhecer melhor primeiro',
      'Não penso nisso agora - primeiro conhecer a pessoa',
      'Não quero filhos, mas posso amar alguém que queira'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'relacionamento_filhos_ex',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Sobre ter filhos juntos, como vocês veem isso agora?',
    options: [
      'Agora estamos mais maduros e prontos para ser pais',
      'Ainda queremos, mas desta vez faremos diferente',
      'Essa questão contribuiu para nossa separação - precisamos conversar',
      'Não queremos mais - focamos só em nós dois'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.95
  },

  {
    id: 'relacionamento_filhos_casual_para_serio',
    trait: SexualTrait.OBJETIVOS_VIDA,
    category: 'Objetivos de Relacionamento',
    type: 'radio',
    question: 'Se oficializarem o relacionamento, pensam em filhos futuramente?',
    options: [
      'Sim, seria um passo natural na nossa evolução',
      'Talvez, dependendo de como nos adaptarmos ao namoro',
      'Não discutimos isso ainda - é muito cedo',
      'Não queremos - preferimos nossa liberdade'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'relacionamento_valores_ja_fiquei',
    trait: SexualTrait.VALORES,
    category: 'Valores e Compatibilidade',
    type: 'radio',
    question: 'Além da química sexual que já existe, o que mais você valoriza nele?',
    options: [
      'Honestidade sobre sentimentos - quero saber se é recíproco',
      'Carinho fora da cama - me trata bem em tudo',
      'Maturidade emocional - sabe o que quer da vida',
      'Compatibilidade natural - nos entendemos facilmente'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'relacionamento_valores_nunca_fiquei',
    trait: SexualTrait.VALORES,
    category: 'Valores e Compatibilidade',
    type: 'radio',
    question: 'O que mais te atrai nele para um relacionamento?',
    options: [
      'Honestidade e caráter - parece ser uma pessoa íntegra',
      'Carinho e sensibilidade - trata as pessoas bem',
      'Ambição e objetivos - quer crescer na vida',
      'Humor e leveza - me faz rir e me sinto bem'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'relacionamento_valores_ex',
    trait: SexualTrait.VALORES,
    category: 'Valores e Compatibilidade',
    type: 'radio',
    question: 'O que você mais valoriza nele agora, depois de tudo?',
    options: [
      'Honestidade sobre nossos erros - reconhece a parte dele',
      'Carinho que ainda existe - nunca deixou de me amar',
      'Crescimento pessoal - virou uma pessoa melhor',
      'Nossa química única - ninguém me entende como ele'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.95
  },

  {
    id: 'relacionamento_valores_casual_para_serio',
    trait: SexualTrait.VALORES,
    category: 'Valores e Compatibilidade',
    type: 'radio',
    question: 'O que te faz querer algo sério com ele especificamente?',
    options: [
      'Honestidade - sempre foi direto comigo sobre tudo',
      'Carinho especial - me trata diferente dos outros casuais',
      'Compatibilidade de vida - temos sonhos parecidos',
      'Conexão natural - conversamos sobre tudo, não só sexo'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  // COMUNICAÇÃO EMOCIONAL - Contextualizada por intenção
  {
    id: 'comunicacao_conflitos_ja_fiquei',
    trait: SexualTrait.COMUNICACAO_EMOCIONAL,
    category: 'Comunicação',
    type: 'radio',
    question: 'Como vocês lidariam com conflitos se virassem namorados?',
    options: [
      'Conversar na hora - já temos intimidade suficiente',
      'Esperar acalmar - nosso hookup não teve dramas, quero manter assim',
      'Dar espaço - preciso me adaptar a ser mais do que casual',
      'Evitar conflitos - não quero estragar nossa química'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Conversar na hora - já temos intimidade suficiente': ['comunicacao_intensidade_ja_fiquei']
    },
    weight: 0.9
  },

  {
    id: 'comunicacao_conflitos_nunca_fiquei',
    trait: SexualTrait.COMUNICACAO_EMOCIONAL,
    category: 'Comunicação',
    type: 'radio',
    question: 'Como imagina resolver conflitos com ele num relacionamento?',
    options: [
      'Conversar abertamente - comunicação é fundamental',
      'Dar tempo para os dois acalmarem, depois conversar',
      'Preciso conhecê-lo melhor para saber como ele reage',
      'Prefiro evitar conflitos, manter harmonia'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Conversar abertamente - comunicação é fundamental': ['comunicacao_intensidade_nunca_fiquei']
    },
    weight: 0.9
  },

  {
    id: 'comunicacao_conflitos_ex',
    trait: SexualTrait.COMUNICACAO_EMOCIONAL,
    category: 'Comunicação',
    type: 'radio',
    question: 'Como pretendem lidar com conflitos desta vez?',
    options: [
      'Conversar na hora - aprendemos que não adianta guardar',
      'Melhor estratégia - acalmar primeiro, depois resolver',
      'Dar mais espaço um ao outro que da primeira vez',
      'Evitar os temas que sempre geravam problemas'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Conversar na hora - aprendemos que não adianta guardar': ['comunicacao_intensidade_ex']
    },
    weight: 0.95
  },

  {
    id: 'comunicacao_conflitos_casual_para_serio',
    trait: SexualTrait.COMUNICACAO_EMOCIONAL,
    category: 'Comunicação',
    type: 'radio',
    question: 'Como lidariam com conflitos se oficializarem?',
    options: [
      'Conversar direito - no casual não precisávamos, mas namoro é diferente',
      'Do jeito que sempre fizemos - quando incomodava, falávamos',
      'Ainda estamos aprendendo - nunca tivemos conflitos sérios',
      'Evitar dramas - um dos motivos do casual ser bom é não ter isso'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Conversar direito - no casual não precisávamos, mas namoro é diferente': ['comunicacao_intensidade_casual_para_serio']
    },
    weight: 0.85
  },

  {
    id: 'comunicacao_intensidade_ja_fiquei',
    trait: SexualTrait.COMUNICACAO_EMOCIONAL,
    category: 'Comunicação',
    type: 'radio',
    question: 'Se algo te incomodar nele como namorado, como você agiria?',
    options: [
      'Falar diretamente - não temos tempo a perder com joguinhos',
      'Explicar com calma - quero que dê certo entre a gente',
      'Ficar quieto primeiro - preciso ter certeza se é sério mesmo',
      'Esperar ele perceber - no sexo ele me entende, deve entender isso também'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'comunicacao_intensidade_nunca_fiquei',
    trait: SexualTrait.COMUNICACAO_EMOCIONAL,
    category: 'Comunicação',
    type: 'radio',
    question: 'Como você se comunicaria quando algo te incomodasse?',
    options: [
      'Falar diretamente - honestidade desde o início',
      'Explicar meus sentimentos com cuidado',
      'Observar primeiro como ele reage a outras situações',
      'Dar sinais e esperar ele notar - ainda estou conhecendo ele'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'comunicacao_intensidade_ex',
    trait: SexualTrait.COMUNICACAO_EMOCIONAL,
    category: 'Comunicação',
    type: 'radio',
    question: 'Como você comunicaria incômodos desta vez?',
    options: [
      'Falar na hora - guardei muito da primeira vez',
      'Explicar melhor meus sentimentos - ele já me conhece',
      'Dar mais espaço para mim mesmo processar',
      'Mudar minha abordagem - da primeira vez não funcionou'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'comunicacao_intensidade_casual_para_serio',
    trait: SexualTrait.COMUNICACAO_EMOCIONAL,
    category: 'Comunicação',
    type: 'radio',
    question: 'Como seria sua comunicação emocional num namoro oficial?',
    options: [
      'Mais direta - namoro permite falar sobre sentimentos',
      'Com mais cuidado - não quero assustar com drama',
      'Igual ao casual - se funcionou, por que mudar?',
      'Ainda aprendendo - nunca precisei falar sobre sentimentos com ele'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  // EXCLUSIVIDADE E FREQUÊNCIA - Contextualizada por intenção
  {
    id: 'exclusividade_importancia_ja_fiquei',
    trait: SexualTrait.EXCLUSIVIDADE,
    category: 'Exclusividade',
    type: 'radio',
    question: 'Quão importante é a exclusividade na transição para namorados?',
    options: [
      'Essencial agora - se virarmos namorados, é só comigo',
      'Importante mas podemos conversar sobre isso',
      'Já somos meio exclusivos na prática',
      'Não me importo se ele ainda fica com outros por enquanto'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'exclusividade_importancia_nunca_fiquei',
    trait: SexualTrait.EXCLUSIVIDADE,
    category: 'Exclusividade',
    type: 'radio',
    question: 'Quão importante é a exclusividade num relacionamento com ele?',
    options: [
      'Essencial desde o início - quero commitment total',
      'Importante após nos conhecermos melhor',
      'Negociável dependendo de como ele se sente',
      'Não sou possessivo, confio na conexão'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'exclusividade_importancia_ex',
    trait: SexualTrait.EXCLUSIVIDADE,
    category: 'Exclusividade',
    type: 'radio',
    question: 'Como vocês veem a exclusividade desta vez?',
    options: [
      'Mais importante agora - aprendemos que tração machuca',
      'Igual a antes - sempre foi só entre nós dois',
      'Negociação necessária - houve questões no passado',
      'Menos pressivo desta vez - confiança precisa ser reconquistada'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.95
  },

  {
    id: 'exclusividade_importancia_casual_para_serio',
    trait: SexualTrait.EXCLUSIVIDADE,
    category: 'Exclusividade',
    type: 'radio',
    question: 'Como a exclusividade mudaria de casual para namorados?',
    options: [
      'Finalmente oficial - já não fico com mais ninguém mesmo',
      'Importante agora - namoro requer exclusividade',
      'Negociável - talvez open relationship funcione',
      'Não mudaria muito - nunca fui possessivo'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'frequencia_encontros_ja_fiquei',
    trait: SexualTrait.FREQUENCIA_RELACIONAMENTO,
    category: 'Tempo Juntos',
    type: 'radio',
    question: 'Com que frequência vocês se veriam como namorados?',
    options: [
      'Mais que agora - namoro permite estar juntos sempre',
      'Igual ao atual - já nos vemos bastante',
      'Talvez menos - no hookup é só sexo, namoro tem outras demandas',
      'Sem pressa - vamos descobrindo o ritmo ideal'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'frequencia_encontros_nunca_fiquei',
    trait: SexualTrait.FREQUENCIA_RELACIONAMENTO,
    category: 'Tempo Juntos',
    type: 'radio',
    question: 'Com que frequência gostaria de se ver num relacionamento?',
    options: [
      'Todos os dias - quero mergulhar nessa conexão',
      '3-4 vezes por semana - equilibrar com nossa vida individual',
      '2-3 vezes por semana - construir gradualmente',
      'Sem pressa - deixar a intimidade crescer naturalmente'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_NUNCA_FIQUEI'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.75
  },

  {
    id: 'frequencia_encontros_ex',
    trait: SexualTrait.FREQUENCIA_RELACIONAMENTO,
    category: 'Tempo Juntos',
    type: 'radio',
    question: 'Como vocês dosariam o tempo juntos desta vez?',
    options: [
      'Mais tempo que antes - queremos investir mais na relação',
      'Igual a antes - funcionava bem',
      'Menos tempo - precisamos de mais espaço individual',
      'Gradualmente - reconquistando a intimidade aos poucos'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_E_MEU_EX'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  {
    id: 'frequencia_encontros_casual_para_serio',
    trait: SexualTrait.FREQUENCIA_RELACIONAMENTO,
    category: 'Tempo Juntos',
    type: 'radio',
    question: 'Como mudaria a frequência se oficializassem?',
    options: [
      'Provavelmente igual - já nos vemos bastante',
      'Um pouco mais - namoro permite mais flexibilidade',
      'Talvez menos - no casual é só diversrão, namoro tem responsabilidades',
      'Vamos descobrir - nunca namoramos, só ficamos'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.75
  },

  // CUIDADO PÓS-SEXO EM RELACIONAMENTOS - Universal para todas as intenções
  {
    id: 'aftercare_relacionamento',
    trait: SexualTrait.CUIDADO_POS,
    category: 'Intimidade e Carinho',
    type: 'radio',
    question: 'Como você gostaria de ser tratado após o sexo num relacionamento?',
    options: [
      'Muito carinho e conversa - sexo é conexão emocional',
      'Abraços e relaxar juntos - momento íntimo especial',
      'Carinho mas respeitando espaço pessoal',
      'Natural conforme o momento - às vezes mais, às vezes menos'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  // ===============================
  // PERGUNTAS PARA QUERO_SEXO
  // ===============================
  
  // HIGIENE E PREPARAÇÃO - Contextualizada por experiência anterior
  {
    id: 'higiene_ja_fiquei',
    trait: SexualTrait.HIGIENE,
    category: 'Higiene e Preparação',
    type: 'radio',
    question: 'Como você se prepara para se encontrar com ele novamente?',
    options: [
      'Preparação extra - quero impressionar de novo',
      'Igual à primeira vez - funcionou bem',
      'Mais relaxado - já nos conhecemos',
      'Depende do mood - às vezes mais, às vezes menos'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Preparação extra - quero impressionar de novo': ['higiene_expectativa_ja_fiquei']
    },
    weight: 0.9
  },

  {
    id: 'higiene_nao_fiquei',
    trait: SexualTrait.HIGIENE,
    category: 'Higiene e Preparação',
    type: 'radio',
    question: 'Como você se prepara para o primeiro encontro sexual com ele?',
    options: [
      'Preparação máxima - primeiras impressões são fundamentais',
      'Cuidado especial - quero estar perfeito',
      'Preparação normal - ser natural é importante',
      'Sem exageros - prefiro ser espontâneo'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Preparação máxima - primeiras impressões são fundamentais': ['higiene_expectativa_nao_fiquei']
    },
    weight: 0.95
  },

  {
    id: 'higiene_expectativa_ja_fiquei',
    trait: SexualTrait.HIGIENE,
    category: 'Higiene e Preparação',
    type: 'radio',
    question: 'Como você espera que ele se prepare para vocês se encontrarem?',
    options: [
      'Igual a mim - mantermos o mesmo padrão',
      'Como da primeira vez - já sei que ele se cuida',
      'Não precisa exagerar - já nos conhecemos',
      'Natural - nossa química é mais importante'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.8
  },

  {
    id: 'higiene_expectativa_nao_fiquei',
    trait: SexualTrait.HIGIENE,
    category: 'Higiene e Preparação',
    type: 'radio',
    question: 'O que você espera dele na preparação para o primeiro encontro?',
    options: [
      'Máximo cuidado - quero que seja especial para nós dois',
      'Bem preparado - demonstra respeito e interesse',
      'Normal e limpo - não quero pressionar',
      'Natural - preferência pela espontaneidade'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  // PERFORMANCE E INTENSIDADE - Contextualizada por experiência anterior
  {
    id: 'intensidade_ja_fiquei',
    trait: SexualTrait.INTENSIDADE_SEXUAL,
    category: 'Intensidade Sexual',
    type: 'radio',
    question: 'Que intensidade você quer repetir ou explorar com ele?',
    options: [
      'Mais intenso que da primeira vez - sei que ele aguenta',
      'Igual à primeira vez - foi perfeito assim',
      'Mais suave - construir mais conexão emocional',
      'Variar conforme o mood - já temos intimidade para isso'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.9
  },

  {
    id: 'intensidade_nao_fiquei',
    trait: SexualTrait.INTENSIDADE_SEXUAL,
    category: 'Intensidade Sexual',
    type: 'radio',
    question: 'Que tipo de intensidade você imagina para o primeiro encontro?',
    options: [
      'Bem intenso - quero que seja inesquecível',
      'Equilibrado - nem muito suave nem muito intenso',
      'Começar suave - conhecer o ritmo dele primeiro',
      'Natural conforme a química - deixar fluir'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.85
  },

  // ABERTURA SEXUAL - Contextualizada por experiência anterior
  {
    id: 'abertura_ja_fiquei',
    trait: SexualTrait.ABERTURA_SEXUAL,
    category: 'Experimentação',
    type: 'radio',
    question: 'Quão aberto você é para experimentar coisas novas com ele?',
    options: [
      'Muito aberto - confio nele e quero explorar mais',
      'Aberto para evoluir - já temos base de confiança',
      'Manter o que já funciona bem entre a gente',
      'Começar devagar - não quero forrar'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Muito aberto - confio nele e quero explorar mais': ['kinks_interesse_ja_fiquei']
    },
    weight: 0.8
  },

  {
    id: 'abertura_nao_fiquei',
    trait: SexualTrait.ABERTURA_SEXUAL,
    category: 'Experimentação',
    type: 'radio',
    question: 'Quão aberto você seria para experimentar no primeiro encontro?',
    options: [
      'Muito aberto - primeiro encontro pode ser épico',
      'Aberto se rolar química e me sentir à vontade',
      'Preferir o básico - conhecer o estilo dele primeiro',
      'Conservador - primeiro encontro é para conhecer'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    followUps: {
      'Muito aberto - primeiro encontro pode ser épico': ['kinks_interesse_nao_fiquei']
    },
    weight: 0.75
  },

  {
    id: 'kinks_interesse_ja_fiquei',
    trait: SexualTrait.ABERTURA_SEXUAL,
    category: 'Experimentação',
    type: 'radio',
    question: 'Que tipo de experimentação vocês poderiam explorar juntos?',
    options: [
      'Mais dominação/submissão - testar nossos limites',
      'Novas posições - evoluir nosso repertório',
      'Brinquedos ou acessórios - incrementar o que já fazemos',
      'Fantasias ou role-play - adicionar criatividade'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.7
  },

  {
    id: 'kinks_interesse_nao_fiquei',
    trait: SexualTrait.ABERTURA_SEXUAL,
    category: 'Experimentação',
    type: 'radio',
    question: 'Que experimentação te excitaria tentar com ele?',
    options: [
      'Explorar dominação - ver como nos encaixamos',
      'Posições diferentes - descobrir o que funciona',
      'Talvez brinquedos - se ele topar',
      'Fantasias simples - criar nossa própria química'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO', 'VERSATIL_PASS', 'PASS'],
    weight: 0.6
  },

  // PROTEÇÃO E SEGURANÇA - Universal para ambas intenções sexuais
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
  
  // PERGUNTAS PARA ATIVOS - Contextualizada por intenção sexual
  {
    id: 'ativo_tamanho_ja_fiquei',
    trait: SexualTrait.FISICO_ATIVO,
    category: 'Características Físicas',
    type: 'number',
    question: 'Tamanho do seu pênis (cm) - ele já conhece?',
    placeholder: 'Ex: 18',
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO'],
    weight: 0.8
  },

  {
    id: 'ativo_tamanho_nao_fiquei',
    trait: SexualTrait.FISICO_ATIVO,
    category: 'Características Físicas',
    type: 'number',
    question: 'Qual o tamanho do seu pênis? (cm)',
    placeholder: 'Ex: 18',
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO'],
    weight: 0.75
  },

  {
    id: 'ativo_tamanho_relacionamento',
    trait: SexualTrait.FISICO_ATIVO,
    category: 'Características Físicas',
    type: 'number',
    question: 'Tamanho do seu pênis (cm) - para compatibilidade no relacionamento',
    placeholder: 'Ex: 18',
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO'],
    weight: 0.7
  },

  {
    id: 'ativo_resistencia_ja_fiquei',
    trait: SexualTrait.TECNICA_ATIVO,
    category: 'Performance',
    type: 'radio',
    question: 'Como foi sua resistência com ele e como quer melhorar?',
    options: [
      'Foi excelente - quero manter esse nível',
      'Foi boa - posso melhorar ainda mais',
      'Normal - vou me preparar melhor desta vez',
      'Quero impressionar mais - vou trabalhar nisso'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['ATIVO', 'VERSATIL_ATIVO'],
    weight: 0.85
  },

  {
    id: 'ativo_resistencia_nao_fiquei',
    trait: SexualTrait.TECNICA_ATIVO,
    category: 'Performance',
    type: 'radio',
    question: 'Como você avalia sua resistência para o primeiro encontro?',
    options: [
      'Excelente - posso durar bastante tempo',
      'Boa - consigo satisfazer bem',
      'Normal - espero que seja suficiente',
      'Ansioso - primeira vez com ele pode afetar'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['ATIVO', 'VERSATIL_ATIVO'],
    weight: 0.8
  },

  {
    id: 'ativo_resistencia_relacionamento',
    trait: SexualTrait.TECNICA_ATIVO,
    category: 'Performance',
    type: 'radio',
    question: 'Como você avalia sua resistência para um relacionamento?',
    options: [
      'Excelente - importante para satisfação do casal',
      'Boa - conseguimos construir uma boa vida sexual',
      'Normal - o carinho compensa qualquer limitação',
      'Posso melhorar - relacionamento permite evoluir junto'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['ATIVO', 'VERSATIL_ATIVO'],
    weight: 0.75
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

  // PERGUNTAS PARA PASSIVOS - Contextualizada por intenção
  {
    id: 'passivo_bunda_ja_fiquei',
    trait: SexualTrait.FISICO_PASSIVO,
    category: 'Características Físicas',
    type: 'radio',
    question: 'Como ele achou sua bunda? Você concorda?',
    options: [
      'Ele adorou - tenho bunda grande e empinada',
      'Gostou bastante - é proporcional e ele aprecia',
      'Achou bonita - pequena mas ele curte assim',
      'Elogiou - atlética, combina comigo'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['PASS', 'VERSATIL_PASS'],
    weight: 0.7
  },

  {
    id: 'passivo_bunda_nao_fiquei',
    trait: SexualTrait.FISICO_PASSIVO,
    category: 'Características Físicas',
    type: 'radio',
    question: 'Como você descreveria sua bunda para ele?',
    options: [
      'Grande e empinada - meu ponto forte',
      'Média e proporcional - harmoniosa',
      'Pequena mas firme - compacta e bonita',
      'Atlética e definida - resultado de exercícios'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['PASS', 'VERSATIL_PASS'],
    weight: 0.6
  },

  {
    id: 'passivo_bunda_relacionamento',
    trait: SexualTrait.FISICO_PASSIVO,
    category: 'Características Físicas',
    type: 'radio',
    question: 'Como você se sente sobre sua atratividade física para ele?',
    options: [
      'Confiante - sei que ele me acha atraente',
      'Positivo - temos boa química física',
      'Normal - atratividade vai além do físico',
      'Focado em melhorar - quero estar sempre bem para ele'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['PASS', 'VERSATIL_PASS'],
    weight: 0.5
  },

  {
    id: 'passivo_adaptacao_ja_fiquei',
    trait: SexualTrait.ADAPTACAO_PASSIVO,
    category: 'Adaptação',
    type: 'radio',
    question: 'Como foi sua adaptação com ele e como será da próxima vez?',
    options: [
      'Foi tranquilo - me adapto bem ao tamanho dele',
      'Precisei de tempo - mas agora sei como é com ele',
      'Foi difícil - vou pedir mais carinho desta vez',
      'Depende do dia - às vezes está mais fácil, às vezes mais difícil'
    ],
    required: true,
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE'],
    roles: ['PASS', 'VERSATIL_PASS'],
    followUps: {
      'Foi difícil - vou pedir mais carinho desta vez': ['passivo_cuidado_preferido']
    },
    weight: 0.9
  },

  {
    id: 'passivo_adaptacao_nao_fiquei',
    trait: SexualTrait.ADAPTACAO_PASSIVO,
    category: 'Adaptação',
    type: 'radio',
    question: 'Como é sua adaptação inicial com parceiros novos?',
    options: [
      'Me adapto rápido - não tenho dificuldades',
      'Preciso ir com calma no início - tempo para relaxar',
      'Preciso de carinho e paciência - sou mais sensível',
      'Depende do tamanho dele - ainda não sei como é'
    ],
    required: true,
    intentions: ['SEXO_NAO_FIQUEI_QUERO_FICAR'],
    roles: ['PASS', 'VERSATIL_PASS'],
    followUps: {
      'Preciso de carinho e paciência - sou mais sensível': ['passivo_cuidado_preferido'],
      'Depende do tamanho dele - ainda não sei como é': ['passivo_tamanho_limite']
    },
    weight: 0.95
  },

  {
    id: 'passivo_adaptacao_relacionamento',
    trait: SexualTrait.ADAPTACAO_PASSIVO,
    category: 'Adaptação',
    type: 'radio',
    question: 'Como é sua adaptação sexual num relacionamento?',
    options: [
      'Natural - relacionamento traz mais conforto',
      'Gradual - vamos conhecendo o ritmo um do outro',
      'Cuidadosa - preciso de carinho sempre',
      'Varia - depende da conexão emocional do momento'
    ],
    required: true,
    intentions: ['RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['PASS', 'VERSATIL_PASS'],
    weight: 0.8
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
    intentions: ['SEXO_JA_FIQUEI_QUERO_NOVAMENTE', 'SEXO_NAO_FIQUEI_QUERO_FICAR', 'RELACIONAMENTO_JA_FIQUEI', 'RELACIONAMENTO_NUNCA_FIQUEI', 'RELACIONAMENTO_E_MEU_EX', 'RELACIONAMENTO_SO_FICAMOS_NAO_NAMORAMOS'],
    roles: ['PASS', 'VERSATIL_PASS'],
    weight: 0.8
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
      '6 meses a 1 ano': ['ex_mudancas_pessoais']
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
// VALIDAÇÃO DO BANCO DE PERGUNTAS
// ================================

/**
 * Valida a integridade do banco de perguntas
 */
export function validateQuestionBank(): { isValid: boolean; errors: string[]; summary: string } {
  const errors: string[] = [];
  const questionIds = new Set<string>();

  QUESTION_BANK.forEach((question, index) => {
    // IDs únicos
    if (questionIds.has(question.id)) {
      errors.push(`Pergunta #${index}: ID duplicado '${question.id}'`);
    }
    questionIds.add(question.id);

    // Intentions válidas
    const invalidIntentions = question.intentions.filter(
      intention => !ALL_INTENTIONS.includes(intention)
    );
    if (invalidIntentions.length > 0) {
      errors.push(`Pergunta '${question.id}': intentions inválidas: ${invalidIntentions.join(', ')}`);
    }

    // Roles válidos
    const invalidRoles = question.roles.filter(
      role => !ALL_ROLES.includes(role)
    );
    if (invalidRoles.length > 0) {
      errors.push(`Pergunta '${question.id}': roles inválidos: ${invalidRoles.join(', ')}`);
    }

    // Weight válido
    if (question.weight < 0 || question.weight > 1) {
      errors.push(`Pergunta '${question.id}': peso inválido ${question.weight} (deve ser 0-1)`);
    }

    // FollowUps válidos
    if (question.followUps) {
      Object.values(question.followUps).flat().forEach(followUpId => {
        if (!questionIds.has(followUpId) && !QUESTION_BANK.some(q => q.id === followUpId)) {
          errors.push(`Pergunta '${question.id}': followUp '${followUpId}' não existe`);
        }
      });
    }

    // Options válidas para perguntas tipo radio
    if (question.type === 'radio' && (!question.options || question.options.length === 0)) {
      errors.push(`Pergunta '${question.id}': tipo 'radio' precisa de options`);
    }
  });

  // Gerar resumo
  const questionCount = QUESTION_BANK.length;
  const coverageByIntention: Record<string, number> = {};
  const coverageByRole: Record<string, number> = {};
  const coverageByCombination: Record<string, number> = {};

  ALL_INTENTIONS.forEach(intention => {
    coverageByIntention[intention] = QUESTION_BANK.filter(q => 
      q.intentions.includes(intention)
    ).length;
  });

  ALL_ROLES.forEach(role => {
    coverageByRole[role] = QUESTION_BANK.filter(q => 
      q.roles.includes(role)
    ).length;
  });

  ALL_INTENTIONS.forEach(intention => {
    ALL_ROLES.forEach(role => {
      const key = `${intention}_${role}`;
      coverageByCombination[key] = QUESTION_BANK.filter(q => 
        q.intentions.includes(intention) && q.roles.includes(role)
      ).length;
    });
  });

  const summary = `
Bank Overview:
- Total Questions: ${questionCount} (COMPLETE ✅)
- Coverage by Intention:
${Object.entries(coverageByIntention).map(([key, count]) => `  * ${key}: ${count} questions`).join('\n')}
- Coverage by Role:
${Object.entries(coverageByRole).map(([key, count]) => `  * ${key}: ${count} questions`).join('\n')}
- Coverage by Combination (minimum 8 recommended):
${Object.entries(coverageByCombination).map(([key, count]) => `  * ${key}: ${count} questions ${count < 8 ? '⚠️' : '✅'}`).join('\n')}
`;

  return { isValid: errors.length === 0, errors, summary };
}

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