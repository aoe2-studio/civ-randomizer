import { EventObject, fromCallback, type AnyActorRef } from 'xstate'

export const snapshotSaver = fromCallback<EventObject, AnyActorRef>(
  ({ input }) => {
    const snapshot = input.getPersistedSnapshot()
    localStorage.setItem('snapshot', JSON.stringify(snapshot))
  },
)
