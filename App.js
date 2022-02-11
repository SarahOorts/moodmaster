import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import MoodmasterScreen from './screens/MoodmasterScreen';
import DetailsScreen from './screens/DetailsScreen';
import GenreScreen from './screens/GenreScreen';
import GenreDetailScreen from './screens/GenreDetailScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Moodmaster" component={MoodmasterScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Genre" component={GenreScreen} />
        <Stack.Screen name="Genre Music" component={GenreDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
