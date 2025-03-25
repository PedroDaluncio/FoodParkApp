import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";

const placeHolderImage = require("../../assets/images/shwarma.webp")

export default function Index(){
  return (
    <View style={styles.container}>
      <Image source={placeHolderImage} style={styles.image}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  }
})