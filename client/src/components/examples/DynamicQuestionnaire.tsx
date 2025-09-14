import DynamicQuestionnaire from '../DynamicQuestionnaire';

export default function DynamicQuestionnaireExample() {
  return (
    <DynamicQuestionnaire 
      preference="ativo"
      onBack={() => console.log('Back clicked')}
      onComplete={(answers) => console.log('Questionnaire completed:', answers)}
    />
  );
}