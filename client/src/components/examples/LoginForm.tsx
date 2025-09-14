import LoginForm from '../LoginForm';

export default function LoginFormExample() {
  return (
    <LoginForm 
      onBack={() => console.log('Back clicked')}
      onLogin={(instagram, password) => console.log('Login:', instagram, password)}
    />
  );
}