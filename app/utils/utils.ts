import uuid from "react-native-uuid"

/*
 * @returns unique id
 */
export const getNewID = () => {
  return uuid.v4()
}
