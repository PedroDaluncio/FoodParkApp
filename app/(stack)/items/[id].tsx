import { useLocalSearchParams } from 'expo-router';
import { Button, Image, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import foods from '../../../assets/database/foods.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function Foods() {
  const [isManipulatingData, setIsManipulatingData] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const { id } = useLocalSearchParams();
  const food = foods[id.toString()]
  const theme = useColorScheme()

  const setData = async (data: object) => {
    try {
      await AsyncStorage.setItem(id.toString(), JSON.stringify(data))
    } catch {
      setError(true)
    }
  }

  const getData = async (isRemoveOperation:boolean = false) => {
    setIsManipulatingData(true)
    setMessage("")
    setError(false)
    try {
      const jsonValue = await AsyncStorage.getAllKeys()
      if (jsonValue.length === 0 && isRemoveOperation === false) {
        await setData({
          price: food.price,
          quantity: 1
        })
      } else {
        const dataString = await AsyncStorage.getItem(id.toString())
        const data = dataString ? JSON.parse(dataString) : { price: 0.0, quantity: 0 }

        data.price = !isRemoveOperation ? (
          parseFloat(data.price) + parseFloat(food.price)
        ) : (
          parseFloat(data.price) > 0 ? (
            parseFloat(data.price) - parseFloat(food.price)
          ) : (
            0
          )
        )
        data.quantity = !isRemoveOperation ? (
          parseInt(data.quantity) + 1
        ) : (
          parseInt(data.quantity) > 0 ? (
            parseInt(data.quantity) - 1
          ) : (
            0
          )
        )
        await setData(data)
      }
      if (!isRemoveOperation) {
        setMessage("Alimento adicionado à cesta de compras!");
      } else {
        setMessage("Alimento removido da cesta de compras!");
      }
    } catch {
      setError(true)
      if (!isRemoveOperation) {
        setMessage(
          "Ocorreu um erro ao adicionar o alimento à cesta de compras, tente novamente mais tarde"
        );
      } else {
        setMessage(
          "Ocorreu um erro ao remover o alimento da cesta de compras, tente novamente mais tarde"
        );
      }
    } finally {
      setIsManipulatingData(false)
    }
  }

  return (
    <ScrollView>
      <Image source={{uri: food.image}} style={styles.banner} />
      <View style={theme==="light"?styles.container:styles.containerDark}>
        <Text style={theme==="light"?styles.header:styles.headerDark}>{food.name}</Text>
        <Text style={theme==="light"?styles.description:styles.descriptionDark}> “ {food.description} ”</Text>
        <Text style={styles.priceQuantity}>Preço: R${food.price}</Text>
        <Text style={styles.priceQuantity}>Quantidade: {food.quantity}</Text>

        <View style={theme==="light"?styles.ingredientsContainer: styles.ingredientsContainerDark}>
          <Text style={styles.ingredientsList}>Ingredientes:</Text>
          {food.ingredients.map((ingredients:string, index:number) => {
            return(
              <Text style={theme==="light"?styles.ingredients:styles.ingredientsDark} key={index}>
                • {ingredients}
              </Text>
            )
          })}
        </View>
        <View style={theme==="light"?styles.basket:styles.basketDark}>
          <Text style={theme==="light"?styles.basketTitle:styles.basketTitleDark}>
            Adicione o produto à sua cesta de compras!
          </Text>
          <View style={styles.shoppingBasket}>
            <View style={styles.basketManipulation}>
              <Button
                title="Adicionar alimento"
                color={!isManipulatingData ? "rgba(42, 157, 143, 1)": "rgba(42, 157, 143, 0.5)"}
                disabled={isManipulatingData}
                onPress={() => {getData()}} />
            </View>
            <View style={styles.basketManipulation}>
              <Button
                title="Remover alimento"
                color={!isManipulatingData ? "rgba(230, 57, 70, 1)": "rgba(230, 57, 70, 0.5)"}
                disabled={isManipulatingData}
                onPress={() => {getData(true)}} />
            </View>
          </View>
          {message !== "" && (
            <Text style={error ? styles.errorMessage : styles.successMessage}>
              {message}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  descriptionDark: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#ddd',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  banner: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  containerDark: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  headerDark: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  priceQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
    color: '#e63946',
  },
  ingredients: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'justify',
    fontStyle: 'italic',
    color: '#444',
  },
  ingredientsDark: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'justify',
    fontStyle: 'italic',
    color: '#ddd',
  },
  ingredientsList: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2a9d8f',
  },
  ingredientsContainer: {
    padding: 15,
    marginVertical: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  ingredientsContainerDark: {
    padding: 15,
    marginVertical: 15,
    backgroundColor: '#444',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#555',
  },
  shoppingBasket: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  basketManipulation: {
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  basketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  basketTitleDark: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  basket: {
    padding: 15,
    marginVertical: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  basketDark: {
    padding: 15,
    marginVertical: 15,
    backgroundColor: '#444',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#555',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  }
});