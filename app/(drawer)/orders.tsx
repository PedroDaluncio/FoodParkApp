import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList, useColorScheme, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import foods from '../../assets/database/foods.json'


const OrdersScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [data, setData] = useState([])

  const getData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    return result
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const dataJson = await getData();
        setData(dataJson);
      };
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView>
      <Text style={isDark ? styles.titleDark : styles.title}>Ordens</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => {
          const dataString = item[1]
          const itemParsed = JSON.parse(dataString)
          if (itemParsed.quantity === 0){
            return (<></>)
          }
          const imageUrl = foods[item[0]].image
          const foodName = foods[item[0]].name
          return (
            <View style={isDark ? styles.orderItemDark : styles.orderItem}>
              <Image source={{uri: imageUrl}} style={styles.image} />
              <View>
                <Text>{foodName}</Text>
                <Text style={isDark ? styles.itemTextDark : styles.itemText}>
                  {itemParsed.price}
                </Text>
                <Text style={isDark ? styles.statusTextDark : styles.statusText}>
                  {itemParsed.quantity}
                </Text>
              </View>
            </View>
          )
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: '50%',
    height: 150,
    borderRadius: 12,
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
