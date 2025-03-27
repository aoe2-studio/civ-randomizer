import { CIVS } from '@/constants'
import type { Civ } from '@/types'
import { createActorContext } from '@xstate/react'
import {
  assertEvent,
  assign,
  setup,
  type ContextFrom,
  type EventFrom,
} from 'xstate'

export type AppContext = ContextFrom<typeof appMachine>
export type AppEvent = EventFrom<typeof appMachine>

export const appMachine = setup({
  types: {
    context: {} as {
      enabled: Civ[]
      played: Civ[]
    },
    events: {} as { type: 'civ.toggle'; civ: Civ },
  },
  actions: {
    toggleCiv: assign({
      enabled: ({ context, event }) => {
        assertEvent(event, 'civ.toggle')

        return context.enabled.includes(event.civ) ?
            context.enabled.filter((c) => c !== event.civ)
          : [...context.enabled, event.civ].sort()
      },
    }),
  },
}).createMachine({
  context: {
    enabled: [...CIVS],
    played: [],
  },
  on: {
    'civ.toggle': {
      actions: 'toggleCiv',
    },
  },
})

export const {
  Provider: AppProvider,
  useActorRef: useAppActorRef,
  useSelector: useAppSelector,
} = createActorContext(appMachine)

export const useEnabledCivs = () =>
  useAppSelector((snapshot) => snapshot.context.enabled)

export const usePlayedCivs = () =>
  useAppSelector((snapshot) => snapshot.context.played)
