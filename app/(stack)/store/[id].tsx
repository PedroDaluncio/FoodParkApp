import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import stores from "../../../assets/database/storesDetails.json";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function Store() {
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const store = stores[id.toString() as keyof typeof stores];

  return (
    <ScrollView style={isDark ? styles.scrollDark : styles.scroll}>
      <LinearGradient
        colors={isDark ? ["#222", "#333"] : ["#f8f9fa", "#e9ecef"]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.bannerContainer}>
            <Image source={{ uri: store.banner }} style={styles.banner} />
            <View style={styles.bannerOverlay}>
              <Text style={styles.header}>{store.name}</Text>
            </View>
          </View>

          <View style={isDark ? styles.sectionDark : styles.section}>
            <Text style={isDark ? styles.descriptionDark : styles.description}>
              "{store.description}"
            </Text>
          </View>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              router.push({
                pathname: "/menu/[id]",
                params: { id: Array.isArray(id) ? id[0] : id },
              });
            }}
          >
            <LinearGradient
              colors={["#ff7e5f", "#feb47b"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.menuGradient}
            >
              <Ionicons
                name="restaurant"
                size={20}
                color="#fff"
                style={styles.buttonIcon}
              />
              <Text style={styles.menuText}>Ver Cardápio</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={isDark ? styles.sectionDark : styles.section}>
            <Text style={styles.sectionTitle}>Conheça Nosso Ambiente</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.photoScroll}
            >
              {store.photos.map((photo: string, index: number) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: photo }} style={styles.image} />
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={isDark ? styles.sectionDark : styles.section}>
            <Text style={styles.sectionTitle}>Informações de Contato</Text>
            <View style={styles.contactRow}>
              <Ionicons
                name="call"
                size={20}
                color={isDark ? "#f1f1f1" : "#333"}
              />
              <Text
                style={isDark ? styles.contactTextDark : styles.contactText}
              >
                {store.cellphoneNumber}
              </Text>
            </View>
            <View style={styles.contactRow}>
              <Ionicons
                name="mail"
                size={20}
                color={isDark ? "#f1f1f1" : "#333"}
              />
              <Text
                style={isDark ? styles.contactTextDark : styles.contactText}
              >
                {store.email}
              </Text>
            </View>
          </View>

          <View style={isDark ? styles.sectionDark : styles.section}>
            <Text style={styles.sectionTitle}>Redes Sociais</Text>
            <View style={styles.socialNetworkContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => openLink(store.socialMedia.facebook)}
              >
                <LinearGradient
                  colors={["#3b5998", "#4c70ba"]}
                  style={styles.socialGradient}
                >
                  <FontAwesome name="facebook" size={20} color="#fff" />
                  <Text style={styles.socialText}>Facebook</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => openLink(store.socialMedia.instagram)}
              >
                <LinearGradient
                  colors={["#833ab4", "#fd1d1d", "#fcb045"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.socialGradient}
                >
                  <FontAwesome name="instagram" size={20} color="#fff" />
                  <Text style={styles.socialText}>Instagram</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={() => openLink(store.whatsapp)}
            >
              <FontAwesome
                name="whatsapp"
                size={20}
                color="#fff"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Conversar no WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deliveryButton}
              onPress={() => openLink(store.deliveryApp)}
            >
              <Ionicons
                name="bicycle"
                size={20}
                color="#fff"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Pedir Entrega</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollDark: {
    flex: 1,
    backgroundColor: "#222",
  },
  gradient: {
    minHeight: "100%",
  },
  container: {
    padding: 16,
  },
  bannerContainer: {
    position: "relative",
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  banner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  sectionDark: {
    backgroundColor: "#333",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#444",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4a90e2",
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
  },
  descriptionDark: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: "italic",
    color: "#f1f1f1",
    textAlign: "center",
  },
  menuButton: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  menuGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  photoScroll: {
    paddingBottom: 8,
  },
  imageWrapper: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  image: {
    width: 240,
    height: 160,
    borderRadius: 12,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#555",
  },
  contactTextDark: {
    fontSize: 16,
    marginLeft: 12,
    color: "#f1f1f1",
  },
  socialNetworkContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  socialGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  socialText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 8,
  },
  actionContainer: {
    marginVertical: 8,
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25D366",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  deliveryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E91E63",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  buttonIcon: {
    marginRight: 8,
  },
});
