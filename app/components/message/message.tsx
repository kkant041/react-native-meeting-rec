import * as React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from ".."
import { TxKeyPath } from "../../i18n"
import { color } from "../../theme"

const CONTAINER: ViewStyle = {
  //   backgroundColor: color.,
  paddingHorizontal: 10,
  paddingVertical: 6,
}
const ALERT_MESSAGE: TextStyle = {
  color: color.text,
}

interface LineBreakProps {
  style?: ViewStyle
  tx: TxKeyPath
}

export function Message(props: LineBreakProps) {
  return (
    <View style={CONTAINER}>
      <Text tx={props.tx} style={ALERT_MESSAGE} />
    </View>
  )
}
