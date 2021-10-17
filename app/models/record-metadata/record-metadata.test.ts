import { RecordMetadataModel } from "./record-metadata"

test("can be created", () => {
  const instance = RecordMetadataModel.create({})

  expect(instance).toBeTruthy()
})
