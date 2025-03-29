import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,  // Não mostrar header extra
      }}
    >
      <Stack.Screen name="teste" options={{ title: 'Página de Teste' }} />
    </Stack>
  );
}
