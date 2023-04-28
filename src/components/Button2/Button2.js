import React from "react";
import { StyleSheet, View, Platform, Text, Pressable } from "react-native";
import theme1 from "../../stylings/theme1.scss";
import theme2 from "../../stylings/theme2.scss";
import theme3 from "../../stylings/theme3.scss";
const Button2 = ({ theme, handlePress, style, text }) => {
  return (
    <View
      style={{
        ...style,
        ...(theme === 0 && theme1.container),
        ...(theme === 1 && theme2.container),
        ...(theme === 2 && theme3.container),
      }}
    >
      <Pressable
        style={{
          ...(theme === 0 && theme1.button2),
          ...(theme === 1 && theme2.button2),
          ...(theme === 2 && theme3.button2),
          ...styles.shadow,
        }}
        onPress={handlePress}
      >
        <Text
          style={{
            ...(theme === 0 && theme1.text),
            ...(theme === 1 && theme2.text),
            ...(theme === 2 && theme3.text),
          }}
        >
          {text}
        </Text>
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
export default Button2;
