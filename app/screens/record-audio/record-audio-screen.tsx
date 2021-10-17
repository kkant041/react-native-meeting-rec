import React from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextStyle, View, ViewStyle, Text, Platform } from "react-native"
import { color, spacing, typography } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Header, Screen } from "../../components"
import AntDesign from "react-native-vector-icons/dist/AntDesign"
import Ionicons from "react-native-vector-icons/dist/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons"
import { ActionButton } from "./components/action-buttion"
import { getTimeDifference } from "../../utils/time-conversions"
import { Ask } from "../../components/ask/ask"
import { getNewID } from "../../utils/utils"
import AudioRecorderPlayer from "react-native-audio-recorder-player"
import { useStores } from "../../models"

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

// New ID
const id = getNewID()

// Recordeing audio instance
const audioRecorderPlayer = new AudioRecorderPlayer()
const path = `${id}.m4a`

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
const SECTION1: ViewStyle = {
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
}
const ALIGN_CENTER: ViewStyle = { alignItems: "center" }
const SEC1_DIV0: ViewStyle = {
  ...FULL,
  ...ALIGN_CENTER,
  marginTop: 32,
}
const SEC1_DIV1: ViewStyle = { ...FULL, ...ALIGN_CENTER, marginTop: 12 }
const SEC1_DIV2: ViewStyle = { ...FULL, ...ALIGN_CENTER, marginTop: 32 }
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

export const RecordAudioScreen: React.FC<
  StackScreenProps<NavigatorParamList, "recordAudio">
> = observer(({ navigation, route }) => {
  // Highlight state
  const [highlighting, setHighlighting] = React.useState<boolean>(false)

  const [showAsk, setShowAsk] = React.useState<string>("none")

  const [startTime, setStartTime] = React.useState<number>()
  // timestamps of highlights alternate switching, starting with 0 then highlighting timestamp
  const [highlightTimestamp, setHighlightTimestamp] = React.useState<Array<number>>([0])

  // Record states
  const [recordSecs, setRecordSecs] = React.useState<number>(0)
  const [recordTime, setRecordTime] = React.useState<string>("")

  // Access root store
  const rootStore = useStores()

  const MIDDLE_CONT_CUS: ViewStyle = {
    ...MIDDLE_CONT,
    borderColor: highlighting ? "orange" : "#fff",
  }

  // Recorder functions
  const onStartRecord = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder(path)
      setStartTime(Date.now())
      audioRecorderPlayer.addRecordBackListener((e) => {
        setRecordSecs(e.currentPosition)
        setRecordTime(audioRecorderPlayer.mmssss(Math.round(e.currentPosition)))
      })
    } catch (error) {}
  }

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder()
    audioRecorderPlayer.removeRecordBackListener()
    rootStore.recordStore.saveRecords({
      id: String(id),
      title: route.params.title,
      start: startTime,
      end: startTime + recordSecs,
      uri: result,
      highlights: highlightTimestamp,
    })
    navigation.goBack()
  }

  const onCloseRecord = async () => {
    await audioRecorderPlayer.stopRecorder()
    navigation.goBack()
  }

  React.useEffect(() => {
    onStartRecord()
  }, [])

  React.useEffect(() => {}, [recordSecs, recordTime])

  return (
    <View testID="HomeScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed">
        <Header headerText={route.params.title} style={HEADER} titleStyle={HEADER_TITLE} />
        <View style={SECTION0}>
          <View style={MIDDLE_CONT_CUS}>
            <Text style={SHOW_DURATION}> {getTimeDifference(0, recordSecs)}</Text>
          </View>
        </View>
        <View style={SECTION1}>
          <View style={SEC1_DIV0}>
            <ActionButton
              icon={<AntDesign name="close" size={32} color="#eee" />}
              onPress={() => {
                setShowAsk("closeAlert")
              }}
              title="recordAudioScreen.close"
            />
          </View>
          <View style={SEC1_DIV1}>
            <ActionButton
              icon={<Ionicons name="stop" size={32} color="#eee" style={STOP_ICON} />}
              onPress={() => {
                setShowAsk("stopAlert")
              }}
              title="recordAudioScreen.stop"
            />
          </View>
          <View style={SEC1_DIV2}>
            <ActionButton
              icon={
                <MaterialCommunityIcons
                  name="format-color-highlight"
                  size={32}
                  color={highlighting ? "orange" : "#eee"}
                  style={HIGHLIGHT_ICON}
                />
              }
              onPress={() => {
                setHighlighting(!highlighting)
                setHighlightTimestamp([...highlightTimestamp, recordSecs])
              }}
              title="recordAudioScreen.highlight"
            />
          </View>
        </View>
        <Ask
          cusKey="closeAlert"
          showAsk={showAsk}
          onCancel={() => {
            setShowAsk("none")
          }}
          sure={() => {
            onCloseRecord()
          }}
          heading="common.areYouSure"
          title="recordAudioScreen.confirmClose"
          go="recordAudioScreen.close"
          cancel="common.cancel"
        />
        <Ask
          cusKey="stopAlert"
          showAsk={showAsk}
          onCancel={() => {
            setShowAsk("none")
          }}
          sure={() => {
            onStopRecord()
          }}
          heading="common.areYouSure"
          title="recordAudioScreen.confirmStop"
          go="recordAudioScreen.save"
          cancel="common.cancel"
        />
      </Screen>
    </View>
  )
})
