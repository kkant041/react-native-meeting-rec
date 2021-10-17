import React from "react"
import { View, ViewStyle, TextStyle, Text, TouchableOpacity } from "react-native"
import { Record } from "../../../models"
import { color, typography } from "../../../theme"
import { getTimeDifference, msToDate } from "../../../utils/time-conversions"
import Ionicons from "react-native-vector-icons/dist/Ionicons"
import { useNavigation } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"

const CONTAINER: ViewStyle = {
  backgroundColor: color.primary,
  marginHorizontal: 10,
  marginVertical: 4,
  paddingHorizontal: 10,
  paddingVertical: 10,
  borderRadius: 8,
  elevation: 9,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 1, height: 1 },
  shadowRadius: 3,
}
const TOUCH_CONT: ViewStyle = { flexDirection: "row" }
const COL_0: ViewStyle = {
  flex: 1,
}
const COL_1: ViewStyle = {
  width: 52,
  justifyContent: "center",
  alignItems: "flex-end",
  paddingRight: 8,
}
const DIV_0: ViewStyle = {
  backgroundColor: color.transparent,
}
const DIV_1: ViewStyle = {
  backgroundColor: color.transparent,
  marginTop: 10,
  flexDirection: "row",
  justifyContent: "space-between",
}
const DATE_CONT: ViewStyle = {}
const DURATION_CONT: ViewStyle = {}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const TITLE_STYLE: TextStyle = { ...TEXT, fontWeight: "500", fontSize: 16 }

interface ShowRecordedAudioProps {
  record: Record
}

export function ShowRecordedAudio(props: ShowRecordedAudioProps) {
  // const nextScreen = () => navigation.navigate("demo")
  const navigation = useNavigation<StackNavigationProp<NavigatorParamList, "home">>()

  return (
    <View testID="ShowRecordedAudioComp" style={CONTAINER}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("audioPlayer", props.record)
        }}
        activeOpacity={0.75}
        style={TOUCH_CONT}
      >
        <View style={COL_0}>
          <View style={DIV_0}>
            <Text style={TITLE_STYLE}>{props.record.title}</Text>
          </View>
          <View style={DIV_1}>
            <View style={DATE_CONT}>
              <Text style={TEXT}>{msToDate(props.record.start)}</Text>
            </View>
            <View style={DURATION_CONT}>
              <Text style={TEXT}>{getTimeDifference(props.record.start, props.record.end)}</Text>
            </View>
          </View>
        </View>
        <View style={COL_1}>
          <Ionicons name="chevron-forward" size={15} color="#bbb" />
        </View>
      </TouchableOpacity>
    </View>
  )
}
