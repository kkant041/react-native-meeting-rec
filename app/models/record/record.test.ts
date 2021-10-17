import { RecordModel } from "./record"

test("can be created", () => {
  const instance = RecordModel.create({})

  expect(instance).toBeTruthy()
})
