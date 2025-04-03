import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts, Amethysta_400Regular } from "@expo-google-fonts/amethysta";

import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";
import CustomSplashScreen from "@/components/CustomSplashScreen";

// Previne a splash screen de sumir antes do carregamento
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Amethysta_400Regular,
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (loaded) {
      // Hide the native splash screen when fonts are loaded
      SplashScreen.hideAsync();
      // But we'll keep showing our custom splash screen until its animation completes
    }
  }, [loaded]);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Show custom splash screen if fonts are loaded but animation isn't complete
  if (loaded && showSplash) {
    return <CustomSplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  // Don't render anything until fonts are loaded
  if (!loaded || showSplash) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
