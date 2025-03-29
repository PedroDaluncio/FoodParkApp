import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Store() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Hello user { id }</Text>
    </View>
  );
}
