import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';



export default function DrawerLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="index" options={{ drawerLabel: "Página Inicial" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
