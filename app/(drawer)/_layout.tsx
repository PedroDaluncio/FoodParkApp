import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Home Page" }} />
      <Drawer.Screen name="stores" options={{ title: "Lojas Parceiras" }} />
      <Drawer.Screen
        name="schedule"
        options={{ title: "Calendário de Eventos" }}
      />
      <Drawer.Screen name="orders" options={{ title: "Meus Pedidos" }} />
    </Drawer>
  );
}
