import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { ListAnimes } from '../api/CodeAnime';
import Loading from '../components/Loading';
import VerticalAnimeList from '../components/VerticalAnimeList';

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [listAnimes, setListAnimes] = useState([]);

  useEffect(() => {
    ListAnimes()
      .then((data) => setListAnimes(data.data))
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Directorio completo</Text>
      <VerticalAnimeList navigation={navigation} animes={listAnimes} />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    color: 'white',
  },
});
