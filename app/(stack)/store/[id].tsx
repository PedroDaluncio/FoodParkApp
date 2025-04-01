import { Link, useLocalSearchParams } from 'expo-router';
import { Button, Image, Linking, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import stores from '../../../assets/database/storesDetails.json'

export default function Store() {
  const theme = useColorScheme()
  const { id } = useLocalSearchParams();
  const openLink = (url: string) => {
    Linking.openURL(url)
  }

  const store = stores[id.toString()]

  return (
    <ScrollView>
      <View style={theme==="light"?styles.container:styles.containerDark}>
        <Image source={{uri: store.banner}} style={styles.banner} />
        <Text style={theme==="light"?styles.header:styles.headerDark}>{store.name}</Text>
        <Text style={theme==="light"?styles.description:styles.descriptionDark}> “ {store.description} ”</Text>

        <Link href={{pathname: '../menu/[id]', params: {id: id}}} style={styles.menu}>Acesse nosso cardápio!</Link>

        <View style={styles.images}>
          {store.photos.map((photo:string, index:number) => (
            <Image
              key={index}
              source={{uri: photo}}
              style={styles.image}
            />
          ))}
        </View>

        <Text style={theme==="light"?styles.contactInfo:styles.contactInfoDark}>Nossas Informações de contato:</Text>
        <View>
          <Text style={theme==="light"?styles.cellphoneNumber:styles.cellphoneNumberDark}>Telefone: {store.cellphoneNumber}</Text>
          <Text style={theme==="light"?styles.email:styles.emailDark}>Email: {store.email}</Text>
        </View>

        <View>
          <Text style={theme==="light"?styles.socialNetwork:styles.socialNetworkDark}>Nossas redes sociais:</Text>
          <View style={styles.socialNetworkContainer}>
            <Button title="Facebook" onPress={() => openLink(store.socialMedia.facebook)} />
            <Button title="Instagram" onPress={() => openLink(store.socialMedia.instagram)} />
          </View>
        </View>

        <View style={styles.appButton}>
          <Button title="Converse conosco no Whatsapp" onPress={() => openLink(store.whatsapp)} />
          <Button title="Abrir App de Entrega" onPress={() => openLink(store.deliveryApp)} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  containerDark: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 15,
    color: '#fff',
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  headerDark: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    fontStyle: 'italic',
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#555',
  },
  descriptionDark: {
    fontSize: 16,
    textAlign: 'justify',
    fontStyle: 'italic',
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#ccc',
  },
  menu: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  images: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
    marginBottom: 30,
  },
  image: {
    width: '95%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  contactInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  contactInfoDark:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#fff',
  },
  cellphoneNumber: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
  },
  cellphoneNumberDark: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#ccc',
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 20,
  },
  emailDark: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#ccc',
    marginBottom: 20,
  },
  socialNetwork: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  socialNetworkDark: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
  },
  socialNetworkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 40,
  },
  appButton: {
    width: '90%',
    gap: 15,
    marginBottom: 40,
  },
});

