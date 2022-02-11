import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Genres = props => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => props.onSelectId(props.id)}>
      <View style={styles.listItem}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity >

  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: 'grey',
    borderStyle: 'dashed',
    borderWidth: 0.5,
    backgroundColor: '#8311BD',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
});
export default Genres;