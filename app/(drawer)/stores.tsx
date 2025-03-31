import { Text, View, Image, FlatList, StyleSheet } from 'react-native';
import database from '../../assets/database/stores.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function Stores() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Lojas de alimentação: </Text>
      <FlatList
        data={database}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.storeName}>{item.title}</Text>
                <Link href={{
                pathname: "/store/[id]",
                params: { id: item.id }
              }} style={styles.link}> Visite a Nossa Loja!</Link>
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
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#e63946',
  }
});
