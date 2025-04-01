import { fromPromise } from 'xstate'
import type { AppSnapshot } from './app'

export const snapshotLoader = fromPromise<AppSnapshot | undefined>(() => {
  const data = localStorage.getItem('snapshot')
  return data ? JSON.parse(data) : undefined
})
