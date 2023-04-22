import React, { useState } from "react";
import { StyleSheet, View, Platform, Pressable } from "react-native";
import Styles from "./Button3.scss";
import Play from "../../../assets/Play.svg";
import Pause from "../../../assets/Pause.svg";

const Button3 = ({ play, style, togglePlay }) => {
  const handlePress = () => {
    togglePlay();
  };

  return (
    <View style={{ ...style, ...Styles.container, ...styles.shadow }}>
      <Pressable
        onPress={handlePress}
        style={{ ...Styles.button, ...styles.shadow }}
      >
        {!play ? <Play style={Styles.play} /> : <Pause style={Styles.pause} />}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow:
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2.5,
        }
      : {
          elevation: 5,
        },
});
export default Button3;
