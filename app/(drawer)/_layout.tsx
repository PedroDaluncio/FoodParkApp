import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: 'Página Inicial' }} />
      <Drawer.Screen name="stores" options={{ title: 'Lojas Participantes' }} />
    </Drawer>
  );
}
