import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useColorScheme,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// Define types
interface FoodItem {
  name: string;
  image: string;
}

interface OrderItem {
  quantity: number;
  price: string;
}

// Define KeyValuePair as a tuple of strings
type KeyValuePair = [string, string];

const foods: Record<
  string,
  FoodItem
> = require("../../assets/database/foods.json");

const OrdersScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [data, setData] = useState<KeyValuePair[]>([]);

  const getData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    return result;
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const dataJson = await getData();
        setData(
          dataJson.filter((item): item is [string, string] => item[0] !== null)
        );
      };
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView style={isDark ? styles.containerDark : styles.container}>
      <Text style={isDark ? styles.titleDark : styles.title}>Carrinho</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item[0]}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const dataString = item[1];
          const itemParsed = JSON.parse(dataString) as OrderItem;

          if (itemParsed.quantity === 0) {
            return null;
          }

          // Check if the food exists in our database
          const foodId = item[0];
          const food = foods[foodId];

          if (!food) {
            return null;
          }

          const imageUrl = food.image;
          const foodName = food.name;

          return (
            <View style={isDark ? styles.orderItemDark : styles.orderItem}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <View style={styles.detailsContainer}>
                <Text style={isDark ? styles.foodNameDark : styles.foodName}>
                  {foodName}
                </Text>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Preço: </Text>
                  <Text style={isDark ? styles.itemTextDark : styles.itemText}>
                    R${parseFloat(itemParsed.price).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Quatidade: </Text>
                  <Text
                    style={isDark ? styles.statusTextDark : styles.statusText}
                  >
                    {itemParsed.quantity}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  containerDark: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  listContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
  },
  titleDark: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  orderItem: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderItemDark: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "35%",
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  foodNameDark: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2e7d32",
  },
  itemTextDark: {
    fontSize: 16,
    fontWeight: "500",
    color: "#81c784",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1976d2",
  },
  statusTextDark: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64b5f6",
  },
  themeButton: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "flex-end",
  },
  themeButtonDark: {
    backgroundColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "flex-end",
  },
  themeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default OrdersScreen;
