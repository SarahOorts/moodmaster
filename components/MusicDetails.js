import React, { useState, useEffect } from 'react';
import { Image, Text, StyleSheet, View, ScrollView, Button, Linking, TouchableOpacity } from 'react-native'; 
import { Audio } from 'expo-av';

const MusicDetails = props => {
  const [musicDetails, setMusicDetails] = useState({});
  const [artist, setArtist] = useState([""]);

  const getMusicDetailsById = async () => {
      const url = encodeURI(`https://api-v2.hearthis.at/${props.musicId}/`);
      fetch(url, {
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        }
      }).then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        console.log("working.");
        setMusicDetails(json);
        setArtist(json.user);
      });
  }   

  useEffect(() => {
    getMusicDetailsById();
  }, []);

    const [sound, setSound] = React.useState();

    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
        {uri:`${musicDetails.stream_url}`}
      );
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync(); }

    React.useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);

  return (
    <ScrollView>
      <Image
        style={styles.musicBanner}
        source={{uri:musicDetails.artwork_url}}
      />
      <Text style={styles.title}>{musicDetails.title}</Text>
      <View style={styles.details}>
        <View style={styles.text}> 
          <Text style={styles.textdetail}>Artist: {artist.username}</Text>            
          <Text style={styles.textdetail}>Genre: {musicDetails.genre}</Text>
        </View>
        <View style={styles.buttonview}>
          <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={playSound}>
            <Text style={styles.textbutton}>Play song</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={()=> Linking.openURL(musicDetails.user.permalink_url)}>
            <Text style={styles.textbutton}>More from this artist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 16,
    fontSize: 24,
    textAlign: 'center',
  },
  details: {
    height: 200,
    width: '100%',
  },
  text: {
    borderWidth: 1,
    backgroundColor: '#8311BD',
    borderColor: '#8311BD',
    padding: 16,
    margin: 8,
  },
  textdetail: {    
    color: "#ffffff",
    fontSize: 18,
  },
  musicBanner: {
    width: '100%',
    height: 300,
  },
  buttonview: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#3E0C57',
    padding: 10,
    width: 150,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textbutton: {
    color: '#ffffff',
    textTransform: "uppercase",
    fontSize: 18,
  },
});
export default MusicDetails;