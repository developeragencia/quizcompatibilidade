import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Trophy, Lightbulb, RefreshCw, LogOut } from "lucide-react";
import type { SexualPreference } from './PreferenceSelection';
import type { QuestionnaireAnswers } from './DynamicQuestionnaire';

interface ResultsPageProps {
  preference: SexualPreference;
  answers: QuestionnaireAnswers;
  userData: {
    name: string;
    age: number;
    zodiac: string;
  };
  onRetakeTest: () => void;
  onLogout: () => void;
}

interface CompatibilityResult {
  score: number;
  message: string;
  color: string;
  tips: string[];
}

// Fun tips as requested by user
const funTips = [
  "🚿 Sempre tome banho antes dos encontros - ninguém resiste a alguém cheirosinho!",
  "🦷 Escove os dentes e use fio dental - seu sorriso é seu cartão de visitas!",
  "🧴 Use desodorante e perfume suave - o olfato é um dos sentidos mais poderosos!",
  "🛡️ Use sempre camisinha - sexo seguro é sexy e demonstra cuidado!",
  "💅 Cuide das unhas - detalhes fazem toda a diferença!",
  "🧼 Higiene íntima é fundamental - seja sempre limpo e cuidadoso!",
  "💪 Exercite-se - disposição física melhora tudo na cama!",
  "😌 Confiança é atrativa - seja você mesmo com orgulho!",
  "🗣️ Comunicação é chave - fale sobre suas preferências e limites!",
  "❤️ Respeito mútuo torna tudo mais gostoso!",
  "🍎 Coma bem e beba água - uma alimentação saudável reflete na energia sexual!",
  "😴 Durma bem - descanso adequado melhora seu desempenho em tudo!",
  "🧘 Relaxe e curta o momento - ansiedade é inimiga do prazer!",
  "🎯 Seja pontual nos encontros - demonstra respeito e interesse!",
  "📱 Desligue o celular na hora H - a pessoa merece sua atenção total!"
];

