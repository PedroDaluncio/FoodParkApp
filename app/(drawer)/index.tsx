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
  Platform,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import database from "../../assets/database/stores.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Stores() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const openMaps = (latitude: number, longitude: number, label: string) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url || "");
  };

  return (
    <SafeAreaView style={isDark ? styles.safeAreaDark : styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/react-logo.png")}
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
        <View style={isDark ? styles.cardDark : styles.card}>
          <Text style={isDark ? styles.sectionTitleDark : styles.sectionTitle}>
            Informações Gerais
          </Text>

          <View style={styles.infoRow}>
            <Ionicons
              name="business-outline"
              size={20}
              color={isDark ? "#bbb" : "#555"}
            />
            <View style={styles.infoContent}>
              <Text style={isDark ? styles.infoLabelDark : styles.infoLabel}>
                Pátio
              </Text>
              <Text style={isDark ? styles.infoValueDark : styles.infoValue}>
                Lancho-Tech
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="call-outline"
              size={20}
              color={isDark ? "#bbb" : "#555"}
            />
            <View style={styles.infoContent}>
              <Text style={isDark ? styles.infoLabelDark : styles.infoLabel}>
                Telefone
              </Text>
              <Text
                style={isDark ? styles.infoValueDark : styles.infoValue}
                onPress={() => Linking.openURL("tel:+5599400289223")}
              >
                (99) 4002-8922
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="location-outline"
              size={20}
              color={isDark ? "#bbb" : "#555"}
            />
            <View style={styles.infoContent}>
              <Text style={isDark ? styles.infoLabelDark : styles.infoLabel}>
                Endereço
              </Text>
              <Text style={isDark ? styles.infoValueDark : styles.infoValue}>
                Av. Paulista, 1000 - Bela Vista, São Paulo - SP
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => openMaps(-23.5674, -46.6476, "Food Park App")}
          >
            <Ionicons name="map-outline" size={18} color="#fff" />
            <Text style={styles.mapButtonText}>Abrir no Maps</Text>
          </TouchableOpacity>
        </View>

        {/* Redes Sociais */}
        <View style={isDark ? styles.cardDark : styles.card}>
          <Text style={isDark ? styles.sectionTitleDark : styles.sectionTitle}>
            Redes Sociais
          </Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: "#25D366" }]}
              onPress={() =>
                Linking.openURL("whatsapp://send?phone=+5511999999999")
              }
            >
              <Ionicons name="logo-whatsapp" size={18} color="#fff" />
              <Text style={styles.socialText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: "#E1306C" }]}
              onPress={() =>
                Linking.openURL("https://instagram.com/foodparkapp")
              }
            >
              <Ionicons name="logo-instagram" size={18} color="#fff" />
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: "#1877F2" }]}
              onPress={() =>
                Linking.openURL("https://facebook.com/foodparkapp")
              }
            >
              <Ionicons name="logo-facebook" size={18} color="#fff" />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: "#0077B5" }]}
              onPress={() => Linking.openURL("https://www.foodparkapp.com")}
            >
              <Ionicons name="globe-outline" size={18} color="#fff" />
              <Text style={styles.socialText}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: "#D44638" }]}
              onPress={() => Linking.openURL("mailto:contato@foodparkapp.com")}
            >
              <Ionicons name="mail-outline" size={18} color="#fff" />
              <Text style={styles.socialText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Imagens das lojas */}
        <View style={isDark ? styles.cardDark : styles.card}>
          <Text style={isDark ? styles.sectionTitleDark : styles.sectionTitle}>
            Nossas Lojas
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
            estimatedItemSize={150}
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
    backgroundColor: "#f5f5f5",
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
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  titleDark: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  sectionTitleDark: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#eee",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#777",
    marginBottom: 2,
  },
  infoLabelDark: {
    fontSize: 14,
    color: "#999",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  infoValueDark: {
    fontSize: 16,
    color: "#ddd",
    fontWeight: "500",
  },
  mapButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  mapButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  socialContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    margin: 5,
  },
  socialText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 6,
  },
  flashListContainer: {
    paddingVertical: 10,
  },
  photoItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 14,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  photoItemDark: {
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    marginRight: 14,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  photo: {
    width: 160,
    height: 160,
    borderRadius: 8,
  },
  photoTitle: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  photoTitleDark: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#ddd",
    textAlign: "center",
  },
});
