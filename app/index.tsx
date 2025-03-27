import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import database from '../assets/database/stores.json'
import { SafeAreaView } from 'react-native-safe-area-context'

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
      </ScrollView>
    </SafeAreaView>
  )
}
