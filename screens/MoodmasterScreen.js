import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';

import MusicItem from '../components/MusicItem';

const WeathergenreScreen =({ navigation }) =>{
  let cond;

  const [music, setMusic] = useState([]);
  const [weather, setWeather] = useState("");
  const [genre, setGenre] = useState("");

    let late = encodeURI("https://api-v2.hearthis.at/feed/?page=1&count=20");
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
          setMusic(json);
        }).catch(error => {
          console.log(error);
        })
    }

    useEffect(() =>{
      latestMusic();
    },[]);

    const getWeather = async (enteredText) =>{        
      let url = encodeURI(`https://weatherapi-com.p.rapidapi.com/current.json?q=${enteredText}`);
      fetch(url,{
          "method": "GET",
          "headers": {
            "Content-Type": "application/json",
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
            "x-rapidapi-key": "PLACE API KEY"
          }
        })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          let js = json["current"];
          cond = js["condition"]["text"];
          setWeather(cond);
        }).catch(error => {
          console.log(error);
        })
      }

      useEffect(() => {
        getGenre(weather);
      },[weather]);

    const getGenre = (cond) => {
      let genre;
    
      switch (cond) {
        case "Light rain":
          console.log("ambient");
          genre = "ambient";
          break;
        case "Light drizzle":
          console.log("punk");
          genre = "punk";
          break;
        case "Sunny":
          console.log("pop");
          genre = "pop";
          break;
        case "Snow":
          console.log("acoustic");
          genre = "acoustic";
          break;
        case "Light snow":
          console.log("hip hop");
          genre = "hiphop";
          break;
        case "Windy":
          console.log("orchestral");
          genre = "orchestral";
          break;
        case "Cloudy":
          console.log("rock");
          genre = "rock";
          break;
        case "Partly cloudy":
          console.log("blues");
          genre = "blues";
          break;
        case "Mist":
          console.log("experimental");
          genre = "experimental";
          break;
        case "Overcast":
          console.log("Country");
          genre = "country";
          break;
        case "Fog":
          console.log("Chillout");
          genre = "chillout";
          break;
        case "Clear":
          console.log("Soul");
          genre= "soul";
          break;
        default:
          console.log("disco");
          genre = "disco";
      }
      
      setGenre(genre);
    
      let link = encodeURI(
        `https://api-v2.hearthis.at/feed/?page=1&count=20&category=${genre}`);
    
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
        }).catch(error => {
          console.log(error);
        })
    }    

    return (
      <View style={styles.screen}>   
      <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => navigation.navigate("Genre")}>
        <Text style={styles.buttontext}>Search by genre</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Get the best grooves for your weather's mood</Text>
        <View style={styles.search}>  
          <TextInput
          placeholder="search on location"
          style={styles.input}
          onChangeText={getWeather}
          />
          <Text style={styles.weather}>{weather} - {genre}</Text>
        </View>  
        <FlatList
          style={styles.list} 
          data={music} 
          keyExtractor={item => item.id} 
          renderItem={({ item }) =>(
            <MusicItem 
            id={item.id} 
            title={item.title}
            onSelectMusic={(selectedId) =>{ navigation.navigate("Details", {musicId: selectedId})}}/>
        )}/>
      </View>
      );
}

  const styles = StyleSheet.create({
    screen: {
      padding: 50,
    },
    search: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color:  "#8311BD",
      fontWeight: '700',
      fontSize: 24,
      marginBottom: 5,
    },
    weather: {
      color: "#3E0C57",
      fontSize: 18,
      marginBottom: 15,
    },
    input:{
      color: "#A243D1",
      fontSize: 20,
      marginBottom: 5,
      textAlign: "center",
    },
    list:{
      height: 800,
    },
    button: {
      backgroundColor:"#3E0C57",
      padding: 10,
      width: 180,
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

  export default WeathergenreScreen;