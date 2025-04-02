import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  useColorScheme,
} from "react-native";
import database from "../../assets/database/stores.json";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Stores() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  return (
    <SafeAreaView style={isDark ? styles.containerDark : styles.container}>
      <LinearGradient
        colors={isDark ? ["#222", "#333"] : ["#f8f9fa", "#e9ecef"]}
        style={styles.gradient}
      >
        <Text style={isDark ? styles.headerDark : styles.header}>
          Lojas de Alimentação
        </Text>

        <FlatList
          data={database}
          renderItem={({ item }) => {
            return (
              <View style={isDark ? styles.itemDark : styles.item}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                  <Text
                    style={[styles.storeName, isDark && styles.storeNameDark]}
                  >
                    {item.title}
                  </Text>
                  <Link
                    href={{
                      pathname: "/store/[id]",
                      params: { id: item.id },
                    }}
                    style={styles.link}
                  >
                    Visitar Loja
                  </Link>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#222",
  },
  gradient: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#1a1a1a",
    letterSpacing: 0.5,
  },
  headerDark: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#f8f9fa",
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  itemDark: {
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#444",
  },
  imageContainer: {
    width: "40%",
    marginRight: 16,
  },
  image: {
    width: "100%",
    height: 130,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    letterSpacing: 0.3,
  },
  storeNameDark: {
    color: "#f1f1f1",
  },
  link: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    paddingHorizontal: 16,
    textAlign: "center",
    color: "#fff",
    borderRadius: 8,
    fontWeight: "600",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
