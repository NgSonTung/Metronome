import React from "react";
import { StyleSheet, View, Platform, Text, Pressable } from "react-native";
import Styles from "./Button2.scss";

const Button1 = ({ style, text, handlePress }) => {
  return (
    <View style={{ ...style, ...Styles.container }}>
      <Pressable
        style={{ ...Styles.button, ...styles.shadow }}
        onPress={handlePress}
      >
        <Text style={Styles.text}>{text}</Text>
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
export default Button1;
