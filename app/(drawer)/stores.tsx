import { ScrollView, Text, View, Image, FlatList } from 'react-native';
import database from '../../assets/database/stores.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function Stores() {

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Lojas participantes: </Text>
        <FlatList
          data={database}
          renderItem={({ item }) => {

            return (
              <View>
                <Text>{item.title}</Text>
                <Image source={require("../../assets/images/loja1.png")} style={{ width: 100, height: 100 }} />
                <Link href={{
                  pathname: "/store/[id]",
                  params: { id: item.id }
                }}> VISITENOS
                </Link>
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
