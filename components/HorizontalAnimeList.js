import React from 'react';
import { FlatList } from 'react-native';

import AnimesItem from './AnimesItem';

export default HorizontalAnimeList = function ({ animes, navigation }) {
  const renderItem = ({ item }) => (
    <AnimesItem navigationRoute={navigation} animes={item} />
  );

  return (
    <FlatList
      data={animes}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(animes) => animes._id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 5, paddingHorizontal: 5 }}
    />
  );
};
