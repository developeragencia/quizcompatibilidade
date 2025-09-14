import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface WelcomePageProps {
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export default function WelcomePage({ onShowLogin, onShowRegister }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent p-4">
      <div className="container mx-auto max-w-2xl pt-16">
        <Card className="p-8 text-center" data-testid="card-welcome">
          <div className="mb-6">
            <Heart className="mx-auto h-16 w-16 text-primary animate-pulse" data-testid="icon-heart" />
          </div>
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4" data-testid="text-title">
              Teste de Compatibilidade
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-subtitle">
              Descubra se você é compatível com Alex Oliveira para um relacionamento sério ou apenas diversão
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full" 
              onClick={onShowLogin}
              data-testid="button-login"
            >
              Fazer Login
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full" 
              onClick={onShowRegister}
              data-testid="button-register"
            >
              Cadastrar-se
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}