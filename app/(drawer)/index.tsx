import { Button, Image, ScrollView, Text, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import database from '../../assets/database/stores.json'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

export default function Stores() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Lojas participantes: </Text>
          <FlashList
            data={database}
            renderItem={({item}) =>
              <View>
                <Text>{item.title}</Text>
                <Image></Image>
              </View>
            }
            estimatedItemSize={6}
            >
          </FlashList>
          <Button title="Ir para Teste" onPress={() => router.push("/teste")} />
        </ScrollView>
    </SafeAreaView>
  )
}
