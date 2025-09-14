import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Heart, Flame, Users, RotateCcw, UserX, RefreshCw, Coffee, MessageCircle, Sparkles } from "lucide-react";

// New cascading intention system
export type PrimaryIntention = 'RELACIONAMENTO' | 'SEXO' | 'AMIZADE';

export type RelationshipSubIntention = 
  | 'JA_FIQUEI'
  | 'NUNCA_FIQUEI'
  | 'E_MEU_EX'
  | 'SO_FICAMOS_NAO_NAMORAMOS';

export type SexSubIntention = 
  | 'JA_FIQUEI_QUERO_NOVAMENTE'
  | 'NAO_FIQUEI_QUERO_FICAR';

export type FriendshipSubIntention = 
  | 'AMIZADE_NOVA'
  | 'AMIZADE_JA_CONHECO'
  | 'AMIZADE_INTERESSE_DESENVOLVER';

export type UserIntention = 
  | `RELACIONAMENTO_${RelationshipSubIntention}`
  | `SEXO_${SexSubIntention}`
  | `AMIZADE_${FriendshipSubIntention}`;

interface IntentionSelectionProps {
  onBack: () => void;
  onNext: (intention: UserIntention) => void;
}

// Configuration for primary intentions
const primaryIntentions = [
  {
    value: 'RELACIONAMENTO' as PrimaryIntention,
    label: 'QUERO RELACIONAMENTO',
    description: 'Busco algo sério, duradouro e com sentimento',
    icon: Heart,
    color: 'text-red-500'
  },
  {
    value: 'SEXO' as PrimaryIntention,
    label: 'QUERO SEXO',
    description: 'Procuro diversão, prazer e encontros casuais',
    icon: Flame,
    color: 'text-orange-500'
  },
  {
    value: 'AMIZADE' as PrimaryIntention,
    label: 'QUERO AMIZADE',
    description: 'Busco uma conexão amigável e companheirismo',
    icon: Heart,
    color: 'text-blue-500'
  }
];

// Configuration for relationship sub-intentions
const relationshipSubOptions = [
  {
    value: 'JA_FIQUEI' as RelationshipSubIntention,
    label: 'JÁ FIQUEI',
    description: 'Já tivemos algo e quero retomar',
    icon: RotateCcw,
    color: 'text-blue-500'
  },
  {
    value: 'NUNCA_FIQUEI' as RelationshipSubIntention,
    label: 'NUNCA FIQUEI',
    description: 'Nunca rolou nada entre nós',
    icon: Users,
    color: 'text-green-500'
  },
  {
    value: 'E_MEU_EX' as RelationshipSubIntention,
    label: 'É MEU EX',
    description: 'Já namoramos e terminamos',
    icon: UserX,
    color: 'text-purple-500'
  },
  {
    value: 'SO_FICAMOS_NAO_NAMORAMOS' as RelationshipSubIntention,
    label: 'SÓ FICAMOS E NÃO NAMORAMOS',
    description: 'Tivemos algo casual, mas nunca namoramos',
    icon: RefreshCw,
    color: 'text-indigo-500'
  }
];

// Configuration for sex sub-intentions
const sexSubOptions = [
  {
    value: 'JA_FIQUEI_QUERO_NOVAMENTE' as SexSubIntention,
    label: 'JÁ FIQUEI, QUERO FICAR DE NOVO',
    description: 'Já rolou algo e quero repetir a experiência',
    icon: RotateCcw,
    color: 'text-blue-500'
  },
  {
    value: 'NAO_FIQUEI_QUERO_FICAR' as SexSubIntention,
    label: 'NÃO FIQUEI E QUERO FICAR',
    description: 'Ainda não rolou, mas tenho interesse em ficar',
    icon: Users,
    color: 'text-green-500'
  }
];

