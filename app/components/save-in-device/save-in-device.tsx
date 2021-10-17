import RNFetchBlob from "rn-fetch-blob"
import Share from "react-native-share"
import RNFS from "react-native-fs"
import { Alert, Platform } from "react-native"

const SaveInDevice = (url: string) => {
  const dirs = RNFetchBlob.fs.dirs
  try {
    if (Platform.OS === "android") {
      const configOptions = { fileCache: true }
      RNFetchBlob.config(configOptions)
        .fetch("GET", url)
        .then((resp) => {
          return resp.readFile("base64")
        })
        .then(async (base64Data) => {
          base64Data = `data:application/pdf;base64,` + base64Data
          await Share.open({ url: base64Data })
          // remove the image or pdf from device's storage
          await RNFS.unlink(filePath)
        })
    } else {
      RNFetchBlob.config({
        fileCache: true,
        path: dirs.DocumentDir + `/${itemPDF.fileName}`,
      })
        .fetch("GET", url, {
          Authorization: "",
          "Content-Type": "", // 'application/octet-stream'
        })
        .then(async (res) => {
          // the temp file path
          if (res && res.path()) {
            const filePath = res.path()
            let options = {
              type: "application/pdf",
              url: filePath,
            }
            await Share.open(options)
            await RNFS.unlink(filePath)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  } catch (error) {
    console.log("download: ", error)
  }
}
