import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface LoginFormProps {
  onBack: () => void;
  onLogin: (instagram: string, password: string) => void;
}

export default function LoginForm({ onBack, onLogin }: LoginFormProps) {
  const [instagram, setInstagram] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(instagram, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent p-4">
      <div className="container mx-auto max-w-md pt-16">
        <Card className="p-8" data-testid="card-login">
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="p-0" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-primary mb-6" data-testid="text-title">
            Entrar
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instagram" data-testid="label-instagram">Instagram:</Label>
              <Input
                id="instagram"
                type="text"
                placeholder="@seunome"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                data-testid="input-instagram"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" data-testid="label-password">Senha:</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
              />
            </div>
            
            <div className="space-y-4 pt-4">
              <Button type="submit" className="w-full" data-testid="button-submit">
                Entrar
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={onBack} data-testid="button-cancel">
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}