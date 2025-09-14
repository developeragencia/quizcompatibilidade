import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SexualPreference } from './PreferenceSelection';

interface DynamicQuestionnaireProps {
  preference: SexualPreference;
  onBack: () => void;
  onComplete: (answers: QuestionnaireAnswers) => void;
}

export interface QuestionnaireAnswers {
  [key: string]: string | number;
}

interface Question {
  id: string;
  category: string;
  type: 'radio' | 'input' | 'textarea' | 'number';
  question: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

// Questions based on sexual preference - as requested by user
const getQuestionsForPreference = (preference: SexualPreference): Question[] => {
  const baseQuestions: Question[] = [
    // Personal hygiene and care - universal
    {
      id: 'hygiene',
      category: 'Cuidados Pessoais',
      type: 'radio',
      question: 'Você é sempre limpo e cheiroso na hora do sexo?',
      options: ['Sempre, é fundamental', 'Na maioria das vezes', 'Às vezes esqueço', 'Não me preocupo muito'],
      required: true
    },
    {
      id: 'shower_before',
      category: 'Cuidados Pessoais', 
      type: 'radio',
      question: 'Você toma banho antes dos encontros íntimos?',
      options: ['Sempre', 'Quase sempre', 'Só quando lembro', 'Raramente'],
      required: true
    },
    
    // Life questions
    {
      id: 'work_life',
      category: 'Trabalho e Vida',
      type: 'radio',
      question: 'Como você vê seu trabalho atual?',
      options: ['Amo o que faço', 'É satisfatório', 'É só pelo dinheiro', 'Estou mudando de área'],
      required: true
    },
    {
      id: 'future_goals',
      category: 'Perspectivas de Vida',
      type: 'textarea',
      question: 'Quais são seus principais objetivos para os próximos 5 anos?',
      placeholder: 'Conte sobre seus planos e sonhos...',
      required: true
    },
    {
      id: 'relationship_type',
      category: 'Relacionamento',
      type: 'radio', 
      question: 'Que tipo de relacionamento você busca?',
      options: ['Algo sério e duradouro', 'Diversão sem compromisso', 'Ver no que dá', 'Não sei ainda'],
      required: true
    }
  ];

  // Specific questions based on preference
  let specificQuestions: Question[] = [];
  
  if (preference.includes('ativo') || preference === 'totalmente_ativo') {
    specificQuestions = [
      {
        id: 'penis_size',
        category: 'Físico - Ativo',
        type: 'input',
        question: 'Qual o tamanho do seu pênis? (em cm)',
        placeholder: 'Ex: 18',
        required: true
      },
      {
        id: 'penis_appearance',
        category: 'Físico - Ativo',
        type: 'radio',
        question: 'Como é a aparência do seu pênis?',
        options: ['Liso/depilado', 'Com pelos', 'Aparado', 'Natural'],
        required: true
      },
      {
        id: 'likes_in_bottom',
        category: 'Preferências Sexuais',
        type: 'radio',
        question: 'O que mais te atrai em um passivo?',
        options: ['Bunda grande', 'Bunda média', 'Bunda pequena', 'Personalidade'],
        required: true
      },
      {
        id: 'sexual_intensity',
        category: 'Preferências Sexuais',
        type: 'radio',
        question: 'Como você gosta do sexo?',
        options: ['Intenso e quente', 'Romântico e suave', 'Varia o humor', 'Experimental'],
        required: true
      }
    ];
  }
  
  if (preference.includes('passivo') || preference === 'totalmente_passivo') {
    specificQuestions = [
      {
        id: 'butt_size',
        category: 'Físico - Passivo',
        type: 'radio',
        question: 'Como você descreveria sua bunda?',
        options: ['Grande', 'Média', 'Pequena', 'Atlética'],
        required: true
      },
      {
        id: 'butt_tightness',
        category: 'Físico - Passivo',
        type: 'radio',
        question: 'Como é sua bunda?',
        options: ['Apertada', 'Normal', 'Larga', 'Depende'],
        required: true
      },
      {
        id: 'butt_hair',
        category: 'Físico - Passivo',
        type: 'radio',
        question: 'Como é a região?',
        options: ['Lisa/depilada', 'Com pelos', 'Aparada', 'Natural'],
        required: true
      },
      {
        id: 'likes_in_top',
        category: 'Preferências Sexuais',
        type: 'radio',
        question: 'O que mais te atrai em um ativo?',
        options: ['Pênis grande', 'Pênis médio', 'Personalidade', 'Dominância'],
        required: true
      },
      {
        id: 'preferred_treatment',
        category: 'Preferências Sexuais',
        type: 'radio',
        question: 'Como gosta de ser tratado?',
        options: ['Com carinho', 'Com intensidade', 'Com dominação', 'Varia o humor'],
        required: true
      }
    ];
  }
  
  if (preference.includes('versatil')) {
    specificQuestions = [
      {
        id: 'versatile_preference',
        category: 'Versatilidade',
        type: 'radio',
        question: 'Em que situações você prefere ser ativo vs passivo?',
        options: ['Depende do parceiro', 'Depende do humor', 'Igual em ambos', 'Varia por dia'],
        required: true
      },
      {
        id: 'body_attributes',
        category: 'Físico - Versátil',
        type: 'textarea',
        question: 'Descreva seus atributos físicos que considera importantes:',
        placeholder: 'Conte sobre suas características...',
        required: true
      },
      {
        id: 'sexual_flexibility',
        category: 'Preferências Sexuais',
        type: 'radio',
        question: 'Quão experimental você é?',
        options: ['Muito experimental', 'Moderadamente', 'Prefiro o básico', 'Depende da confiança'],
        required: true
      }
    ];
  }

  // Spicy additional questions as requested
  const spicyQuestions: Question[] = [
    {
      id: 'favorite_position',
      category: 'Intimidade',
      type: 'radio',
      question: 'Qual sua posição favorita?',
      options: ['Clássica', 'Criativa', 'Romântica', 'Intensa'],
      required: true
    },
    {
      id: 'sexual_frequency',
      category: 'Intimidade',
      type: 'radio',
      question: 'Com que frequência você gosta de fazer sexo?',
      options: ['Diariamente', 'Algumas vezes por semana', 'Finais de semana', 'Quando rola química'],
      required: true
    }
  ];

  return [...baseQuestions, ...specificQuestions, ...spicyQuestions];
};

export default function DynamicQuestionnaire({ preference, onBack, onComplete }: DynamicQuestionnaireProps) {
  const questions = getQuestionsForPreference(preference);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleAnswer = (value: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };
  
  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.required && (!answer || answer === '')) {
      return false;
    }
    return true;
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const renderQuestion = () => {
    const answer = answers[currentQuestion.id];
    
    switch (currentQuestion.type) {
      case 'radio':
        return (
          <RadioGroup
            value={answer as string}
            onValueChange={handleAnswer}
            className="space-y-3"
            data-testid={`radio-group-${currentQuestion.id}`}
          >
            {currentQuestion.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${currentQuestion.id}-${idx}`} data-testid={`radio-${currentQuestion.id}-${idx}`} />
                <Label htmlFor={`${currentQuestion.id}-${idx}`} className="cursor-pointer" data-testid={`label-${currentQuestion.id}-${idx}`}>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case 'input':
      case 'number':
        return (
          <Input
            type={currentQuestion.type === 'number' ? 'number' : 'text'}
            value={answer as string || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full"
            data-testid={`input-${currentQuestion.id}`}
          />
        );
        
      case 'textarea':
        return (
          <Textarea
            value={answer as string || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            rows={4}
            className="w-full"
            data-testid={`textarea-${currentQuestion.id}`}
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent p-4">
      <div className="container mx-auto max-w-2xl pt-8">
        <Card className="p-8" data-testid="card-questionnaire">
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="p-0" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" data-testid="badge-progress">
                Pergunta {currentQuestionIndex + 1} de {questions.length}
              </Badge>
              <Badge data-testid="badge-category">
                {currentQuestion.category}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" data-testid="progress-bar" />
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-foreground" data-testid="text-question">
              {currentQuestion.question}
              {currentQuestion.required && <span className="text-destructive ml-1">*</span>}
            </h3>
            
            {renderQuestion()}
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              data-testid="button-previous"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              data-testid="button-next"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
              {currentQuestionIndex !== questions.length - 1 && (
                <ArrowRight className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}