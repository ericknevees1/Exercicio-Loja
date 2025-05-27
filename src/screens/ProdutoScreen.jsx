import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import axios from 'axios';

export default function ProdutoScreen({ route }) {
  const { id } = route.params;
  const [produto, setProduto] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    console.log("ID recebido:", id);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((resposta) => {
        setProduto(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao buscar produto:", erro);
        setErro('Erro ao buscar os detalhes do produto!');
      });
  }, [id]);

  return (
    <View style={styles.container}>
      {erro ? (
        <Text style={styles.errorText}>{erro}</Text>
      ) : produto ? (
        <Card style={styles.card}>
          <Card.Cover source={{ uri: produto.thumbnail }} />
          <Card.Title title={produto.title} />
          <Card.Content>
            <Text variant="bodyMedium">{produto.description}</Text>
            <Text variant="titleLarge">Preço: ${produto.price}</Text>
            <Text variant="bodyMedium">Marca: {produto.brand}</Text>
            <Text variant="bodyMedium">Categoria: {produto.category}</Text>
          </Card.Content>
        </Card>
      ) : (
        <Text style={styles.loadingText}>Carregando detalhes do produto...</Text>
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
});
