import { Text, View, Image, FlatList, StyleSheet } from 'react-native';
import database from '../../../assets/database/menu.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams } from 'expo-router';

export default function Menu() {
  const { id } = useLocalSearchParams();
  const data = database.find((item) => item.storeId.toString() === id.toString());

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Nosso Cardápio: </Text>
      <FlatList
        data={data?.foodsAndDrinks}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Image source={require("../../../assets/images/loja1.png")} style={styles.image} />
              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text>Preço unidade: R${item.price}</Text>
                </View>
                <Link href={{
                pathname: "/items/[id]",
                params: { id: item.id }
              }} style={styles.link}> Ver Alimento</Link>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
    gap: 20,
  },
  image: {
    width: '50%',
    height: 150,
    borderRadius: 12,
  },
  textContainer: {
    width: '50%',
    height: 150,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2a9d8f',
  },
  link: {
    alignSelf: 'flex-end',
    width: '100%',
    backgroundColor: '#2a9d8f',
    padding: 8,
    textAlign: 'center',
    color: '#fff',
    borderRadius: 5,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#e63946',
  }
});
