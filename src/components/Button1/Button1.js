import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import Styles from "./Button1.scss";

const Button1 = ({ text, tempo, style, left, right, handlePress, title }) => {
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
    <View style={{ ...style, ...Styles.container, ...styles.shadow }}>
      <Pressable
        delayLongPress={300}
        onLongPress={() => handlePressIn(-1)}
        onPressOut={handlePressOut}
        style={Styles.left}
        onPress={() => handlePress(-1)}
      >
        <Text style={Styles.leftTxt}>{left}</Text>
      </Pressable>
      {tempo ? (
        <View style={Styles.button}>
          <Text style={Styles.text}>{title}</Text>
          <TextInput
            ref={inputRef}
            returnKeyType="done"
            editable
            onSubmitEditing={() => inputRef.current.blur()}
            onChangeText={(txt) => handlePress(txt, (input = true))}
            value={value}
            keyboardType="number-pad"
            style={Styles.text}
          />
        </View>
      ) : (
        <View style={Styles.button}>
          <Text style={Styles.text}>{`${title}\n${text}`}</Text>
        </View>
      )}

      <Pressable
        delayLongPress={300}
        style={Styles.right}
        onLongPress={() => handlePressIn(1)}
        onPressOut={handlePressOut}
        onPress={() => handlePress(1)}
      >
        <Text style={Styles.rightTxt}>{right}</Text>
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
