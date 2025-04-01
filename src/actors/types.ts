import type { AppContext } from './app'

export type DataLoadedEvent = { type: 'data.loaded'; data?: AppContext }
export type SyncEvent = { type: 'sync'; data: AppContext }
