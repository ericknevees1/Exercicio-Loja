import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Avatar, Card, IconButton, Text, ActivityIndicator, MD2Colors } from 'react-native-paper'

export default function HomeScreen({ navigation, route }) {

  const [ListaProdutos, setListaprodutos] = useState([])

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category-list?delay=1000')
      .then(resposta => {
        console.log(resposta.data)
        setListaprodutos(resposta.data)
      })
      .catch(erro => {
        console.log(erro)
      })

  }, [])

  return (
    <View style={styles.container}>

      <FlatList
        style={{ marginBottom: 45 }}
        data={ListaProdutos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card
            style={{ margin: 8 }}
            onPress={() => navigation.navigate('ListaProdutosScreen', {category: item})}
          >
            <Card.Title
              title={item}
              right={() => <IconButton icon='chevron-right' size={30} />}
                         
            />
          </Card>
        )}
        ListEmptyComponent={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} size={100} />
            <Text variant='titleLarge'>Carregando...</Text>
          </View>
        )}

      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  loadingContainer: {
    height: 750,
    alignItems: 'center',
    justifyContent: 'center'
  }
})