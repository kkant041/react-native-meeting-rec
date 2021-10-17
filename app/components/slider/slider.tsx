/* eslint-disable react-native/no-color-literals */
import React from "react"
import { View, ViewStyle } from "react-native"

const CONTAINER: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  height: 20,
  overflow: "hidden",
}

const SLIDER_BASE: ViewStyle = { height: 1 }
const SLIDER_CONTROL: ViewStyle = {
  position: "absolute",
  height: 16,
  width: 16,
  borderRadius: 8,
  backgroundColor: "rgb(0, 122, 255)",
}

interface SliderProps {
  highlightTimeStamp: Array<number>
  startTime: number
  endTime: number
  currentPosition: number
}

export function Slider(props: SliderProps) {
  const duration = props.endTime - props.startTime
  const noOfElementsInHighlights = props.highlightTimeStamp.length

  const getNextTimeStamp = (index: number) => {
    if (index === noOfElementsInHighlights - 1) {
      return duration
    } else {
      return props.highlightTimeStamp[index + 1]
    }
  }

  return (
    <View testID="SliderComp" style={CONTAINER}>
      {props.highlightTimeStamp.map((item, index) => {
        return (
          <View
            key={index}
            style={[
              SLIDER_BASE,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                width: `${((getNextTimeStamp(index) - item) * 100) / duration}%`,
                backgroundColor: index % 2 === 0 ? "#fff" : "orange",
              },
            ]}
          />
        )
      })}
      <View style={[SLIDER_CONTROL, { left: `${(props.currentPosition * 100) / duration}%` }]} />
    </View>
  )
}
