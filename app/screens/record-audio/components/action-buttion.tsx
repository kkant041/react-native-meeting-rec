import React from "react"
import { TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import { Text } from "../../../components"
import { TxKeyPath } from "../../../i18n"
import { color } from "../../../theme"

const CONTAINER: ViewStyle = {
  backgroundColor: "#171717",
  elevation: 9,
  shadowColor: "#000",
  shadowOpacity: 0.9,
  shadowOffset: { width: 1, height: 1 },
  shadowRadius: 3,
  overflow: "hidden",
  alignSelf: "center",
  height: 60,
  width: 60,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
}
const TITLE: TextStyle = {
  color: color.text,
  textAlign: "center",
  fontSize: 12,
  marginTop: 3,
}

interface ActionButtonProps {
  icon: any
  onPress(): void
  title: TxKeyPath
  textStyle?: TextStyle
}

export function ActionButton(props: ActionButtonProps) {
  return (
    <View testID="ActionButtonComp">
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.72}>
        <View style={CONTAINER}>{props.icon}</View>
      </TouchableOpacity>
      <Text tx={props.title} style={[TITLE, props.textStyle]} />
    </View>
  )
}
