import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Importamos la pantalla de inicio
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ListScreen from '../screens/ListScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ViewScreen from '../screens/ViewScreen';

// Creamos la navegación en una constante para la pila
const Stack = createStackNavigator();

// Creamos la navegación en una constante para las pestañas
const Tab = createBottomTabNavigator();

// Configuramos la navegación para inicio
function HomeStack({ setMyValue }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="View">
        {(props) => <ViewScreen {...props} setMyValue={setMyValue} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// Configuramos la navegación para busqueda
function SearchStack({ setMyValue }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchStack" component={SearchScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="View">
        {(props) => <ViewScreen {...props} setMyValue={setMyValue} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// Configuramos la navegación para lista
function ListStack({ setMyValue }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ListStack" component={ListScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="View">
        {(props) => <ViewScreen {...props} setMyValue={setMyValue} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function Navigation({ myValue, setMyValue }) {
  return (
    <NavigationContainer theme={{ colors: { background: '#0D0D0D' } }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: myValue,
          headerTitle: () => {
            return (
              <View style={styles.header}>
                <Text style={styles.text}>Code</Text>
                <Image
                  style={styles.headerImage}
                  source={require('../assets/logo.png')}
                />
                <Text style={styles.text}>Anime</Text>
              </View>
            );
          },
          headerRight: () => {
            return (
              <View style={styles.headerButtons}>
                <TouchableOpacity>
                  <FontAwesome5 name="chromecast" size={28} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome5 name="user-circle" size={25} color="white" />
                </TouchableOpacity>
              </View>
            );
          },
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#00b871',
          tabBarInactiveTintColor: '#B5B5B5',
          showLabel: false,
          tabBarStyle: { backgroundColor: 'black' },
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'List') {
              iconName = focused ? 'list' : 'list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={({ route }) => {
            return myValue ? {} : { tabBarStyle: { display: 'none' } };
          }}
        >
          {(props) => <HomeStack {...props} setMyValue={setMyValue} />}
        </Tab.Screen>
        <Tab.Screen
          name="Search"
          options={({ route }) => {
            return myValue ? {} : { tabBarStyle: { display: 'none' } };
          }}
        >
          {(props) => <SearchStack {...props} setMyValue={setMyValue} />}
        </Tab.Screen>
        <Tab.Screen
          name="List"
          options={({ route }) => {
            return myValue ? {} : { tabBarStyle: { display: 'none' } };
          }}
        >
          {(props) => <ListStack {...props} setMyValue={setMyValue} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 48,
    height: 48,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 10,
  },
});
