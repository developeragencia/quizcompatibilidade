import { useState } from "react";
import WelcomePage from './WelcomePage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import IntentionSelection, { type UserIntention } from './IntentionSelection';
import PreferenceSelection, { type SexualPreference } from './PreferenceSelection';
import DynamicQuestionnaire, { type QuestionnaireAnswers } from './DynamicQuestionnaire';
import ResultsPage from './ResultsPage';

type AppState = 'welcome' | 'login' | 'register' | 'intentions' | 'preferences' | 'questionnaire' | 'results';

interface UserData {
  id?: string;
  name: string;
  instagram: string;
  age: number;
  zodiac: string;
}

export default function CompatibilityTestApp() {
  // Este componente controla o fluxo principal do quiz de compatibilidade.
  // Estados: tela atual, dados do usuário, intenção, preferência, respostas, loading e erro.
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedIntention, setSelectedIntention] = useState<UserIntention | null>(null);
  const [selectedPreference, setSelectedPreference] = useState<SexualPreference | null>(null);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate age from birthdate
  const calculateAge = (birthdate: string): number => {
  // Calcula idade a partir da data de nascimento
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // Get zodiac sign from birthdate  
  const getZodiacSign = (birthdate: string): string => {
  // Retorna o signo do usuário a partir da data de nascimento
    const birth = new Date(birthdate);
    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    
    const zodiacSigns = [
      { name: "Áries", start: [3, 21], end: [4, 19] },
      { name: "Touro", start: [4, 20], end: [5, 20] },
      { name: "Gêmeos", start: [5, 21], end: [6, 20] },
      { name: "Câncer", start: [6, 21], end: [7, 22] },
      { name: "Leão", start: [7, 23], end: [8, 22] },
      { name: "Virgem", start: [8, 23], end: [9, 22] },
      { name: "Libra", start: [9, 23], end: [10, 22] },
      { name: "Escorpião", start: [10, 23], end: [11, 21] },
      { name: "Sagitário", start: [11, 22], end: [12, 21] },
      { name: "Capricórnio", start: [12, 22], end: [1, 19] },
      { name: "Aquário", start: [1, 20], end: [2, 18] },
      { name: "Peixes", start: [2, 19], end: [3, 20] }
    ];
    
    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;
      
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (startMonth > endMonth && (month === startMonth || month === endMonth))
      ) {
        return sign.name;
      }
    }
    
    return "Desconhecido";
  };

  const handleShowLogin = () => setCurrentState('login');
  // Navegação entre telas
  const handleShowRegister = () => setCurrentState('register');
  const handleBack = () => setCurrentState('welcome');
  
  const handleLogin = async (instagram: string, password: string) => {
  // Realiza login do usuário
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instagram, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Erro no login');
        setLoading(false);
        return;
      }
      const { user } = await response.json();
      setUserData({
        id: user.id,
        name: user.name,
        instagram: user.instagram,
        age: user.age,
        zodiac: user.zodiac
      });
      setCurrentState('intentions');
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (data: {
  // Realiza cadastro do usuário
    name: string;
    instagram: string;
    password: string;
    birthdate: string;
    accepted: boolean;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const age = calculateAge(data.birthdate);
      const zodiac = getZodiacSign(data.birthdate);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          instagram: data.instagram,
          password: data.password,
          birthdate: data.birthdate,
          age,
          zodiac
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Erro no cadastro');
        setLoading(false);
        return;
      }
      const { user } = await response.json();
      setUserData({
        id: user.id,
        name: user.name,
        instagram: user.instagram,
        age: user.age,
        zodiac: user.zodiac
      });
      setCurrentState('intentions');
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectPreference = async (preference: SexualPreference) => {
  // Salva preferência sexual do usuário
    setLoading(true);
    setError(null);
    try {
      if (!userData) return;
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.id || userData.instagram, // fallback
          sexualPreference: preference
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao salvar preferência');
        setLoading(false);
        return;
      }
      setSelectedPreference(preference);
      setCurrentState('questionnaire');
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };
  
  const handleQuestionnaireComplete = async (answers: QuestionnaireAnswers) => {
  // Salva respostas do questionário
    setLoading(true);
    setError(null);
    try {
      if (!userData) return;
      const isFriendship = selectedIntention?.startsWith('AMIZADE_');
      if (!isFriendship && !selectedPreference) return;
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.id || userData.instagram, // fallback
          preference: selectedPreference || null, // null for friendship
          answers
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao salvar questionário');
        setLoading(false);
        return;
      }
      setQuestionnaireAnswers(answers);
      setCurrentState('results');
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectIntention = (intention: UserIntention) => {
  // Seleciona intenção do usuário
    setSelectedIntention(intention);
    // For friendship intentions, skip preferences and go directly to questionnaire
    if (intention.startsWith('AMIZADE_')) {
      setCurrentState('questionnaire');
    } else {
      setCurrentState('preferences');
    }
  };
  
  const handleRetakeTest = () => {
  // Permite refazer o teste
    setSelectedIntention(null);
    setSelectedPreference(null);
    setQuestionnaireAnswers(null);
    setCurrentState('intentions');
  };
  
  const handleLogout = () => {
  // Realiza logout do usuário
    setUserData(null);
    setSelectedIntention(null);
    setSelectedPreference(null);
    setQuestionnaireAnswers(null);
    setCurrentState('welcome');
  };

  // Render current state
  // Feedback visual de loading e erro
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Carregando...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="text-center">
          <div className="rounded-full h-16 w-16 bg-destructive mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-3xl">!</span>
          </div>
          <p className="text-lg text-destructive font-bold mb-2">{error}</p>
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded" onClick={() => setError(null)}>Tentar novamente</button>
        </div>
      </div>
    );
  }
  // ...existing code...
}