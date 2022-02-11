import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Button} from 'react-native';

import Genres from '../components/Genres';

const GenreDetailScreen =({ route, navigation }) =>{
const { genreId } = route.params;
  const [music, setMusic] = useState([]);

    const getMusicGenre = (selectedGenre) => {
      let link = encodeURI(
        `https://api-v2.hearthis.at/feed/?page=1&count=10&category=${genreId}`);
    
      fetch(link,{
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setMusic(json);
        });
    }    
    
    useEffect(() => {
        getMusicGenre();
    },[]);

    return (
      <View style={styles.screen}> 
        <FlatList data={music} 
          keyExtractor={item => item.id} 
          renderItem={({ item }) =>(
            <Genres
            id={item.id} 
            title={item.title}
            onSelectId={(selectedId) =>{ navigation.navigate("Details", {musicId: selectedId})}}/> 
        )}/>
      </View>
      );
}

  const styles = StyleSheet.create({
    screen: {
      padding: 50,
    },
    input:{
      color: "black",
    },
  });

  export default GenreDetailScreen;