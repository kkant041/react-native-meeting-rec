import React, { FC } from "react"
import { View, ViewStyle, TextStyle, Modal, Dimensions, Animated } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, AutoImage as Image, LineBreak } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import Ionicons from "react-native-vector-icons/Ionicons"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { ShowRecordedAudio } from "./components/show-recorded-audio"
import { NewRecordingForm } from "./components/new-recording-form"
import { Message } from "../../components/message/message"
import { useStores } from "../../models"

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.primaryDarker,
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
const ADD_ICON_CONT: ViewStyle = { position: "absolute", right: 10, zIndex: 1 }
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
  backgroundColor: "#000",
  top: "36%",
}
const ALERT_CONT: ViewStyle = {
  position: "absolute",
  top: 100,
  alignSelf: "center",
}
const ADD_MESSAGE_CONT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: windowHeight / 5,
}
const ADD_MESSAGE_TEXT: TextStyle = {
  color: color.dim,
}

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {
    const [showAddNewRecordForm, setShowAddNewRecordForm] = React.useState<boolean>(false)
    // Show alert if new title not entered
    const [showEmptyAlert, setShowEmptyAlert] = React.useState<boolean>(false)

    const rootStore = useStores()

    const records = rootStore.recordStore.listRecords()

    // Initiate show alert for empty title
    const showEmptyAlertFunc = () => {
      setShowEmptyAlert(true)
      setTimeout(() => {
        setShowEmptyAlert(false)
      }, 3000)
    }

    // Function to go to new recording screen

    return (
      <View testID="HomeScreen" style={FULL}>
        <Screen style={CONTAINER} preset="fixed">
          {/* <View style={ADD_ICON_CONT}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
          </View> */}
          <Header
            headerTx="homeScreen.title"
            style={HEADER}
            titleStyle={HEADER_TITLE}
            rightIcon={<Ionicons name="add" size={30} color="#fff" />}
            onRightPress={() => {
              setShowAddNewRecordForm(true)
            }}
          />

          {records.length === 0 ? (
            <View style={ADD_MESSAGE_CONT}>
              <Text style={ADD_MESSAGE_TEXT} tx="homeScreen.addRec" />
            </View>
          ) : (
            <FlatList
              data={records}
              renderItem={({ item, index }) => {
                return <ShowRecordedAudio key={item.id} record={item} />
              }}
            />
          )}
        </Screen>
        <Modal animationType="fade" transparent={true} visible={showAddNewRecordForm}>
          <View style={MODAL_CONT}>
            <TouchableOpacity
              style={MODAL_CONT_TOUCH}
              onPress={() => {
                setShowAddNewRecordForm(false)
              }}
            />
            <View style={MODAL_INNER_CONT}>
              <NewRecordingForm
                closeForm={() => setShowAddNewRecordForm(false)}
                showEmptyAlertFunc={showEmptyAlertFunc}
              />
            </View>
          </View>
          {showEmptyAlert && (
            <View style={ALERT_CONT}>
              <Message tx="homeScreen.emptyAlert" />
            </View>
          )}
        </Modal>
      </View>
    )
  },
)
