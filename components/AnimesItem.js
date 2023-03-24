import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const responsiveHeight = Width <= 480 ? 2.2 : 3;
const responsiveWidth = Width <= 480 ? 3.2 : 4.3;

export default AnimeItem = function ({ animes, navigationRoute }) {
  return (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => navigationRoute.navigate('Details', { animes })}
    >
      <Image source={{ uri: animes.imagePath }} style={styles.image} />
    </TouchableOpacity>
  );
};

// Estilos
const styles = StyleSheet.create({
  image: {
    height: Width / responsiveHeight,
    width: Width / responsiveWidth,
    borderRadius: 10,
  },
});
