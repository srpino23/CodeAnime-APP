import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { SearchAnimes } from '../api/CodeAnime';
import Loading from '../components/Loading';
import SearchAnimeList from '../components/VerticalAnimeList';

export default function SearchScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchAnimes, setSearchAnimes] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [searchValue, setSearchValue] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const searchButton = async () => {
    if (searchValue === '') {
    } else {
      const res = await SearchAnimes(searchValue);
      setSearchAnimes(res.data);
      searchList.push(searchValue);
      saveSearchHistory();
      setIsSearch(false);
    }
  };

  const loadSearchHistory = async () => {
    try {
      const searchList = await AsyncStorage.getItem('SearchList');

      if (searchList !== null) {
        setSearchList(searchList != null ? JSON.parse(searchList) : null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveSearchHistory = async () => {
    const jsonValue = JSON.stringify(searchList);
    try {
      await AsyncStorage.setItem('SearchList', jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSearchValue('');
    loadSearchHistory();
    SearchAnimes()
      .then((data) => setSearchAnimes(data.data))
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isSearch) {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="¿Que estas buscando?"
            placeholderTextColor="#3B3B3B"
            returnKeyType="search"
            onSubmitEditing={() => searchButton()}
            onChangeText={(text) => {
              setSearchValue(text);
              if (text === '') {
                setIsSearch(true);
              }
            }}
          />
          <TouchableOpacity
            onPress={() => searchButton()}
            style={styles.searchButtonContainer}
          >
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Busquedas recientes</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            (searchListArr = searchList
              .slice(-10)
              .reverse()
              .map((searchInfo, index) => (
                <TouchableOpacity
                  key={`${searchInfo.container}+${index}`}
                  style={styles.oldSearchButtonContainer}
                >
                  <Ionicons
                    key={searchInfo.icon}
                    name="search"
                    size={20}
                    color="white"
                  />
                  <Text key={searchInfo.text} style={styles.oldSearchText}>
                    {searchInfo}
                  </Text>
                </TouchableOpacity>
              )))
          }
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="¿Que estas buscando?"
          placeholderTextColor="#3B3B3B"
          returnKeyType="search"
          onSubmitEditing={() => searchButton()}
          onChangeText={(text) => {
            setSearchValue(text);
            if (text === '') {
              setIsSearch(true);
            }
          }}
        />
        <TouchableOpacity
          onPress={() => searchButton()}
          style={styles.searchButtonContainer}
        >
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Resultados de busqueda</Text>
      <SearchAnimeList navigation={navigation} animes={searchAnimes} />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    color: '#fff',
    padding: 8,
    width: '90%',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1D1D1D',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchButtonContainer: {
    padding: 10,
    alignItems: 'center',
    width: '10%',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldSearchButtonContainer: {
    flexDirection: 'row',
    padding: 8,
    marginBottom: 5,
    marginHorizontal: 10,
    backgroundColor: '#1D1D1D',
    alignItems: 'center',
    borderRadius: 10,
  },
  oldSearchText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: 'white',
  },
});