// Configuration for friendship sub-intentions
const friendshipSubOptions = [
  {
    value: 'AMIZADE_NOVA' as FriendshipSubIntention,
    label: 'ACABEI DE CONHECER',
    description: 'Conheci ele recentemente e quero desenvolver uma amizade',
    icon: Sparkles,
    color: 'text-emerald-500'
  },
  {
    value: 'AMIZADE_JA_CONHECO' as FriendshipSubIntention,
    label: 'JÁ SOMOS AMIGOS',
    description: 'Já temos uma amizade e quero fortalecê-la',
    icon: Coffee,
    color: 'text-amber-500'
  },
  {
    value: 'AMIZADE_INTERESSE_DESENVOLVER' as FriendshipSubIntention,
    label: 'AMIZADE QUE PODE VIRAR ALGO',
    description: 'Começamos como amigos, mas sinto que pode evoluir',
    icon: MessageCircle,
    color: 'text-purple-500'
  }
];

export default function IntentionSelection({ onBack, onNext }: IntentionSelectionProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [primarySelection, setPrimarySelection] = useState<PrimaryIntention | ''>('');
  const [subSelection, setSubSelection] = useState<RelationshipSubIntention | SexSubIntention | FriendshipSubIntention | ''>('');

  const handlePrimarySelection = (primary: PrimaryIntention) => {
    setPrimarySelection(primary);
    setSubSelection(''); // Reset sub-selection when changing primary
    setStep(2);
  };

  const handleSubSelection = (sub: RelationshipSubIntention | SexSubIntention | FriendshipSubIntention) => {
    setSubSelection(sub);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSubSelection('');
    } else {
      onBack();
    }
  };

  const handleNext = () => {
    if (step === 1 && primarySelection) {
      setStep(2);
    } else if (step === 2 && primarySelection && subSelection) {
      const finalIntention = `${primarySelection}_${subSelection}` as UserIntention;
      onNext(finalIntention);
    }
  };

  const currentOptions = step === 1 
    ? primaryIntentions 
    : primarySelection === 'RELACIONAMENTO' 
      ? relationshipSubOptions 
      : primarySelection === 'SEXO'
        ? sexSubOptions
        : friendshipSubOptions;

  const currentSelection = step === 1 ? primarySelection : subSelection;

  const getTitle = () => {
    if (step === 1) {
      return "Qual é sua intenção?";
    }
    return primarySelection === 'RELACIONAMENTO' 
      ? "Como é sua situação com essa pessoa?"
      : primarySelection === 'SEXO'
        ? "Qual é sua situação com essa pessoa?"
        : "Como é sua amizade com essa pessoa?";
  };

  const getSubtitle = () => {
    if (step === 1) {
      return "Escolha o que melhor representa o que você busca só pode escolher 1 vez, não é possível refazer o teste com outra opção";
    }
    return primarySelection === 'RELACIONAMENTO'
      ? "Defina o histórico do relacionamento"
      : primarySelection === 'SEXO'
        ? "Defina seu histórico de envolvimento"
        : "Defina o tipo de amizade que vocês têm";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent p-4">
      <div className="container mx-auto max-w-2xl pt-8">
        <Card className="p-8" data-testid="card-intention-selection">
          <div className="mb-6">
            <Button variant="ghost" onClick={handleBack} className="p-0" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {step === 2 ? 'Voltar' : 'Voltar'}
            </Button>
          </div>

          <div className="mb-8">
            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  1
                </div>
                <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-4" data-testid="title-intention">
              {getTitle()}
            </h2>
            <p className="text-muted-foreground text-center" data-testid="subtitle-intention">
              {getSubtitle()}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <RadioGroup
              value={currentSelection}
              onValueChange={(value) => {
                if (step === 1) {
                  handlePrimarySelection(value as PrimaryIntention);
                } else {
                  handleSubSelection(value as RelationshipSubIntention | SexSubIntention);
                }
              }}
              data-testid={`radio-group-intentions-step-${step}`}
            >
              {currentOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div key={option.value}>
                    <Label
                      htmlFor={option.value}
                      className="flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer hover-elevate transition-all duration-200 hover:border-primary"
                      data-testid={`label-intention-${option.value}`}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        data-testid={`radio-intention-${option.value}`}
                      />
                      <div className="flex items-center space-x-3 flex-1">
                        <IconComponent className={`h-6 w-6 ${option.color}`} />
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">
                            {option.label}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            {step === 2 && (
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                data-testid="button-previous-step"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
            )}
            <div className="flex-1" />
            <Button
              onClick={handleNext}
              disabled={!currentSelection}
              data-testid="button-next-intention"
            >
              {step === 1 ? 'Próximo' : 'Continuar'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}