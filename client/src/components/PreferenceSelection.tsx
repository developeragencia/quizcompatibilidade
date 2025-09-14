import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User } from "lucide-react";

interface PreferenceSelectionProps {
  onBack: () => void;
  onSelectPreference: (preference: SexualPreference) => void;
}

export type SexualPreference = "ativo" | "passivo" | "versatil_ativo" | "versatil_passivo" | "totalmente_ativo" | "totalmente_passivo";

const preferences = [
  {
    id: "totalmente_ativo" as SexualPreference,
    title: "Totalmente Ativo",
    description: "Sempre no controle, gosta de dominar",
    icon: "🔥",
    color: "bg-red-100 hover:bg-red-200 border-red-300"
  },
  {
    id: "ativo" as SexualPreference,
    title: "Ativo", 
    description: "Gosta de liderar, mas tem flexibilidade",
    icon: "⚡",
    color: "bg-orange-100 hover:bg-orange-200 border-orange-300"
  },
  {
    id: "versatil_ativo" as SexualPreference,
    title: "Versátil Ativo",
    description: "Flexível mas prefere ser ativo",
    icon: "🌟",
    color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
  },
  {
    id: "versatil_passivo" as SexualPreference,
    title: "Versátil Passivo",
    description: "Flexível mas prefere ser passivo",
    icon: "🌸",
    color: "bg-green-100 hover:bg-green-200 border-green-300"
  },
  {
    id: "passivo" as SexualPreference,
    title: "Passivo",
    description: "Gosta de ser conduzido",
    icon: "💖",
    color: "bg-blue-100 hover:bg-blue-200 border-blue-300"
  },
  {
    id: "totalmente_passivo" as SexualPreference,
    title: "Totalmente Passivo",
    description: "Sempre receptivo, gosta de ser dominado",
    icon: "🎀",
    color: "bg-purple-100 hover:bg-purple-200 border-purple-300"
  }
];

export default function PreferenceSelection({ onBack, onSelectPreference }: PreferenceSelectionProps) {
  const [selectedPreference, setSelectedPreference] = useState<SexualPreference | null>(null);

  const handleContinue = () => {
    if (selectedPreference) {
      onSelectPreference(selectedPreference);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent p-4">
      <div className="container mx-auto max-w-4xl pt-8">
        <Card className="p-8" data-testid="card-preference-selection">
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="p-0" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <User className="mx-auto h-16 w-16 text-primary mb-4" data-testid="icon-user" />
            <h2 className="text-3xl font-bold text-primary mb-4" data-testid="text-title">
              Qual é o seu estilo?
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="text-subtitle">
              Selecione sua preferência para personalizarmos o questionário especialmente para você
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {preferences.map((pref) => (
              <Card
                key={pref.id}
                className={`p-6 cursor-pointer transition-all duration-200 hover-elevate ${
                  selectedPreference === pref.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedPreference(pref.id)}
                data-testid={`card-preference-${pref.id}`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3" data-testid={`icon-preference-${pref.id}`}>
                    {pref.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2" data-testid={`title-preference-${pref.id}`}>
                    {pref.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`desc-preference-${pref.id}`}>
                    {pref.description}
                  </p>
                  {selectedPreference === pref.id && (
                    <Badge className="mt-3" data-testid={`badge-selected-${pref.id}`}>
                      Selecionado
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleContinue}
              disabled={!selectedPreference}
              data-testid="button-continue"
            >
              Continuar para o Questionário
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}