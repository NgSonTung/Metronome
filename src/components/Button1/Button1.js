import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import theme1 from "../../stylings/theme1.scss";
import theme2 from "../../stylings/theme2.scss";
import theme3 from "../../stylings/theme3.scss";

const Button1 = ({
  theme,
  text,
  tempo,
  style,
  left,
  right,
  handlePress,
  title,
}) => {
  const [value, setValue] = useState(String(tempo));
  const [intervalId, setIntervalId] = useState(null);
  const inputRef = useRef();

  const handlePressIn = (increment) => {
    if (!intervalId) {
      setIntervalId(
        setInterval(() => {
          handlePress(increment);
        }, 100)
      );
    }
  };

  const handlePressOut = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    const newTempoString = String(tempo);
    if (newTempoString !== value) {
      setValue(newTempoString);
    }
  }, [tempo, value]);

  return (
    <View
      style={{
        ...style,
        ...(theme === 0 && theme1.container),
        ...(theme === 1 && theme2.container),
        ...(theme === 2 && theme3.container),
        ...styles.shadow,
      }}
    >
      <Pressable
        delayLongPress={300}
        onLongPress={() => handlePressIn(-1)}
        onPressOut={handlePressOut}
        style={{
          ...(theme === 0 && theme1.left),
          ...(theme === 1 && theme2.left),
          ...(theme === 2 && theme3.left),
        }}
        onPress={() => handlePress(-1)}
      >
        <Text
          style={{
            ...(theme === 0 && theme1.leftTxt),
            ...(theme === 1 && theme2.leftTxt),
            ...(theme === 2 && theme3.leftTxt),
          }}
        >
          {left}
        </Text>
      </Pressable>
      {tempo ? (
        <View
          style={{
            ...(theme === 0 && theme1.button1),
            ...(theme === 1 && theme2.button1),
            ...(theme === 2 && theme3.button1),
          }}
        >
          <Text
            style={{
              ...(theme === 0 && theme1.text),
              ...(theme === 1 && theme2.text),
              ...(theme === 2 && theme3.text),
            }}
          >
            {title}
          </Text>
          <TextInput
            ref={inputRef}
            returnKeyType="done"
            editable
            onSubmitEditing={() => inputRef.current.blur()}
            onChangeText={(txt) => handlePress(txt, (input = true))}
            value={value}
            keyboardType="number-pad"
            style={{
              ...(theme === 0 && theme1.text),
              ...(theme === 1 && theme2.text),
              ...(theme === 2 && theme3.text),
            }}
          />
        </View>
      ) : (
        <View
          style={{
            ...(theme === 0 && theme1.button1),
            ...(theme === 1 && theme2.button1),
            ...(theme === 2 && theme3.button1),
          }}
        >
          <Text
            style={{
              ...(theme === 0 && theme1.text),
              ...(theme === 1 && theme2.text),
              ...(theme === 2 && theme3.text),
            }}
          >{`${title}\n${text}`}</Text>
        </View>
      )}

      <Pressable
        delayLongPress={300}
        style={{
          ...(theme === 0 && theme1.right),
          ...(theme === 1 && theme2.right),
          ...(theme === 2 && theme3.right),
        }}
        onLongPress={() => handlePressIn(1)}
        onPressOut={handlePressOut}
        onPress={() => handlePress(1)}
      >
        <Text
          style={{
            ...(theme === 0 && theme1.rightTxt),
            ...(theme === 1 && theme2.rightTxt),
            ...(theme === 2 && theme3.rightTxt),
          }}
        >
          {right}
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
export default Button1;
