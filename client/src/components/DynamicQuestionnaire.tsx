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
import { getQuestionsForIntentionAndRole, getFollowUpQuestions, type AdaptiveQuestion, type UserIntention, type SexualRole } from '@shared/questionBank';

interface DynamicQuestionnaireProps {
  intention: UserIntention;
  preference: SexualPreference;
  onBack: () => void;
  onComplete: (answers: QuestionnaireAnswers) => void;
}

export interface QuestionnaireAnswers {
  [key: string]: string | number;
}

interface QuestionnaireState {
  questionQueue: AdaptiveQuestion[];
  currentIndex: number;
  answeredQuestions: Set<string>;
}

export default function DynamicQuestionnaire({ intention, preference, onBack, onComplete }: DynamicQuestionnaireProps) {
  const initialQuestions = getQuestionsForIntentionAndRole(intention, preference as SexualRole);
  
  const [questionnaireState, setQuestionnaireState] = useState<QuestionnaireState>({
    questionQueue: initialQuestions,
    currentIndex: 0,
    answeredQuestions: new Set()
  });
  
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  
  const currentQuestion = questionnaireState.questionQueue[questionnaireState.currentIndex];
  const progress = ((questionnaireState.currentIndex + 1) / questionnaireState.questionQueue.length) * 100;
  
  const handleAnswer = (value: string | number) => {
    const questionId = currentQuestion.id;
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    const followUpIds = getFollowUpQuestions(questionId, value.toString());
    
    if (followUpIds.length > 0) {
      setQuestionnaireState(prev => {
        const allQuestions = getQuestionsForIntentionAndRole(intention, preference as SexualRole);
        const followUpQuestions = followUpIds
          .map(id => allQuestions.find((q: AdaptiveQuestion) => q.id === id))
          .filter((q): q is AdaptiveQuestion => q !== undefined && !prev.answeredQuestions.has(q.id));
        
        const newQueue = [...prev.questionQueue];
        newQueue.splice(prev.currentIndex + 1, 0, ...followUpQuestions);
        
        return {
          ...prev,
          questionQueue: newQueue
        };
      });
    }
    
    setQuestionnaireState(prev => {
      const newAnsweredQuestions = new Set(prev.answeredQuestions);
      newAnsweredQuestions.add(questionId);
      return {
        ...prev,
        answeredQuestions: newAnsweredQuestions
      };
    });
  };
  
  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.required && (!answer || answer === '')) {
      return false;
    }
    return true;
  };
  
  const handleNext = () => {
    if (questionnaireState.currentIndex < questionnaireState.questionQueue.length - 1) {
      setQuestionnaireState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1
      }));
    } else {
      onComplete(answers);
    }
  };
  
  const handlePrevious = () => {
    if (questionnaireState.currentIndex > 0) {
      setQuestionnaireState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1
      }));
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
                Pergunta {questionnaireState.currentIndex + 1} de {questionnaireState.questionQueue.length}
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
              disabled={questionnaireState.currentIndex === 0}
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
              {questionnaireState.currentIndex === questionnaireState.questionQueue.length - 1 ? 'Finalizar' : 'Próxima'}
              {questionnaireState.currentIndex !== questionnaireState.questionQueue.length - 1 && (
                <ArrowRight className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}