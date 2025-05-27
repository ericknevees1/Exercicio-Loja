import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Avatar, Text } from 'react-native-paper';
import axios from 'axios';

export default function ListaProdutosScreen({ route, navigation }) {
  const { category } = route.params; 
  const [Lprodutos, setLProdutos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${category}`)
      .then((resposta) => {
        setLProdutos(resposta.data.products); 
      })
      .catch((erro) => {
        console.error(erro);
        setErro('Erro ao buscar os produtos da categoria!');
      });
  }, [category]);

  return (
    <View style={styles.container}>
      {erro ? (
        <Text style={styles.errorText}>{erro}</Text>
      ) : (
        <FlatList
          data={Lprodutos}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              onPress={() => navigation.navigate('ProdutoScreen', { id: item.id })} 
            >
              <Card.Title
                title={item.title || 'Produto sem título'}
                left={(props) => (
                  <Avatar.Image {...props} source={{ uri: item.thumbnail }} />
                )}
              />
            </Card>
          )}
          ListEmptyComponent={() => (
            <View style={styles.loadingContainer}>
              <Text variant="titleLarge">Carregando Lista de produtos...</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
