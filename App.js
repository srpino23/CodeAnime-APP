import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

// Importamos la pantalla de carga
import SplashScreen from './screens/SplashScreen';

// Importamos la navegacion
import Navigation from './components/Navigation';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [myValue, setMyValue] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Navigation myValue={myValue} setMyValue={setMyValue} />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
