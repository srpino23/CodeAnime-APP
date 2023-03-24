import React from 'react';
import { FlatList } from 'react-native';

import AnimesItem from './AnimesItem';

export default VerticalAnimeList = function ({ animes, navigation }) {
  const renderItem = ({ item }) => (
    <AnimesItem navigationRoute={navigation} animes={item} />
  );

  return (
    <FlatList
      data={animes}
      showsVerticalScrollIndicator={false}
      keyExtractor={(animes) => animes._id.toString()}
      renderItem={renderItem}
      numColumns={3}
      columnWrapperStyle={{ gap: 5, justifyContent: 'center' }}
      contentContainerStyle={{ gap: 5 }}
    />
  );
};
