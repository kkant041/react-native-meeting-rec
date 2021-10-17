import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const RecordModel = types
  .model("Record")
  .props({
    id: types.identifier,
    title: types.string,
    start: types.maybe(types.number),
    end: types.maybe(types.number),
    uri: types.string,
    highlights: types.array(types.number),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type RecordType = Instance<typeof RecordModel>
export interface Record extends RecordType {}
type RecordSnapshotType = SnapshotOut<typeof RecordModel>
export interface RecordSnapshot extends RecordSnapshotType {}
export const createRecordDefaultModel = () => types.optional(RecordModel, {})
