import { Stack } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";

export default function StackLayout() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())} // Abre o Drawer
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="details" options={{ title: "Detalhes" }} />
      <Stack.Screen name="teste" options={{ title: "Página de Teste" }} />
    </Stack>
  );
}
