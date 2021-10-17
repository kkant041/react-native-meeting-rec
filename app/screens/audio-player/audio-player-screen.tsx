/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Header, Screen, Slider, Text } from "../../components"
import { ActionButton } from "../record-audio/components/action-buttion"
import AntDesign from "react-native-vector-icons/dist/AntDesign"
import Ionicons from "react-native-vector-icons/dist/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons"
import AudioRecorderPlayer from "react-native-audio-recorder-player"
import { getTimeDifference } from "../../utils/time-conversions"

// AudioRecorderPlayer instance
const audioRecorderPlayer = new AudioRecorderPlayer()

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.primaryDarker,
  justifyContent: "space-between",
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 27,
  lineHeight: 30,
  textAlign: "center",
  letterSpacing: 1.5,
}
const SECTION0: ViewStyle = { justifyContent: "center", alignItems: "center" }
const SECTION1: ViewStyle = { justifyContent: "center" }
const SECTION2: ViewStyle = {
  height: windowHeight / 6,
  backgroundColor: color.primary,
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
  elevation: 9,
  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowOffset: { width: 1, height: 1 },
  shadowRadius: 3,
  flexDirection: "row",
  paddingBottom: 10,
}
const MIDDLE_CONT: ViewStyle = {
  height: 0.7 * windowWidth,
  width: 0.7 * windowWidth,
  borderRadius: 0.35 * windowWidth,
  borderWidth: 1,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: windowHeight / 10,
  borderColor: "#fff",
}
const ALIGN_CENTER: ViewStyle = { alignItems: "center" }
const SEC1_DIV0: ViewStyle = {
  width: "92%",
  alignSelf: "center",
  height: 10,
}
const SEC1_DIV1: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  marginHorizontal: 20,
  marginTop: 5,
}
const SEC2_DIV0: ViewStyle = {
  ...FULL,
  ...ALIGN_CENTER,
  marginTop: 30,
}
const SEC2_DIV1: ViewStyle = { ...FULL, ...ALIGN_CENTER, marginTop: 12 }
const SEC2_DIV2: ViewStyle = { ...FULL, ...ALIGN_CENTER, marginTop: 30 }
// For correction
const STOP_ICON: ViewStyle = { paddingLeft: 2 }
const HIGHLIGHT_ICON: ViewStyle = { paddingTop: 2 }

const SHOW_DURATION: TextStyle = {
  fontSize: windowWidth / 8,
  color: color.text,
  paddingRight: 6,
}
const ALERT_CONT: ViewStyle = {
  position: "absolute",
  top: 100,
  alignSelf: "center",
}

export const AudioPlayerScreen: React.FC<
  StackScreenProps<NavigatorParamList, "audioPlayer">
> = observer(({ navigation, route }) => {
  const [paused, setPaused] = React.useState<boolean>(false)
  // Audio player states
  const [currentPositionSec, setCurrentPositionSec] = React.useState<number>(10)
  const [currentDurationSec, setCurrentDurationSec] = React.useState<number>(0)

  const [currentHighlightSec, setCurrentHighlightSec] = React.useState<number>(0)

  React.useEffect(() => {
    onStartPlay()
  }, [])

  const numbOfHighlights = Math.floor(route.params.highlights.length / 2)

  const onStartPlay = async () => {
    await audioRecorderPlayer.startPlayer(route.params.uri)

    audioRecorderPlayer.addPlayBackListener((e) => {
      setCurrentPositionSec(e.currentPosition)
      setCurrentDurationSec(e.duration)
    })
  }

  React.useEffect(() => {
    if (currentPositionSec === currentDurationSec && currentPositionSec !== 0) {
      setPaused(true)
      setCurrentPositionSec(0)
    }
  }, [currentPositionSec])

  const onPausePlay = async () => {
    try {
      await audioRecorderPlayer.pausePlayer()
    } catch (error) {}
  }

  const onResumePlay = async () => {
    try {
      await audioRecorderPlayer.resumePlayer()
    } catch (error) {}
  }

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer()
    audioRecorderPlayer.removePlayBackListener()
  }

  const togglePauseButton = () => {
    if (paused) {
      if (currentPositionSec === 0) {
        onStartPlay()
      } else {
        onResumePlay()
      }
    } else {
      onPausePlay()
    }
    setPaused(!paused)
  }

  const onPressHighlighted = () => {
    if (numbOfHighlights !== 0) {
      audioRecorderPlayer.seekToPlayer(
        route.params.highlights[2 * (currentHighlightSec % numbOfHighlights) + 1],
      )
      setCurrentHighlightSec(currentHighlightSec + 1)
    }
  }

  return (
    <View testID="HomeScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed">
        <Header headerText={route.params.title} style={HEADER} titleStyle={HEADER_TITLE} />
        <View style={SECTION0}>
          <View style={MIDDLE_CONT}>
            <Text style={SHOW_DURATION}> {getTimeDifference(0, currentPositionSec)}</Text>
          </View>
        </View>
        <View style={SECTION1}>
          <View style={SEC1_DIV0}>
            <Slider
              highlightTimeStamp={route.params.highlights}
              startTime={route.params.start}
              endTime={route.params.end}
              currentPosition={currentPositionSec}
            />
          </View>
          <View style={SEC1_DIV1}>
            <Text text={getTimeDifference(0, currentDurationSec)} />
          </View>
        </View>
        <View style={SECTION2}>
          <View style={SEC2_DIV0}>
            <ActionButton
              icon={<AntDesign name="close" size={32} color="#eee" />}
              onPress={() => {
                onStopPlay()
                navigation.goBack()
              }}
              title="recordAudioScreen.close"
            />
          </View>
          <View style={SEC2_DIV1}>
            <ActionButton
              icon={
                <Ionicons
                  name={paused ? "play" : "pause"}
                  size={32}
                  color="#eee"
                  style={STOP_ICON}
                />
              }
              onPress={() => {
                togglePauseButton()
              }}
              title={paused ? "recordPlayerScreen.play" : "recordPlayerScreen.paused"}
            />
          </View>
          <View style={SEC2_DIV2}>
            <ActionButton
              icon={
                <AntDesign
                  name="forward"
                  size={26}
                  color={numbOfHighlights > 0 ? "#eee" : "#888"}
                  style={STOP_ICON}
                />
              }
              onPress={() => {
                onPressHighlighted()
              }}
              title="recordPlayerScreen.skip"
              textStyle={{ color: numbOfHighlights > 0 ? "#eee" : "#888" }}
            />
          </View>
        </View>
      </Screen>
    </View>
  )
})
