import ResultsPage from '../ResultsPage';

// Mock data for demo
const mockAnswers = {
  hygiene: 'Sempre, é fundamental',
  shower_before: 'Sempre',
  work_life: 'Amo o que faço',
  future_goals: 'Crescer profissionalmente e ter uma família',
  relationship_type: 'Algo sério e duradouro',
  penis_size: '18',
  penis_appearance: 'Aparado',
  likes_in_bottom: 'Bunda média',
  sexual_intensity: 'Intenso e quente',
  favorite_position: 'Criativa',
  sexual_frequency: 'Algumas vezes por semana'
};

const mockUserData = {
  name: 'João Silva',
  age: 28,
  zodiac: 'Leão'
};

export default function ResultsPageExample() {
  return (
    <ResultsPage 
      preference="ativo"
      answers={mockAnswers}
      userData={mockUserData}
      onRetakeTest={() => console.log('Retake test clicked')}
      onLogout={() => console.log('Logout clicked')}
    />
  );
}