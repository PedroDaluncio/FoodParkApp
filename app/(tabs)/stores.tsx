import { Text } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import database from '../../assets/database/stores.json'

export default function Stores() {
  return (
    <FlashList
      data={database}
      renderItem={({item}) => <Text>{item.title}</Text>}
      estimatedItemSize={6}
      >
    </FlashList>
  )
}
