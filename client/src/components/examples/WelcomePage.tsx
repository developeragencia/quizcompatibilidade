import WelcomePage from '../WelcomePage';

export default function WelcomePageExample() {
  return (
    <WelcomePage 
      onShowLogin={() => console.log('Login clicked')}
      onShowRegister={() => console.log('Register clicked')}
    />
  );
}