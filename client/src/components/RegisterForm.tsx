import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar, Star } from "lucide-react";

interface RegisterFormProps {
  onBack: () => void;
  onRegister: (data: RegisterData) => void;
}

interface RegisterData {
  name: string;
  instagram: string;
  password: string;
  birthdate: string;
  accepted: boolean;
}

const zodiacSigns = [
  { name: "Áries", start: [3, 21], end: [4, 19], quote: "Sua energia contagia a todos!" },
  { name: "Touro", start: [4, 20], end: [5, 20], quote: "Determinação é seu ponto forte!" },
  { name: "Gêmeos", start: [5, 21], end: [6, 20], quote: "Versatilidade te torna único!" },
  { name: "Câncer", start: [6, 21], end: [7, 22], quote: "Sua sensibilidade é um dom!" },
  { name: "Leão", start: [7, 23], end: [8, 22], quote: "Brilhe como a estrela que você é!" },
  { name: "Virgem", start: [8, 23], end: [9, 22], quote: "Perfeição é sua marca registrada!" },
  { name: "Libra", start: [9, 23], end: [10, 22], quote: "Equilíbrio é sua sabedoria!" },
  { name: "Escorpião", start: [10, 23], end: [11, 21], quote: "Intensidade te define!" },
  { name: "Sagitário", start: [11, 22], end: [12, 21], quote: "Aventura te chama!" },
  { name: "Capricórnio", start: [12, 22], end: [1, 19], quote: "Ambição te leva longe!" },
  { name: "Aquário", start: [1, 20], end: [2, 18], quote: "Inovação é seu talento!" },
  { name: "Peixes", start: [2, 19], end: [3, 20], quote: "Intuição te guia!" }
];

function calculateAge(birthdate: string): number {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

function getZodiacSign(birthdate: string): { name: string; quote: string } {
  const birth = new Date(birthdate);
  const month = birth.getMonth() + 1;
  const day = birth.getDate();
  
  for (const sign of zodiacSigns) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    
    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (startMonth > endMonth && (month === startMonth || month === endMonth))
    ) {
      return { name: sign.name, quote: sign.quote };
    }
  }
  
  return { name: "Desconhecido", quote: "Você é único!" };
}

export default function RegisterForm({ onBack, onRegister }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [showBirthInfo, setShowBirthInfo] = useState(false);

  const age = birthdate ? calculateAge(birthdate) : 0;
  const zodiac = birthdate ? getZodiacSign(birthdate) : null;

  const handleBirthdateChange = (value: string) => {
    setBirthdate(value);
    setShowBirthInfo(!!value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      alert('Você deve aceitar os termos para continuar');
      return;
    }
    if (age < 18) {
      alert('Você deve ter pelo menos 18 anos para participar');
      return;
    }
    onRegister({ name, instagram, password, birthdate, accepted });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent p-4">
      <div className="container mx-auto max-w-md pt-8">
        <Card className="p-8" data-testid="card-register">
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="p-0" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-primary mb-6" data-testid="text-title">
            Cadastrar-se
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" data-testid="label-name">Primeiro Nome:</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ex: João"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-testid="input-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagram" data-testid="label-instagram">Instagram:</Label>
              <Input
                id="instagram"
                type="text"
                placeholder="@seunome"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                required
                data-testid="input-instagram"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" data-testid="label-password">Senha:</Label>
              <Input
                id="password"
                type="password"
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthdate" data-testid="label-birthdate">Data de Nascimento:</Label>
              <Input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => handleBirthdateChange(e.target.value)}
                required
                data-testid="input-birthdate"
              />
            </div>
            
            {showBirthInfo && zodiac && (
              <Card className="p-4 bg-muted/50 border border-primary/20" data-testid="card-birth-info">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">Sua Idade:</span>
                    <span data-testid="text-age">{age} anos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-medium">Seu Signo:</span>
                    <span data-testid="text-zodiac">{zodiac.name}</span>
                  </div>
                  <div className="italic text-muted-foreground" data-testid="text-quote">
                    "{zodiac.quote}"
                  </div>
                </div>
              </Card>
            )}
            
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="accepted"
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(checked === true)}
                data-testid="checkbox-accept"
              />
              <Label htmlFor="accepted" className="text-sm leading-5" data-testid="label-accept">
                Aceito participar do teste de compatibilidade e que meus dados sejam analisados pelo Alex
              </Label>
            </div>
            
            <div className="space-y-4 pt-4">
              <Button type="submit" className="w-full" data-testid="button-submit">
                Cadastrar
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