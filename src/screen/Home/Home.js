import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Dimensions } from "react-native";
import Button1 from "../../components/Button1/Button1";
import Button2 from "../../components/Button2/Button2";
import Button3 from "../../components/Button3/Button3";
import Button4 from "../../components/Button4/Button4";
import Styles from "../Home/Home.scss";
import { Audio } from "expo-av";
import BackGround1 from "../../../assets/BackGround1.svg";
import BackGround2 from "../../../assets/BackGround2.svg";
import BackGround3 from "../../../assets/BackGround3.svg";

const sound1 = {
  name: "sound1",
  sound: require("../../../assets/sound1.mp3"),
  soundStressed: require("../../../assets/sound1Stressed.mp3"),
};
const sound2 = {
  name: "sound2",
  sound: require("../../../assets/sound2.mp3"),
  soundStressed: require("../../../assets/sound2Stressed.mp3"),
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
const offSet = screenHeight - (screenHeight * 9) / 10;
const minTempo = 10;
const maxTempo = 500;
const tsList = ["1/4", "2/4", "3/4", "4/4"];
const soundList = [sound1, sound2];
const themeList = ["theme1", "theme2", "theme3"];

const Home = () => {
  const [tempo, setTempo] = useState(150);
  const [theme, setTheme] = useState(0);
  const [tsId, setTSId] = useState(0);
  const [soundId, setSoundId] = useState(0);
  const [soundFile, setSoundFile] = useState(null);
  const [stressedSoundFile, setStressedSoundFile] = useState(null);
  const [play, setPlay] = useState(false);
  const animationFrameIdRef = useRef(null);

  const lastTapTimeRef = useRef(0);
  const tapCountRef = useRef(0);

  const handleTap = () => {
    const now = performance.now();
    const lastTapTime = lastTapTimeRef.current;
    const tapCount = tapCountRef.current;
    if (now - lastTapTime > 2000) {
      // more than 2 second since last tap, reset tap count
      tapCountRef.current = 0;
      setTempo(10);
    } else {
      tapCountRef.current = tapCount + 1;
      if (tapCount === 1) {
        //calculate tempo and reset tap count
        const interval = now - lastTapTime;
        const calculatedTempo = Math.round(60000 / interval);
        calculatedTempo >= 10 && calculatedTempo <= 500
          ? setTempo(calculatedTempo)
          : setTempo(10);
        tapCountRef.current = 0;
      }
    }
    lastTapTimeRef.current = now;
  };

  useEffect(() => {
    setPlay(false);
  }, [tempo, soundId]);

  useEffect(() => {
    play ? playSound() : stopSound();
  }, [play]);

  const togglePlay = () => {
    setPlay(!play);
  };

  const stopSound = useCallback(async () => {
    cancelAnimationFrame(animationFrameIdRef.current);
    if (soundFile) {
      await soundFile.stopAsync();
      await soundFile.setPositionAsync(0);
      await soundFile.unloadAsync();
    }
    if (stressedSoundFile) {
      await stressedSoundFile.stopAsync();
      await stressedSoundFile.setPositionAsync(0);
      await stressedSoundFile.unloadAsync();
    }
  });
  const playSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      soundList[soundId]?.sound,
      {}
    );
    const { sound: stressedSound } = await Audio.Sound.createAsync(
      soundList[soundId]?.soundStressed
    );
    setSoundFile(sound);
    setStressedSoundFile(stressedSound);
    let lastPlayTime = null;
    const interval = 60000 / tempo - 15;
    const maxBeats = parseInt(tsList[tsId]);
    let beat = 1;
    const playSoundRAF = (timestamp) => {
      if (!lastPlayTime || timestamp - lastPlayTime >= interval) {
        console.log(timestamp - lastPlayTime);
        if (beat === 1 && maxBeats !== 1) {
          stressedSound.replayAsync();
        } else {
          sound.replayAsync();
        }
        beat++;
        if (beat > maxBeats) {
          beat = 1;
        }
        lastPlayTime = timestamp;
      }
      animationFrameIdRef.current = requestAnimationFrame(playSoundRAF);
    };
    playSoundRAF(performance.now());
  });

  const handleTempo = useCallback((delta, isInput) => {
    delta = Number(delta);
    setTempo((prevTempo) => {
      const value = isInput ? delta : prevTempo + delta;
      if (value <= maxTempo && value >= minTempo) return value;
      else return prevTempo;
    });
  });

  const handleTS = useCallback((delta) => {
    delta = Number(delta);
    setTSId((prevTS) => {
      const length = tsList.length;
      const value = prevTS + delta;
      if (value > length - 1) return 0;
      else if (value < 0) return length - 1;
      else return value;
    });
  });
  const handleSound = useCallback((delta) => {
    delta = Number(delta);
    setSoundId((prevSound) => {
      const length = soundList.length;
      const value = prevSound + delta;
      if (value > length - 1) return 0;
      else if (value < 0) return length - 1;
      else return value;
    });
  });
  const handleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const length = themeList.length;
      if (prevTheme + 1 > length - 1) return 0;
      else return prevTheme + 1;
    });
  });

  return (
    <View style={Styles.container}>
      <Button4 theme={theme} handlePress={handleTheme} />
      <Button1
        theme={theme}
        title={"TEMPO"}
        tempo={tempo}
        style={Styles.button}
        left={"-"}
        right={"+"}
        handlePress={handleTempo}
      />
      <Button2
        theme={theme}
        handlePress={handleTap}
        style={Styles.button}
        text={"TAP TEMPO"}
      />
      <Button3
        theme={theme}
        play={play}
        togglePlay={togglePlay}
        title={"SOUND"}
        style={Styles.button}
      />
      <Button1
        theme={theme}
        title={"TS"}
        text={tsList[tsId]}
        style={Styles.button}
        left={"<"}
        right={">"}
        handlePress={handleTS}
      />
      <Button1
        theme={theme}
        title={"SOUND"}
        text={soundList[soundId].name}
        style={Styles.button}
        left={"<"}
        right={">"}
        handlePress={handleSound}
      />

      {theme === 0 && (
        <BackGround1
          style={Styles.background}
          viewBox={`0 0 ${screenWidth} ${screenHeight - offSet}`}
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      {theme === 1 && (
        <BackGround2
          style={Styles.background}
          viewBox={`0 0 ${screenWidth} ${screenHeight - offSet}`}
          preserveAspectRatio="xMidYMid slice"
        />
      )}
      {theme === 2 && (
        <BackGround3
          style={Styles.background}
          viewBox={`0 0 ${screenWidth} ${screenHeight - offSet}`}
          preserveAspectRatio="xMidYMid slice"
        />
      )}
    </View>
  );
};

export default Home;
