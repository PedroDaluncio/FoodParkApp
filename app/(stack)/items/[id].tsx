import { useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Alert,
} from "react-native";
import foods from "../../../assets/database/foods.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Foods() {
  const [isManipulatingData, setIsManipulatingData] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const { id } = useLocalSearchParams();
  const food = foods[id.toString() as keyof typeof foods];
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const setData = async (data: object) => {
    try {
      await AsyncStorage.setItem(id.toString(), JSON.stringify(data));
    } catch {
      setError(true);
    }
  };

  const getData = async (isRemoveOperation: boolean = false) => {
    setIsManipulatingData(true);
    setMessage("");
    setError(false);
    try {
      const jsonValue = await AsyncStorage.getAllKeys();
      if (jsonValue.length === 0 && isRemoveOperation === false) {
        await setData({
          price: food.price,
          quantity: 1,
        });
      } else {
        const dataString = await AsyncStorage.getItem(id.toString());
        const data = dataString
          ? JSON.parse(dataString)
          : { price: 0.0, quantity: 0 };
        data.price = !isRemoveOperation
          ? parseFloat(data.price) + parseFloat(food.price)
          : parseFloat(data.price) > 0
          ? parseFloat(data.price) - parseFloat(food.price)
          : 0;
        data.quantity = !isRemoveOperation
          ? parseInt(data.quantity) + 1
          : parseInt(data.quantity) > 0
          ? parseInt(data.quantity) - 1
          : 0;
        await setData(data);
      }
      if (!isRemoveOperation) {
        setMessage("Alimento adicionado à cesta de compras!");
        Alert.alert("Sucesso", "Item adicionado à cesta de compras!");
      } else {
        setMessage("Alimento removido da cesta de compras!");
        Alert.alert("Sucesso", "Item removido da cesta de compras!");
      }
    } catch {
      setError(true);
      if (!isRemoveOperation) {
        setMessage(
          "Ocorreu um erro ao adicionar o alimento à cesta de compras, tente novamente mais tarde"
        );
        Alert.alert(
          "Erro",
          "Não foi possível adicionar o item à cesta de compras."
        );
      } else {
        setMessage(
          "Ocorreu um erro ao remover o alimento da cesta de compras, tente novamente mais tarde"
        );
        Alert.alert(
          "Erro",
          "Não foi possível remover o item da cesta de compras."
        );
      }
    } finally {
      setIsManipulatingData(false);
    }
  };

  return (
    <ScrollView style={isDark ? styles.scrollDark : styles.scroll}>
      <LinearGradient
        colors={isDark ? ["#222", "#333"] : ["#f8f9fa", "#e9ecef"]}
        style={styles.gradient}
      >
        <View style={styles.bannerContainer}>
          <Image source={{ uri: food.image }} style={styles.banner} />
          <View style={styles.bannerOverlay}>
            <Text style={styles.header}>{food.name}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={isDark ? styles.sectionDark : styles.section}>
            <Text style={isDark ? styles.descriptionDark : styles.description}>
              "{food.description}"
            </Text>
            <View style={styles.priceContainer}>
              <Ionicons
                name="pricetag"
                size={22}
                color={isDark ? "#4a90e2" : "#2a9d8f"}
                style={styles.priceIcon}
              />
              <Text style={styles.priceQuantity}>R$ {food.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <Ionicons
                name="cube"
                size={22}
                color={isDark ? "#4a90e2" : "#2a9d8f"}
                style={styles.quantityIcon}
              />
              <Text style={styles.priceQuantity}>{food.quantity}</Text>
            </View>
          </View>

          <View style={isDark ? styles.sectionDark : styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons
                name="restaurant-outline"
                size={24}
                color="#4a90e2"
                style={styles.sectionIcon}
              />
              <Text style={styles.sectionTitle}>Ingredientes</Text>
            </View>
            <View style={styles.ingredientsListContainer}>
              {food.ingredients.map((ingredient: string, index: number) => (
                <View key={index} style={styles.ingredientItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={isDark ? "#4a90e2" : "#2a9d8f"}
                  />
                  <Text
                    style={isDark ? styles.ingredientsDark : styles.ingredients}
                  >
                    {ingredient}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={isDark ? styles.sectionDark : styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons
                name="cart-outline"
                size={24}
                color="#4a90e2"
                style={styles.sectionIcon}
              />
              <Text style={styles.sectionTitle}>Cesta de Compras</Text>
            </View>

            <Text
              style={isDark ? styles.basketSubtitleDark : styles.basketSubtitle}
            >
              Adicione ou remova este produto da sua cesta
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                disabled={isManipulatingData}
                onPress={() => getData()}
              >
                <LinearGradient
                  colors={["#4CAF50", "#2E7D32"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.buttonGradient,
                    isManipulatingData && styles.disabledButton,
                  ]}
                >
                  <Ionicons
                    name="add-circle"
                    size={20}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Adicionar</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeButton}
                disabled={isManipulatingData}
                onPress={() => getData(true)}
              >
                <LinearGradient
                  colors={["#f44336", "#c62828"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.buttonGradient,
                    isManipulatingData && styles.disabledButton,
                  ]}
                >
                  <Ionicons
                    name="remove-circle"
                    size={20}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Remover</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {message !== "" && (
              <View
                style={
                  error
                    ? styles.errorMessageContainer
                    : styles.successMessageContainer
                }
              >
                <Ionicons
                  name={error ? "alert-circle" : "checkmark-circle"}
                  size={20}
                  color={error ? "#fff" : "#fff"}
                />
                <Text
                  style={error ? styles.errorMessage : styles.successMessage}
                >
                  {message}
                </Text>
              </View>
            )}
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
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  banner: {
    width: "100%",
    height: 250,
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
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4a90e2",
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  descriptionDark: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: "italic",
    color: "#f1f1f1",
    textAlign: "center",
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  priceIcon: {
    marginRight: 8,
  },
  quantityIcon: {
    marginRight: 8,
  },
  priceQuantity: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e63946",
  },
  ingredientsListContainer: {
    marginTop: 8,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: 8,
  },
  ingredients: {
    fontSize: 16,
    marginLeft: 8,
    color: "#444",
  },
  ingredientsDark: {
    fontSize: 16,
    marginLeft: 8,
    color: "#ddd",
  },
  basketSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  basketSubtitleDark: {
    fontSize: 16,
    color: "#bbb",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  removeButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  disabledButton: {
    opacity: 0.5,
  },
  successMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    padding: 12,
    borderRadius: 8,
  },
  errorMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 8,
  },
  successMessage: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  errorMessage: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
});

