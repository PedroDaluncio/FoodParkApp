import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import database from "../../../assets/database/menu.json";
import stores from "../../../assets/database/stores.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Menu() {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const data = database.find(
    (item) => item.storeId.toString() === id.toString()
  );

  const store = stores.find((item) => item.id.toString() === id.toString());

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? "#222" : "#f8f9fa" }}
    >
      <LinearGradient
        colors={isDark ? ["#222", "#333"] : ["#f8f9fa", "#e9ecef"]}
        style={styles.gradient}
      >
        <View style={styles.headerContainer}>
          <View style={isDark ? styles.storeBannerDark : styles.storeBanner}>
            <Image source={{ uri: store?.image }} style={styles.storeImage} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.storeImageOverlay}
            />
            <Text style={styles.storeName}>{store?.title}</Text>
          </View>

          <View
            style={isDark ? styles.headerSectionDark : styles.headerSection}
          >
            <View style={styles.sectionTitleContainer}>
              <Ionicons
                name="restaurant-outline"
                size={24}
                color="#4a90e2"
                style={styles.sectionIcon}
              />
              <Text style={styles.sectionTitle}>Cardápio Completo</Text>
            </View>
            <Text
              style={
                isDark ? styles.headerDescriptionDark : styles.headerDescription
              }
            >
              Explore nossos produtos e descubra opções deliciosas para sua
              refeição
            </Text>
          </View>
        </View>

        <FlatList
          data={data?.foodsAndDrinks}
          renderItem={({ item }) => (
            <View style={isDark ? styles.cardDark : styles.card}>
              <View style={styles.cardImageContainer}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
              </View>

              <View style={styles.cardContentContainer}>
                <View style={styles.cardHeader}>
                  <Text
                    style={isDark ? styles.cardTitleDark : styles.cardTitle}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                  <View style={styles.priceTag}>
                    <Text style={styles.priceText}>R$ {item.price}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.viewButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    router.push({
                      pathname: "/items/[id]",
                      params: { id: item.id },
                    });
                  }}
                >
                  <LinearGradient
                    colors={
                      isDark ? ["#4a90e2", "#357ad6"] : ["#2a9d8f", "#208b7e"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.viewButtonGradient}
                  >
                    <Ionicons
                      name="eye-outline"
                      size={16}
                      color="#fff"
                      style={styles.viewButtonIcon}
                    />
                    <Text style={styles.viewButtonText}>Ver Detalhes</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  headerContainer: {
    paddingBottom: 16,
  },
  storeBanner: {
    height: 180,
    position: "relative",
    overflow: "hidden",
    marginBottom: 16,
  },
  storeBannerDark: {
    height: 180,
    position: "relative",
    overflow: "hidden",
    marginBottom: 16,
  },
  storeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  storeImageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  storeName: {
    position: "absolute",
    bottom: 16,
    left: 16,
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  headerSectionDark: {
    backgroundColor: "#333",
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#444",
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a90e2",
  },
  headerDescription: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
  headerDescriptionDark: {
    fontSize: 15,
    color: "#bbb",
    lineHeight: 22,
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  cardDark: {
    backgroundColor: "#333",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#444",
  },
  cardImageContainer: {
    width: "100%",
    height: 180,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardContentContainer: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  cardTitleDark: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f1f1f1",
    flex: 1,
    marginRight: 8,
  },
  priceTag: {
    backgroundColor: "#e63946",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  priceText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  viewButton: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  linkReset: {
    textDecorationLine: "none",
  },
  viewButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  viewButtonIcon: {
    marginRight: 6,
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
