import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/utils/stores';

import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

import { RootStackParamList } from './src/def'; // Importation correcte

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen" // Changé pour correspondre à RootStackParamList
            component={HomeScreen}
            options={{ title: 'Liste de Pokémon' }}
          />
          <Stack.Screen 
            name="DetailScreen" // Gardé comme dans RootStackParamList
            component={DetailScreen}
            options={({ route }) => ({ title: route.params.name })} // Mise à jour pour refléter le nom du Pokémon
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
