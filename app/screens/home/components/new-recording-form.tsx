import React from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  Text,
  TextInput,
  Animated,
  TouchableOpacity,
} from "react-native"
import { color, typography } from "../../../theme"
import { useNavigation } from "@react-navigation/core"
import { NavigatorParamList } from "../../../navigators"
import { StackNavigationProp } from "@react-navigation/stack"

const CONTAINER: ViewStyle = {
  backgroundColor: color.primary,
  borderRadius: 8,
  elevation: 9,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 1, height: 1 },
  shadowRadius: 3,
  width: "95%",
  overflow: "hidden",
  alignSelf: "center",
}
const DIV_0: ViewStyle = { alignItems: "center", backgroundColor: color.primaryDarker }
const DIV_1: ViewStyle = {
  marginTop: 15,
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 10,
}
const DIV_2: ViewStyle = { alignItems: "center", marginTop: 5, marginBottom: 3 }
const TITLE_INPUT_STYLE: TextStyle = {
  borderBottomWidth: 1,
  width: "100%",
  paddingLeft: 4,
  paddingBottom: 4,
  borderColor: "#ccc",
  color: "#fff",
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const TITLE_STYLE: TextStyle = { ...TEXT, fontSize: 17, paddingTop: 4, paddingBottom: 7 }
const START_BUTTON_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 15,
  paddingTop: 4,
  paddingBottom: 5,
  color: "rgb(10, 132, 255)",
}

interface NewRecordingFormProps {
  closeForm(): void
  showEmptyAlertFunc(): void
}

export function NewRecordingForm(props: NewRecordingFormProps) {
  // const nextScreen = () => navigation.navigate("demo")

  // Title for new record
  const [title, setTitle] = React.useState<string>("")

  const navigation = useNavigation<StackNavigationProp<NavigatorParamList, "home">>()

  // Start with larger view
  const scaleAnim = React.useRef<Animated.Value>(new Animated.Value(0.75)).current

  const scaleUp = () => {
    // Will scale down the view
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start()
  }

  const scaleDown = () => {
    // Will scale up the view
    Animated.timing(scaleAnim, {
      toValue: 0.75,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  // Initialise the scaledown
  React.useEffect(() => {
    scaleUp()
    return () => {
      scaleDown()
    }
  }, [])

  const onPressStart = () => {
    if (title) {
      navigation.navigate("recordAudio", { title })
      props.closeForm()
    } else {
      props.showEmptyAlertFunc()
    }
  }

  return (
    <Animated.View
      testID="NewRecordingFormComp"
      style={[CONTAINER, { transform: [{ scale: scaleAnim }] }]}
    >
      <View style={DIV_0}>
        <Text style={TITLE_STYLE}>New recording</Text>
      </View>
      <View style={DIV_1}>
        <TextInput
          placeholder="Please enter the title"
          placeholderTextColor="#444"
          value={title}
          onChangeText={setTitle}
          style={TITLE_INPUT_STYLE}
          autoFocus={true}
          returnKeyType="go"
          onSubmitEditing={onPressStart}
          selectionColor="rgb(10, 132, 255)"
        />
      </View>
      <View style={DIV_2}>
        <TouchableOpacity onPress={onPressStart}>
          <Text style={START_BUTTON_TEXT}>Start</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}
