import React, { useState } from "react";
import {
  Modal,
  Alert,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} from "react-native";

export default FriendFinderInputs = ({ visible, setVisible, submit }) => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [distance, onChangeDistance] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Enter email, password and distance
          </Text>
          <TextInput
            placeholder="Enter user Name"
            value={email}
            onChangeText={setEmail}
          >
          </TextInput>
          <TextInput
            placeholder="Enter Password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          >
          </TextInput>
          <TextInput
            placeholder="Enter Distance"
            value={distance}
            keyboardType="numeric"
            onChangeText={onChangeDistance}
          >
          </TextInput>
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                const params = {
                  email,
                  password,
                  distance: Number(distance),
                };
                submit(params);
              }}
            >
              <Text style={styles.textStyle}>Find Friends</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "gray" }}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
