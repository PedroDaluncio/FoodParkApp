import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,  // Não mostrar header extra
      }}
    >
      <Stack.Screen name="teste" options={{ title: 'Página de Teste' }} />
    </Stack>
  );
}
