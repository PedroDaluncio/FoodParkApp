import React from "react";
import { View, Text, StyleSheet, FlatList, useColorScheme } from "react-native";

const orders = [
  { id: "1", item: "Burger", status: "Delivered" },
  { id: "2", item: "Pizza", status: "In Progress" },
  { id: "3", item: "Sushi", status: "Cancelled" },
];

const OrdersScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const renderOrder = ({
    item,
  }: {
    item: { id: string; item: string; status: string };
  }) => (
    <View style={isDark ? styles.orderItemDark : styles.orderItem}>
      <Text style={isDark ? styles.itemTextDark : styles.itemText}>
        {item.item}
      </Text>
      <Text style={isDark ? styles.statusTextDark : styles.statusText}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={isDark ? styles.containerDark : styles.container}>
      <Text style={isDark ? styles.titleDark : styles.title}>Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  containerDark: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
  titleDark: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  orderItemDark: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#1e1e1e",
  },
  itemText: {
    fontSize: 18,
    color: "#000",
  },
  itemTextDark: {
    fontSize: 18,
    color: "#fff",
  },
  statusText: {
    fontSize: 16,
    color: "#555",
  },
  statusTextDark: {
    fontSize: 16,
    color: "#aaa",
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
