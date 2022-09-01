/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
const GOOGLE_PLACES_API_KEY = 'AIzaSyBSdIWTCYuHkCYUnMatkKgBsGMiNCKTciw';
const screenWidth = Dimensions.get('window').width
// import Placesearch from 'react-native-placesearch'; Install npm package for place search

function App() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  async function getPermission() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
  useEffect(() => {
    getPermission().then(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    })

  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
        />
      </MapView>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(details.geometry.location);
          setLocation({ latitude: details?.geometry?.location.lat, longitude: details?.geometry.location.lng })
        }}
        placeholder="Search place"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en'
        }}
        GooglePlacesDetailsQuery={{
          fields: 'geometry'
        }}
        onFail={(error) => { console.log(error) }}
        style={styles.searchBar}></GooglePlacesAutocomplete>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  searchBar: {
    description: {
      fontWeight: 'bold'
    },
    predefinedPlacesDescription: {
      color: "#1faadb"
    },
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      top: 50,
      width: screenWidth - 10,
      borderWidth: 0
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: '#5d5d5d',
      fontSize: 16,
      borderWidth: 0,
    },
    listView: {
      backgroundColor: 'rgba(192,192,1920.9)',
      top: 23,

    }
  }
});

export default App;


