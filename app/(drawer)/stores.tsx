import { Text, View, Image, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import database from '../../assets/database/stores.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function Stores() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Lojas participantes: </Text>
      <FlatList
        data={database}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Image source={require("../../assets/images/loja1.png")} style={styles.image} />
              <View style={styles.textContainer}>
                <Text>{item.title}</Text>
               <TouchableOpacity style={styles.link}>
                  <Link href={{
                  pathname: "/store/[id]",
                  params: { id: item.id }
                }} > Visite a Nossa Loja!</Link>
                </TouchableOpacity>
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
  },
  header: {
    fontFamily: 'Amethysta_400Regular',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    gap: 20,
  },
  image: {
    width: '50%',
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    width: '50%',
    height: 150,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    alignSelf: 'flex-end',
    width: '100%',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
});
