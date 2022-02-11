import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';

import GenreItem from '../components/GenreItem';

const GenreScreen =({ navigation }) =>{

  const [genre, setGenre] = useState([]);

    let late = encodeURI("https://api-v2.hearthis.at/categories/");
    const latestMusic = async () =>{
      fetch(late, {
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        }
      }).then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log(json[0]);
          setGenre(json);
        });
    }

    useEffect(() => {
        latestMusic();
    },[]);

    return (
      <View style={styles.screen}>
        <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={()=> navigation.navigate("Moodmaster")}>
          <Text style={styles.buttontext}>search by weather</Text>
        </TouchableOpacity>        
        <Text style={styles.text}>Get the best grooves for your mood</Text>
        <FlatList 
          data={genre} 
          keyExtractor={item => item.id} 
          renderItem={({ item }) =>(
            <GenreItem 
            id={item.id} 
            name={item.name}
            onSelectId={(selectedId) =>{ navigation.navigate("Genre Music", {genreId: selectedId})}}/> 
        )}/>
      </View>
      );
}

  const styles = StyleSheet.create({
    screen: {
      padding: 50,
    },
    text: {
      color:  "#8311BD",
      fontWeight: '700',
      fontSize: 24,
    },
    button:{
      backgroundColor:"#3E0C57",
      padding: 10,
      width: 210,
      marginBottom: 20, 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttontext: {
      color: '#ffffff',
      textTransform: "uppercase",
      fontSize: 18,
    },
  });

  export default GenreScreen;