import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"
import { translate } from "../../i18n/"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: 30,
  alignItems: "center",
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: "space-between",
}
const TITLE: TextStyle = {}
const TITLE_LEFT: ViewStyle = { paddingLeft: 20 }
const RIGHT: ViewStyle = { paddingRight: 10 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const { onRightPress, rightIcon, headerText, headerTx, style, titleStyle } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View style={[ROOT, style]}>
      <View style={TITLE_LEFT}>
        <Text style={[TITLE, titleStyle]} text={header} />
      </View>
      {rightIcon ? (
        <Button preset="link" onPress={onRightPress} style={RIGHT}>
          {rightIcon}
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
