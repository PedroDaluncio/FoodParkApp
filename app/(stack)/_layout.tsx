import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="store/[id]" options={{ title: 'Boas Vindas a Nossa Loja!' }} />
      <Stack.Screen name="menu/[id]" options={{ title: 'Cardápio' }} />
      <Stack.Screen name="items/[id]" options={{ title: 'Alimentos/Bebidas' }} />
    </Stack>
  );
}
