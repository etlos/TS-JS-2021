import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  Dimensions,
} from "react-native";
import FriendFinderInputs from "./components/modal";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const SERVER_URL = "https://e9bc1d607ffd.ngrok.io";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState(undefined);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  async function handleSubmit(params) {
    // params.longitude = 12; //Get this from device
    // params.latitude = 55; // Get this from device
    params.longitude = location.coords.longitude
    params.latitude = location.coords.latitude
    Alert.alert("Data (must be sent to server)", JSON.stringify(params));
    try {
      const data = await fetch(SERVER_URL + "/friends", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }).then(res => res.json())
      console.log("Done", data)
      setVisible(false)
      setFriends(data)
    } catch (err) {
      console.log("u messed up")
      console.log("Error", err)
    }

    setVisible(!visible);
  }

  
  return (
    <View style={styles.container}>
      <FriendFinderInputs
        visible={visible}
        setVisible={setVisible}
        submit={handleSubmit}
      />

      <View
        style={{
          flex: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "lightgreen",
          width: "100%",
        }}
      >
        {location && (
          <MapView
            style={styles.map}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              title="Me"
              coordinate={{
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              }}
            />
            {friends.map((f, idx) => {
            return (
              <Marker
                key={idx}
                coordinate={{
                  longitude: f.longitude, latitude: f.latitude
                }}
                title={f.name}
                pinColor="green"
              />
            )
          })}
          </MapView>
        )}
      </View>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Find Nearby Friends</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  openButton: {
    backgroundColor: "darkgray",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 80,
  },
});
