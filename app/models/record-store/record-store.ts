import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Record, RecordModel } from ".."

/**
 * Model description here for TypeScript hints.
 */
export const RecordStoreModel = types
  .model("RecordStore")
  .props({
    records: types.optional(types.array(RecordModel), []),
  })
  .views((self) => ({
    listRecords: () => {
      return self.records
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveRecords: (record: Record) => {
      const newRecords = [record, ...self.records]
      self.records.replace([])
      self.records.replace(newRecords)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type RecordStoreType = Instance<typeof RecordStoreModel>
export interface RecordStore extends RecordStoreType {}
type RecordStoreSnapshotType = SnapshotOut<typeof RecordStoreModel>
export interface RecordStoreSnapshot extends RecordStoreSnapshotType {}
export const createRecordStoreDefaultModel = () => types.optional(RecordStoreModel, {})
