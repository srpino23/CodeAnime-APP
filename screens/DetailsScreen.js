import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default function DetailsScreen({ navigation, route }) {
  const { animes } = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(1);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: animes.imagePath }}
          style={styles.image}
        >
          <View style={styles.imageContainer}>
            <LinearGradient
              colors={['rgba(0,0,0,0.5)', '#0D0D0D']}
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Ionicons name="chevron-back" size={35} color="white" />
              </TouchableOpacity>
              <View style={styles.info}>
                <View style={styles.data}>
                  <Text style={styles.title}>{animes.title}</Text>
                  <Text style={styles.date}>{animes.date}</Text>
                </View>
                <View style={styles.status}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color:
                        animes.state === 'Finalizado' ? '#ff4d4d' : '#00b871',
                      borderWidth: 2,
                      padding: 5,
                      paddingLeft: 10,
                      borderColor: '#9D9D9D',
                      borderRadius: 10,
                    }}
                  >
                    {animes.state}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </ImageBackground>
        <View style={styles.moreInfo}>
          <Text style={styles.genders}>{animes.genders}</Text>
          <Text style={styles.description}>{animes.description}</Text>
        </View>
        <View style={styles.episodesContainer}>
          <View style={styles.seasonsButtonContainer}>
            <TouchableOpacity
              onPress={toggleModal}
              style={styles.seasonsButton}
            >
              <Text style={styles.seasonsButtonText}>
                TEMPORADA {selectedSeason}
              </Text>
              <FontAwesome5
                name={isModalVisible === true ? 'angle-down' : 'angle-up'}
                size={25}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.episodesList}>
            {animes.episodes
              .filter((episode) => episode.season === selectedSeason)
              .map((episode) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('View', { episode })}
                  key={episode.episodeNumber}
                  style={styles.episode}
                >
                  <Text style={styles.episodeItem}>
                    Capitulo {episode.episodeNumber}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
      <Animatable.View
        animation={isModalVisible ? 'slideInUp' : 'slideOutDown'}
        duration={500}
        style={styles.modalContainer}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContent}>
            {animes.episodes && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {Array.from(
                  new Set(animes.episodes.map((episode) => episode.season))
                ).map((season) => (
                  <TouchableOpacity
                    key={season}
                    onPress={() => {
                      setSelectedSeason(season);
                      toggleModal();
                    }}
                    style={styles.seasonItem}
                  >
                    <Text style={styles.seasonItemText}>
                      TEMPORADA {season}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Animatable.View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: Width,
    height: Height / 1.5,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    padding: 10,
  },
  moreInfo: {
    padding: 10,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  date: {
    fontSize: 18,
    color: 'white',
  },
  genders: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 18,
    color: 'white',
  },
  seasonsButtonText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  seasonsButton: {
    backgroundColor: '#2D2D2D',
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: 5,
    paddingTop: 10,
    backgroundColor: '#1D1D1D',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  seasonItem: {
    paddingBottom: 5,
  },
  seasonItemText: {
    fontSize: 20,
    color: 'white',
  },
  episodeItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#3D3D3D',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
  },
  episodesList: {
    marginBottom: 5,
  },
});
