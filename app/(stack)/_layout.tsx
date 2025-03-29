import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="store/[id]" options={{ title: 'Boas Vindas a Nossa Loja!' }} />
    </Stack>
  );
}
