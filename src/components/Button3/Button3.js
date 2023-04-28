import React from "react";
import { StyleSheet, View, Platform, Pressable } from "react-native";
import theme1 from "../../stylings/theme1.scss";
import theme2 from "../../stylings/theme2.scss";
import theme3 from "../../stylings/theme3.scss";
import Play from "../../../assets/Play.svg";
import Pause from "../../../assets/Pause.svg";

const Button3 = ({ theme, play, style, togglePlay }) => {
  const handlePress = () => {
    togglePlay();
  };

  return (
    <View
      style={{
        ...style,
        ...(theme === 0 && theme1.play_container),
        ...(theme === 1 && theme2.play_container),
        ...(theme === 2 && theme3.play_container),
        ...styles.shadow,
      }}
    >
      <Pressable
        onPress={handlePress}
        style={{
          ...(theme === 0 && theme1.play_button),
          ...(theme === 1 && theme2.play_button),
          ...(theme === 2 && theme3.play_button),
          ...styles.shadow,
        }}
      >
        {!play ? (
          <Play
            style={{
              ...(theme === 0 && theme1.play_icon),
              ...(theme === 1 && theme2.play_icon),
              ...(theme === 2 && theme3.play_icon),
            }}
          />
        ) : (
          <Pause
            style={{
              ...(theme === 0 && theme1.pause_icon),
              ...(theme === 1 && theme2.pause_icon),
              ...(theme === 2 && theme2.pause_icon),
            }}
          />
        )}
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
