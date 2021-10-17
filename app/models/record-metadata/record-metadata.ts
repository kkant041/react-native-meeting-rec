import { Instance, SnapshotOut, types } from "mobx-state-tree"
import * as storage from "../../utils/storage"

/**
 * Model description here for TypeScript hints.
 */
export const RecordMetadataModel = types
  .model("RecordMetadata")
  .props({
    id: types.identifier,
    uri: types.string,
    // timestamps of highlights alternate switching, starting with highlighting timestamp
    highlights: types.array(types.number),
    duration: types.number,
  })
  .views((self) => ({
    getARecMeta: (key: string) => {
      return storage.load(key)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveRecMeta: (recordMetadata: RecordMetadataSnapshot) => {
      storage.save(recordMetadata.id, recordMetadata)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type RecordMetadataType = Instance<typeof RecordMetadataModel>
export interface RecordMetadata extends RecordMetadataType {}
type RecordMetadataSnapshotType = SnapshotOut<typeof RecordMetadataModel>
export interface RecordMetadataSnapshot extends RecordMetadataSnapshotType {}
export const createRecordMetadataDefaultModel = () => types.optional(RecordMetadataModel, {})
