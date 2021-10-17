const formatToTwoDigits = (givenNumber: number) => {
  if (givenNumber <= 9) {
    return `0${givenNumber}`
  }
  return givenNumber
}

export const msToDate = (time: number) => {
  const date = new Date(time)
  return date.toLocaleDateString()
}

export const getTimeDifference = (startTime: number, endTime: number) => {
  const timeDiff = Math.round((endTime - startTime) / 1000)
  if (timeDiff >= 3600) {
    return `${Math.floor(timeDiff / 3600)}:${formatToTwoDigits(
      Math.floor((timeDiff % 3600) / 60),
    )}:${formatToTwoDigits(timeDiff % 60)}`
  } else {
    return `${formatToTwoDigits(Math.floor(timeDiff / 60))}:${formatToTwoDigits(timeDiff % 60)}`
  }
}
