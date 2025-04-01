import { fromPromise } from 'xstate'
import { AppContext } from './app'

export const localStorageLoader = fromPromise<AppContext | undefined>(() => {
  const data = localStorage.getItem('data')
  return data && JSON.parse(data)
})
