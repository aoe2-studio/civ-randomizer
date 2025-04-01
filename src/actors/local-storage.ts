import { sendParent, setup } from 'xstate'
import type { DataLoadedEvent, SyncEvent } from './types'

export const localStorageMachine = setup({
  types: {
    events: {} as SyncEvent,
  },
  actions: {
    loadData: sendParent(() => {
      const data = localStorage.getItem('data')
      return {
        type: 'data.loaded',
        data: data ? JSON.parse(data) : undefined,
      } satisfies DataLoadedEvent
    }),
    saveData: ({ event }) => {
      localStorage.setItem('data', JSON.stringify(event.data))
    },
  },
}).createMachine({
  id: 'local-storage',
  entry: 'loadData',
  on: {
    sync: {
      actions: 'saveData',
    },
  },
})
