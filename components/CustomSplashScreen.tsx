import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";

interface CustomSplashScreenProps {
  onAnimationComplete?: () => void;
}

export default function CustomSplashScreen({
  onAnimationComplete,
}: CustomSplashScreenProps): React.JSX.Element {
  // Criando uma referência para o valor da animação
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Configurando a animação de rotação contínua
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000, // Uma rotação completa a cada 2 segundos
        useNativeDriver: true, // Melhor performance
      })
    ).start();

    // Se fornecida, chama a função de callback após um tempo para permitir
    // que a animação seja vista antes de prosseguir
    if (onAnimationComplete) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [onAnimationComplete]);

  // Interpolando o valor da animação para rotação de 0 a 360 graus
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Image
          source={require("../assets/images/lanchotech.png")}
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
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
