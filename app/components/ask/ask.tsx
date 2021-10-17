import * as React from "react"
import { Dimensions, Modal, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Text } from ".."
import { TxKeyPath } from "../../i18n"
import { color } from "../../theme"

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

const MODAL_CONT: ViewStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.8)",
  justifyContent: "center",
  alignItems: "center",
}
const MODAL_CONT_TOUCH: ViewStyle = {
  height: windowHeight,
  width: windowWidth,
}
const MODAL_INNER_CONT: ViewStyle = {
  position: "absolute",
  elevation: 9,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 1, height: 1 },
  shadowRadius: 3,
  backgroundColor: color.primary,
  top: "36%",
  width: "92%",
  borderRadius: 10,
  overflow: "hidden",
}
const SEC0: ViewStyle = { alignItems: "center", paddingVertical: 10 }
const SEC1: ViewStyle = {
  alignItems: "center",
  paddingTop: 12,
  paddingBottom: 20,
  paddingHorizontal: 8,
}
const SEC2: ViewStyle = {
  borderTopColor: "#000",
  flexDirection: "row",
}
const HEADING: TextStyle = { fontSize: 18, fontWeight: "500" }
const TITLE: TextStyle = {}
const SEC2BUTTON0: ViewStyle = { flex: 1, alignItems: "center", paddingVertical: 10 }
const SEC2BUTTON1: ViewStyle = { flex: 1, alignItems: "center", paddingVertical: 10 }

interface AskProps {
  cusKey: string
  showAsk: string
  heading: TxKeyPath
  title: TxKeyPath
  cancel: TxKeyPath
  go: TxKeyPath
  onCancel(): void
  sure(): void
}

export function Ask(props: AskProps) {
  return (
    <Modal animationType="fade" transparent={true} visible={props.cusKey === props.showAsk}>
      <View style={MODAL_CONT}>
        <TouchableOpacity style={MODAL_CONT_TOUCH} onPress={props.onCancel} />
        <View style={MODAL_INNER_CONT}>
          <View style={SEC0}>
            <Text style={HEADING} tx={props.heading} />
          </View>
          <View style={SEC1}>
            <Text style={TITLE} tx={props.title} />
          </View>
          <View style={SEC2}>
            <TouchableOpacity style={SEC2BUTTON0} onPress={props.onCancel}>
              <Text tx={props.cancel} />
            </TouchableOpacity>
            <TouchableOpacity style={SEC2BUTTON1} onPress={props.sure}>
              <Text tx={props.go} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
