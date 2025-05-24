import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Avatar, Text } from 'react-native-paper';
import axios from 'axios';

export default function ListaProdutosScreen({ route }) {
  const { category } = route.params; // Obtém a categoria passada pela navegação
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Faz uma requisição para buscar os produtos da categoria
    axios
      .get(`https://dummyjson.com/products/category/${category}`)
      .then((resposta) => {
        setProdutos(resposta.data.products); // Define os produtos retornados pela API
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
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}
            onPress={() => navigation.navigate('ProdutoScreen', {category: item})}>
              <Card.Title
                title={item.title}
                left={(props) => (
                  <Avatar.Image {...props} source={{ uri: item.thumbnail }} />
                )}
              />
            </Card>
          )}
          ListEmptyComponent={() => (
            <View style={styles.loadingContainer}>
              <Text variant="titleLarge">Carregando produtos...</Text>
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