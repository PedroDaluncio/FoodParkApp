import React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Linking,
  useColorScheme,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import database from "../../assets/database/stores.json";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Stores() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  return (
    <SafeAreaView style={isDark ? styles.safeAreaDark : styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/react-logo.png")} // Substitua pela imagem desejada
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={isDark ? styles.titleDark : styles.title}>
          FoodParkApp
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={isDark ? styles.containerDark : styles.container}
      >
        {/* Informações Gerais */}
        <View style={isDark ? styles.infoSectionDark : styles.infoSection}>
          <Text style={isDark ? styles.sectionTitleDark : styles.sectionTitle}>
            Informações Gerais:
          </Text>
          <View style={styles.sectionInfo}>
            <Text style={isDark ? styles.infoItemDark : styles.infoItem}>
              Pátio:{" "}
            </Text>
            <Text style={isDark ? styles.infoItemDark : styles.infoItem}>
              Lancho-Tech
            </Text>
          </View>
          <View style={styles.sectionInfo}>
            <Text style={isDark ? styles.infoItemDark : styles.infoItem}>
              Telefone:{" "}
            </Text>
            <Text style={isDark ? styles.infoItemDark : styles.infoItem}>
              (99) 4002-8922
            </Text>
          </View>

          {/* Redes Sociais - tudo clicável */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={isDark ? styles.socialButtonDark : styles.socialButton}
              onPress={() =>
                Linking.openURL("whatsapp://send?phone=+5511999999999")
              }
            >
              <Text style={styles.socialText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isDark ? styles.socialButtonDark : styles.socialButton}
              onPress={() =>
                Linking.openURL("https://instagram.com/foodparkapp")
              }
            >
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isDark ? styles.socialButtonDark : styles.socialButton}
              onPress={() =>
                Linking.openURL("https://facebook.com/foodparkapp")
              }
            >
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isDark ? styles.socialButtonDark : styles.socialButton}
              onPress={() => Linking.openURL("https://www.foodparkapp.com")}
            >
              <Text style={styles.socialText}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isDark ? styles.socialButtonDark : styles.socialButton}
              onPress={() => Linking.openURL("mailto:contato@foodparkapp.com")}
            >
              <Text style={styles.socialText}>E-mail</Text>
            </TouchableOpacity>
          </View>

          <Text style={isDark ? styles.infoItemDark : styles.infoItem}>
            Endereço
          </Text>
          <Text style={isDark ? styles.infoItemDark : styles.infoItem}>
            Localização
          </Text>
        </View>

        {/* Imagens das lojas */}
        <View style={isDark ? styles.photosSectionDark : styles.photosSection}>
          <Text style={isDark ? styles.sectionTitleDark : styles.sectionTitle}>
            Fotos
          </Text>
          <FlashList
            data={database}
            renderItem={({ item }) => (
              <View style={isDark ? styles.photoItemDark : styles.photoItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.photo}
                  resizeMode="cover"
                />
                <Text
                  style={isDark ? styles.photoTitleDark : styles.photoTitle}
                >
                  {item.title}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={100}
            contentContainerStyle={styles.flashListContainer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  safeAreaDark: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    padding: 16,
  },
  containerDark: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  titleDark: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  infoSection: {
    marginBottom: 24,
  },
  infoSectionDark: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  sectionTitleDark: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    color: "#eee",
  },
  sectionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoItem: {
    fontSize: 16,
    marginVertical: 4,
    color: "#555",
  },
  infoItemDark: {
    fontSize: 16,
    marginVertical: 4,
    color: "#bbb",
  },
  socialContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 8,
  },
  socialButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 4,
  },
  socialButtonDark: {
    backgroundColor: "#0066cc",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 4,
  },
  socialText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  photosSection: {
    marginBottom: 24,
    maxWidth: "100%",
  },
  photosSectionDark: {
    marginBottom: 24,
    maxWidth: "100%",
  },
  flashListContainer: {
    paddingHorizontal: 10,
  },
  photoItem: {
    alignItems: "center",
    marginRight: 12,
  },
  photoItemDark: {
    alignItems: "center",
    marginRight: 12,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  photoTitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  photoTitleDark: {
    marginTop: 8,
    fontSize: 14,
    color: "#ddd",
  },
});
