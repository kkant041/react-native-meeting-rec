import * as React from "react"
import { View, ViewStyle } from "react-native"

const LINE_BREAK: ViewStyle = {
  height: 0.6,
  backgroundColor: "#999",
}

export interface LineBreakProps {
  style?: ViewStyle
}

export function LineBreak(props: LineBreakProps) {
  const viewStyle = [LINE_BREAK, props.style]

  return <View style={viewStyle} />
}
