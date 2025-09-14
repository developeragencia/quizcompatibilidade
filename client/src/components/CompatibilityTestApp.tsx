import { useState } from "react";
import WelcomePage from './WelcomePage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import PreferenceSelection, { type SexualPreference } from './PreferenceSelection';
import DynamicQuestionnaire, { type QuestionnaireAnswers } from './DynamicQuestionnaire';
import ResultsPage from './ResultsPage';

type AppState = 'welcome' | 'login' | 'register' | 'preferences' | 'questionnaire' | 'results';

interface UserData {
  name: string;
  instagram: string;
  age: number;
  zodiac: string;
}

export default function CompatibilityTestApp() {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedPreference, setSelectedPreference] = useState<SexualPreference | null>(null);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers | null>(null);

  // Calculate age from birthdate
  const calculateAge = (birthdate: string): number => {
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
  const handleShowRegister = () => setCurrentState('register');
  const handleBack = () => setCurrentState('welcome');
  
  const handleLogin = (instagram: string, password: string) => {
    // TODO: Implement actual login logic with backend
    console.log('Login attempt:', { instagram, password });
    // For demo purposes, create mock user data
    setUserData({
      name: 'Demo User',
      instagram,
      age: 25,
      zodiac: 'Leo'
    });
    setCurrentState('preferences');
  };
  
  const handleRegister = (data: {
    name: string;
    instagram: string;
    password: string;
    birthdate: string;
    accepted: boolean;
  }) => {
    // TODO: Implement actual registration logic with backend
    console.log('Registration data:', data);
    
    const age = calculateAge(data.birthdate);
    const zodiac = getZodiacSign(data.birthdate);
    
    setUserData({
      name: data.name,
      instagram: data.instagram,
      age,
      zodiac
    });
    
    setCurrentState('preferences');
  };
  
  const handleSelectPreference = (preference: SexualPreference) => {
    setSelectedPreference(preference);
    setCurrentState('questionnaire');
  };
  
  const handleQuestionnaireComplete = (answers: QuestionnaireAnswers) => {
    setQuestionnaireAnswers(answers);
    setCurrentState('results');
  };
  
  const handleRetakeTest = () => {
    setSelectedPreference(null);
    setQuestionnaireAnswers(null);
    setCurrentState('preferences');
  };
  
  const handleLogout = () => {
    setUserData(null);
    setSelectedPreference(null);
    setQuestionnaireAnswers(null);
    setCurrentState('welcome');
  };

  // Render current state
  switch (currentState) {
    case 'welcome':
      return (
        <WelcomePage 
          onShowLogin={handleShowLogin}
          onShowRegister={handleShowRegister}
        />
      );
      
    case 'login':
      return (
        <LoginForm 
          onBack={handleBack}
          onLogin={handleLogin}
        />
      );
      
    case 'register':
      return (
        <RegisterForm 
          onBack={handleBack}
          onRegister={handleRegister}
        />
      );
      
    case 'preferences':
      return (
        <PreferenceSelection 
          onBack={handleLogout}
          onSelectPreference={handleSelectPreference}
        />
      );
      
    case 'questionnaire':
      if (!selectedPreference) {
        setCurrentState('preferences');
        return null;
      }
      return (
        <DynamicQuestionnaire 
          preference={selectedPreference}
          onBack={() => setCurrentState('preferences')}
          onComplete={handleQuestionnaireComplete}
        />
      );
      
    case 'results':
      if (!userData || !selectedPreference || !questionnaireAnswers) {
        setCurrentState('welcome');
        return null;
      }
      return (
        <ResultsPage 
          preference={selectedPreference}
          answers={questionnaireAnswers}
          userData={userData}
          onRetakeTest={handleRetakeTest}
          onLogout={handleLogout}
        />
      );
      
    default:
      return (
        <WelcomePage 
          onShowLogin={handleShowLogin}
          onShowRegister={handleShowRegister}
        />
      );
  }
}