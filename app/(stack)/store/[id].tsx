import { Link, useLocalSearchParams } from 'expo-router';
import { Button, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import stores from '../../../assets/database/storesDetails.json'

export default function Store() {
  const { id } = useLocalSearchParams();
  const openLink = (url: string) => {
    Linking.openURL(url)
  }

  const store = stores[id]

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require("../../../assets/images/adaptive-icon.png")} style={styles.banner} />
        <Text style={styles.header}>{store.nome}</Text>
        <Text style={styles.description}> “ {store.descricao} ”</Text>

        <TouchableOpacity style={styles.menu}>
          <Link href={{pathname: './cardapio/[id]', params: {id: id}}}>Acesse nosso cardápio!</Link>
        </TouchableOpacity>

        <View style={styles.images}>
          {store.fotos.map((photo:string, index:number) => (
            <Image
              key={index}
              source={require("../../../assets/images/adaptive-icon.png")}
              style={styles.image}
            />
          ))}
        </View>

        <Text style={styles.contactInfo}>Nossas Informações de contato:</Text>
        <View>
          <Text style={styles.cellphoneNumber}>Telefone: {store.telefone}</Text>
          <Text style={styles.email}>Email: {store.email}</Text>
        </View>

        <View>
          <Text style={styles.socialNetwork}>Nossas redes sociais:</Text>
          <View style={styles.socialNetworkContainer}>
            <Button title="Facebook" onPress={() => openLink(store.socialMedia.facebook)} />
            <Button title="Instagram" onPress={() => openLink(store.socialMedia.instagram)} />
          </View>
        </View>

        <View style={styles.appButton}>
          <Button title="Converse conosco no Whatsapp" onPress={() => openLink(store.whatsapp)} />
          <Button title="Abrir App de Entrega" onPress={() => openLink(store.appEntrega)} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'justify',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    fontFamily: 'Amethysta_400Regular',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  images: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 10,
    gap: 15
  },
  image: {
    width: '98%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    boxShadow: '0 4px 8px 5px rgba(0, 0, 0, 0.2)'
  },
  contactInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  cellphoneNumber: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  socialNetwork: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  socialNetworkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    gap: 15,
    marginBottom: 40
  },
  appButton: {
    width: '80%',
    paddingHorizontal: 10,
    gap: 15,
    marginBottom: 40
  },
  menu: {
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 40,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10
  }
})
