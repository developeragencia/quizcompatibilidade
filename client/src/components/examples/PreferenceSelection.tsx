import PreferenceSelection from '../PreferenceSelection';

export default function PreferenceSelectionExample() {
  return (
    <PreferenceSelection 
      onBack={() => console.log('Back clicked')}
      onSelectPreference={(preference) => console.log('Selected preference:', preference)}
    />
  );
}