import RegisterForm from '../RegisterForm';

export default function RegisterFormExample() {
  return (
    <RegisterForm 
      onBack={() => console.log('Back clicked')}
      onRegister={(data) => console.log('Register:', data)}
    />
  );
}