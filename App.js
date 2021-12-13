import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RestaurantFinder from './RestaurantFinder';
import RestaurantInfo from './RestaurantInfo';
import Favorites from './Favorites';

const  Stack = createStackNavigator();


export default function App() {

  return (
  
    <NavigationContainer>

      <Header
        centerComponent={{ text: 'HELSINKI RESTAURANTS', style: { color: '#fff' } }}
      />          

      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={RestaurantFinder} />
        <Stack.Screen name="Info" component={RestaurantInfo} />
        <Stack.Screen name="Favorites" component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );

  
}


