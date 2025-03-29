import { getRandomItemFrom } from '@/array'
import { CIVS } from '@/constants'
import type { Civ } from '@/types'
import { createActorContext } from '@xstate/react'
import {
  assertEvent,
  assign,
  raise,
  setup,
  type ContextFrom,
  type EventFrom,
  type TagsFrom,
} from 'xstate'

export type AppContext = ContextFrom<typeof appMachine>
export type AppEvent = EventFrom<typeof appMachine>
export type AppTags = TagsFrom<typeof appMachine>

export type CivToggleEnabledEvent = { type: 'civ.toggle.enabled'; civ: Civ }
export type CivEnableEvent = { type: 'civ.enable'; civ: Civ }
export type CivDisableEvent = { type: 'civ.disable'; civ: Civ }
export type CivEvent = CivToggleEnabledEvent | CivEnableEvent | CivDisableEvent

export const appMachine = setup({
  types: {
    context: {} as {
      currentCiv?: Civ
      enabled: Civ[]
      played: Civ[]
    },
    events: {} as CivEvent | { type: 'randomize' },
    tags: {} as 'randomizable',
  },
  actions: {
    civToggleEnabled: raise(({ context, event }) => {
      assertEvent(event, 'civ.toggle.enabled')
      if (context.enabled.includes(event.civ)) {
        return {
          type: 'civ.disable',
          civ: event.civ,
        } as const
      }

      return {
        type: 'civ.enable',
        civ: event.civ,
      } as const
    }),
    disableCiv: assign({
      enabled: ({ context, event }) => {
        assertEvent(event, 'civ.disable')
        return context.enabled.filter((c) => c !== event.civ)
      },
    }),
    enableCiv: assign({
      enabled: ({ context, event }) => {
        assertEvent(event, 'civ.enable')
        return [...context.enabled, event.civ]
      },
    }),
    randomize: assign({
      currentCiv: ({ context }) => {
        let nextCiv

        // prevent next civ from being the same as the current civ
        do {
          nextCiv = getRandomItemFrom(context.enabled)
        } while (nextCiv === context.currentCiv)

        return nextCiv
      },
    }),
    unsetCurrentCivIfNoLongerEnabled: assign({
      currentCiv: ({ context }) => {
        if (
          !context.currentCiv ||
          !context.enabled.includes(context.currentCiv)
        )
          return undefined

        return context.currentCiv
      },
    }),
  },
  guards: {
    hasAtLeast2CivsEnabled: ({ context }) => context.enabled.length > 1,
  },
}).createMachine({
  context: {
    enabled: [...CIVS],
    played: [],
  },
  initial: 'indeterminate',
  on: {
    'civ.toggle.enabled': {
      actions: 'civToggleEnabled',
    },
    'civ.enable': {
      actions: 'enableCiv',
      target: '.indeterminate',
    },
    'civ.disable': {
      actions: ['disableCiv', 'unsetCurrentCivIfNoLongerEnabled'],
      target: '.indeterminate',
    },
  },
  states: {
    indeterminate: {
      always: [
        {
          guard: 'hasAtLeast2CivsEnabled',
          target: 'valid',
        },
        {
          target: 'invalid',
        },
      ],
    },
    valid: {
      tags: 'randomizable',
      on: {
        randomize: {
          actions: 'randomize',
        },
      },
    },
    invalid: {},
  },
})

export const {
  Provider: AppProvider,
  useActorRef: useAppActorRef,
  useSelector: useAppSelector,
} = createActorContext(appMachine)

export const useCurrentCiv = () =>
  useAppSelector((snapshot) => snapshot.context.currentCiv)

export const useEnabledCivs = () =>
  useAppSelector((snapshot) => snapshot.context.enabled)

export const usePlayedCivs = () =>
  useAppSelector((snapshot) => snapshot.context.played)

export const useIsRandomizable = () =>
  useAppSelector((snapshot) => snapshot.hasTag('randomizable'))

export const useCiv = (civ: Civ) => {
  const enabled = useEnabledCivs()
  const played = usePlayedCivs()

  return {
    isEnabled: enabled.includes(civ),
    hasBeenPlayed: played.includes(civ),
  }
}
