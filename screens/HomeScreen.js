import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { NewAnimes, PopularAnimes, RecomendedAnimes } from '../api/CodeAnime';
import Loading from '../components/Loading';
import HorizontalAnimeList from '../components/HorizontalAnimeList';

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [newAnimes, setNewAnimes] = useState([]);
  const [popularAnimes, setPopularAnimes] = useState([]);
  const [recomendedAnimes, setRecomendedAnimes] = useState([]);

  useEffect(() => {
    NewAnimes()
      .then((data) => setNewAnimes(data.data))
      .catch((error) => console.error(error));
    PopularAnimes()
      .then((data) => setPopularAnimes(data.data))
      .catch((error) => console.error(error));
    RecomendedAnimes()
      .then((data) => setRecomendedAnimes(data.data))
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Nuevos</Text>
        <HorizontalAnimeList navigation={navigation} animes={newAnimes} />
        <Text style={styles.text}>Populares</Text>
        <HorizontalAnimeList navigation={navigation} animes={popularAnimes} />
        <Text style={styles.text}>Recomendados</Text>
        <HorizontalAnimeList
          navigation={navigation}
          animes={recomendedAnimes}
        />
      </View>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
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
