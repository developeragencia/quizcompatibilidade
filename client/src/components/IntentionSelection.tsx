import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Heart, Flame, RotateCcw, Users } from "lucide-react";

export type UserIntention = 
  | 'QUERO_RELACIONAMENTO' 
  | 'QUERO_SEXO' 
  | 'JA_FIQUEI_QUERO_NOVAMENTE' 
  | 'NAO_FIQUEI_QUERO_FICAR';

interface IntentionSelectionProps {
  onBack: () => void;
  onNext: (intention: UserIntention) => void;
}

const intentions = [
  {
    value: 'QUERO_RELACIONAMENTO' as UserIntention,
    label: 'QUERO RELACIONAMENTO',
    description: 'Busco algo sério, duradouro e com sentimento',
    icon: Heart,
    color: 'text-red-500'
  },
  {
    value: 'QUERO_SEXO' as UserIntention,
    label: 'QUERO SEXO',
    description: 'Procuro diversão, prazer e encontros casuais',
    icon: Flame,
    color: 'text-orange-500'
  },
  {
    value: 'JA_FIQUEI_QUERO_NOVAMENTE' as UserIntention,
    label: 'JÁ FIQUEI E QUERO DE NOVO',
    description: 'Já rolou algo e quero repetir a experiência',
    icon: RotateCcw,
    color: 'text-blue-500'
  },
  {
    value: 'NAO_FIQUEI_QUERO_FICAR' as UserIntention,
    label: 'NÃO FIQUEI E QUERO FICAR',
    description: 'Ainda não rolou, mas tenho interesse em ficar',
    icon: Users,
    color: 'text-green-500'
  }
];

export default function IntentionSelection({ onBack, onNext }: IntentionSelectionProps) {
  const [selectedIntention, setSelectedIntention] = useState<UserIntention | ''>('');

  const handleNext = () => {
    if (selectedIntention) {
      onNext(selectedIntention);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent p-4">
      <div className="container mx-auto max-w-2xl pt-8">
        <Card className="p-8" data-testid="card-intention-selection">
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="p-0" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-4" data-testid="title-intention">
              Qual é sua intenção?
            </h2>
            <p className="text-muted-foreground text-center" data-testid="subtitle-intention">
              Escolha o que melhor representa o que você busca
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <RadioGroup
              value={selectedIntention}
              onValueChange={(value) => setSelectedIntention(value as UserIntention)}
              data-testid="radio-group-intentions"
            >
              {intentions.map((intention) => {
                const IconComponent = intention.icon;
                return (
                  <div key={intention.value}>
                    <Label
                      htmlFor={intention.value}
                      className="flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer hover-elevate transition-all duration-200 hover:border-primary"
                      data-testid={`label-intention-${intention.value}`}
                    >
                      <RadioGroupItem
                        value={intention.value}
                        id={intention.value}
                        data-testid={`radio-intention-${intention.value}`}
                      />
                      <div className="flex items-center space-x-3 flex-1">
                        <IconComponent className={`h-6 w-6 ${intention.color}`} />
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">
                            {intention.label}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {intention.description}
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!selectedIntention}
              data-testid="button-next-intention"
            >
              Próximo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}