import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Dimensions } from "react-native";
import Button1 from "../../components/Button1/Button1";
import Button2 from "../../components/Button2/Button2";
import Button3 from "../../components/Button3/Button3";
import Styles from "../Home/Home.scss";
import Gradient from "../../../assets/Gradient.svg";
import { Audio } from "expo-av";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
const offSet = screenHeight - (screenHeight * 9) / 10;
const minTempo = 10;
const maxTempo = 500;
const tsList = ["1/4", "2/4", "3/4", "4/4", "5/4", "3/8", "6/8"];
const soundList = ["sound1"];

const Home = () => {
  const [tempo, setTempo] = useState(110);
  const [ts, setTS] = useState(0);
  const [sound, setSound] = useState(0);
  const [soundFile, setSoundFile] = useState(null);
  const [play, setPlay] = useState(false);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    setPlay(false);
  }, [tempo, sound]);

  useEffect(() => {
    play ? playSound() : stopSound();
  }, [play]);

  const togglePlay = () => {
    setPlay(!play);
  };

  const stopSound = useCallback(async () => {
    if (soundFile) {
      cancelAnimationFrame(animationFrameIdRef.current);
      await soundFile.stopAsync();
      await soundFile.setPositionAsync(0);
      await soundFile.unloadAsync();
    }
  });
  const playSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      require(`../../../assets/sound1.mp3`)
    );
    setSoundFile(sound);
    let lastPlayTime = null;
    const interval = 60000 / tempo;
    const playSoundRAF = (timestamp) => {
      if (
        sound &&
        (!lastPlayTime || timestamp - lastPlayTime >= interval - 10)
      ) {
        sound.replayAsync();
        lastPlayTime = timestamp;
      }
      animationFrameIdRef.current = requestAnimationFrame(playSoundRAF);
    };
    playSoundRAF(performance.now());
  });

  const handleTempo = useCallback((delta, isInput) => {
    try {
      delta = Number(delta);
      setTempo((prevTempo) => {
        const value = isInput ? delta : prevTempo + delta;
        if (value <= maxTempo && value >= minTempo) return value;
        else return prevTempo;
      });
    } catch (error) {}
  });

  const handleTS = useCallback((delta) => {
    try {
      delta = Number(delta);
      setTS((prevTS) => {
        const length = tsList.length;
        const value = prevTS + delta;
        if (value > length - 1) return 0;
        else if (value < 0) return length - 1;
        else return value;
      });
    } catch (error) {}
  });
  const handleSound = useCallback((delta) => {
    try {
      delta = Number(delta);
      setSound((prevSound) => {
        const length = soundList.length;
        const value = prevSound + delta;
        if (value > length - 1) return 0;
        else if (value < 0) return length - 1;
        else return value;
      });
    } catch (error) {}
  });

  return (
    <View style={Styles.container}>
      <Button1
        title={"TEMPO"}
        tempo={tempo}
        style={Styles.button}
        left={"-"}
        right={"+"}
        handlePress={handleTempo}
      />
      <Button2 style={Styles.button} text={"TAP TEMPO"} />
      <Button3
        play={play}
        togglePlay={togglePlay}
        title={"SOUND"}
        style={Styles.button}
      />
      <Button1
        title={"TS"}
        text={tsList[ts]}
        style={Styles.button}
        left={"<"}
        right={">"}
        handlePress={handleTS}
      />
      <Button1
        title={"SOUND"}
        text={soundList[sound]}
        style={Styles.button}
        left={"<"}
        right={">"}
        handlePress={handleSound}
      />

      <Gradient
        style={Styles.background}
        viewBox={`0 0 ${screenWidth} ${screenHeight - offSet}`}
        preserveAspectRatio="xMidYMid slice"
      />
    </View>
  );
};

export default Home;
