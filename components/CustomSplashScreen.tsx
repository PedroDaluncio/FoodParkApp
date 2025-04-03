import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  useColorScheme,
} from "react-native";

// Definição completa dos temas
const themes = {
  light: {
    background: "#ffffff",
    text: "#000000",
    primary: "#FF6B00",
    accent: "#FFE0CC",
    shadow: "rgba(0, 0, 0, 0.1)",
  },
  dark: {
    background: "#121212",
    text: "#ffffff",
    primary: "#FF8F3F",
    accent: "#3F2E22",
    shadow: "rgba(255, 255, 255, 0.1)",
  },
};

interface CustomSplashScreenProps {
  onAnimationComplete?: () => void;
  theme?: "light" | "dark" | "system"; // Adicionamos a opção "system"
}

export default function CustomSplashScreen({
  onAnimationComplete,
  theme = "system", // Sistema como padrão
}: CustomSplashScreenProps): React.JSX.Element {
  // Usando o hook nativo para detectar o esquema de cores do sistema
  const systemColorScheme = useColorScheme();

  // Determina qual tema usar
  const effectiveTheme =
    theme === "system"
      ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : theme;

  // Usando o tema efetivo
  const currentTheme =
    themes[effectiveTheme as keyof typeof themes] || themes.light;

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animação de rotação
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Adicionando uma animação de pulsação para tornar mais visível
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    if (onAnimationComplete) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [onAnimationComplete, rotateAnim, scaleAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.background,
        },
      ]}
    >
      {/* <Text style={{ color: currentTheme.text, marginBottom: 20 }}>
        {effectiveTheme === "dark" ? "Modo Escuro" : "Modo Claro"}
        {theme === "system" && " (Sistema)"}
      </Text> */}

      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ rotate: spin }, { scale: scaleAnim }],
            shadowColor: currentTheme.shadow,
          },
        ]}
      >
        <Image
          // Alterando a imagem com base no tema
          source={
            effectiveTheme === "dark"
              ? require("../assets/images/lanchotech2.png")
              : require("../assets/images/lanchotech.png")
          }
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    padding: 20,
    borderRadius: 100,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  image: {
    width: 150,
    height: 150,
  },
});
