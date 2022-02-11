// import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import MusicDetails from '../components/MusicDetails';

const DetailsScreen = ({ route, navigation }) => {
  const { musicId } = route.params;


  return (
    <View style={styles.screen}>
      <MusicDetails musicId={musicId} />
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={() => navigation.navigate('Moodmaster')}>
            <Text style={styles.text}>Go to Moodmaster</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor:"#3E0C57",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
export default DetailsScreen;