const calculateCompatibility = (answers: QuestionnaireAnswers, preference: SexualPreference): CompatibilityResult => {
  // Função que calcula compatibilidade considerando pesos e respostas parciais
  let score = 0;
  let totalQuestions = Object.keys(answers).length;
  
  // Alex's "ideal" answers for 100% compatibility (as requested by user)
  const idealAnswers: { [key: string]: string } = {
    hygiene: 'Sempre, é fundamental',
    // Novo cálculo: considera pesos das perguntas e respostas parciais
    // Ideal answers e pesos podem ser expandidos conforme questionBank
    const idealAnswers: { [key: string]: string } = {
      hygiene: 'Sempre, é fundamental',
      shower_before: 'Sempre',
      work_life: 'Amo o que faço',
      relationship_type: 'Algo sério e duradouro',
      sexual_frequency: 'Algumas vezes por semana',
      // Adicione mais conforme necessário
    };
    // Preferência específica
    if (preference.includes('ativo')) {
      idealAnswers.penis_size = '18';
      idealAnswers.likes_in_bottom = 'Bunda média';
      idealAnswers.sexual_intensity = 'Intenso e quente';
    }
    if (preference.includes('passivo')) {
      idealAnswers.butt_size = 'Média';
      idealAnswers.butt_tightness = 'Apertada';
      idealAnswers.likes_in_top = 'Personalidade';
    }
    // Pesos das perguntas (exemplo, pode ser expandido)
    const questionWeights: { [key: string]: number } = {
      hygiene: 1,
      shower_before: 0.8,
      work_life: 0.7,
      relationship_type: 1,
      sexual_frequency: 0.9,
      penis_size: 0.7,
      likes_in_bottom: 0.6,
      sexual_intensity: 0.8,
      butt_size: 0.7,
      butt_tightness: 0.7,
      likes_in_top: 0.6,
      // Adicione mais conforme necessário
    };
    let totalWeight = 0;
    let userScore = 0;
    Object.keys(answers).forEach(questionId => {
      const weight = questionWeights[questionId] || 0.5;
      totalWeight += weight;
      if (idealAnswers[questionId]) {
        if (answers[questionId] === idealAnswers[questionId]) {
          userScore += weight;
        } else if (typeof answers[questionId] === 'string' && answers[questionId] && idealAnswers[questionId]) {
          // Resposta parcialmente correta (exemplo: contém parte da resposta ideal)
          if ((answers[questionId] as string).toLowerCase().includes(idealAnswers[questionId].toLowerCase().slice(0, 4))) {
            userScore += weight * 0.5;
          }
        }
      }
    });
    const percentage = totalWeight > 0 ? Math.round((userScore / totalWeight) * 100) : 0;
    let message: string;
    let color: string;
    if (percentage === 100) {
      message = "🎉 PERFEITO! Vocês são totalmente compatíveis! Alex está esperando por você! 💖";
      color = "text-green-600";
    } else if (percentage >= 90) {
      message = "😊 Quase lá! Vocês têm muita compatibilidade, mas alguns ajustes podem ajudar.";
      color = "text-yellow-600";
    } else if (percentage >= 70) {
      message = "🤔 Compatibilidade moderada. Há potencial, mas precisam conversar mais sobre expectativas.";
      color = "text-orange-600";
    } else {
      message = "😢 Pouca compatibilidade no momento. Talvez vocês sejam melhores como amigos por enquanto.";
      color = "text-red-600";
    }
    // Dicas aleatórias
    const shuffled = [...funTips].sort(() => 0.5 - Math.random());
    const tips = shuffled.slice(0, 5);
    return { score: percentage, message, color, tips };
  useEffect(() => {
    const calculatedResult = calculateCompatibility(answers, preference);
    setResult(calculatedResult);
    
    // Trigger animation after a short delay
    setTimeout(() => setShowAnimation(true), 500);
  }, [answers, preference]);
  
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center">
        <Card className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Calculando sua compatibilidade...</p>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent p-4">
      <div className="container mx-auto max-w-4xl pt-8">
        {/* Main Result Card */}
        <Card className="p-8 mb-6 text-center" data-testid="card-results">
          <div className="mb-6">
            {result.score === 100 ? (
              <Trophy className="mx-auto h-20 w-20 text-yellow-500 animate-pulse" data-testid="icon-trophy" />
            ) : (
              <Heart className="mx-auto h-20 w-20 text-primary" data-testid="icon-heart" />
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-primary mb-4" data-testid="text-title">
            Resultado da Compatibilidade
          </h1>
          
          <div className={`text-6xl font-bold mb-4 ${result.color} ${showAnimation ? 'animate-pulse' : ''}`} data-testid="text-score">
            {result.score}%
          </div>
          
          <Progress value={result.score} className="h-4 mb-6" data-testid="progress-compatibility" />
          
          <p className={`text-xl mb-6 ${result.color} font-medium`} data-testid="text-message">
            {result.message}
          </p>
          
          <Badge variant="outline" className="text-sm" data-testid="badge-preference">
            Preferência: {preference}
          </Badge>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Data Card */}
          <Card data-testid="card-user-data">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Seus Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Nome:</span>
                <span data-testid="text-user-name">{userData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Idade:</span>
                <span data-testid="text-user-age">{userData.age} anos</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Signo:</span>
                <span data-testid="text-user-zodiac">{userData.zodiac}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Preferência:</span>
                <span data-testid="text-user-preference">{preference}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Perguntas Respondidas:</span>
                <span data-testid="text-questions-count">{Object.keys(answers).length}</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Tips Card */}
          <Card data-testid="card-tips">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Dicas Especiais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.tips.map((tip, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-muted/50 rounded-lg text-sm"
                    data-testid={`tip-${index}`}
                  >
                    {tip}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Action Buttons */}
        <Card className="p-6 mt-6" data-testid="card-actions">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onRetakeTest}
              data-testid="button-retake"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refazer Teste
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onLogout}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}