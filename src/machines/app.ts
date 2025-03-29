import { getRandomItemFrom } from '@/array'
import { CIVS } from '@/constants'
import type { Civ } from '@/types'
import { createActorContext } from '@xstate/react'
import { useCallback } from 'react'
import {
  assertEvent,
  assign,
  setup,
  type ContextFrom,
  type EventFrom,
  type TagsFrom,
} from 'xstate'

export type AppContext = ContextFrom<typeof appMachine>
export type AppEvent = EventFrom<typeof appMachine>
export type AppTags = TagsFrom<typeof appMachine>

export type CivEnableEvent = { type: 'civ.enable'; civ: Civ }
export type CivDisableEvent = { type: 'civ.disable'; civ: Civ }
export type CivPlayEvent = { type: 'civ.play'; civ: Civ }
export type CivUnplayEvent = { type: 'civ.unplay'; civ: Civ }
export type CivEvent =
  | CivEnableEvent
  | CivDisableEvent
  | CivPlayEvent
  | CivUnplayEvent

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
    disableCiv: assign({
      enabled: ({ context, event }) => {
        assertEvent(event, 'civ.disable')
        return context.enabled.filter((civ) => civ !== event.civ)
      },
    }),
    enableCiv: assign({
      enabled: ({ context, event }) => {
        assertEvent(event, 'civ.enable')
        return [...context.enabled, event.civ].sort()
      },
    }),
    playCiv: assign({
      played: ({ context, event }) => {
        assertEvent(event, 'civ.play')
        return [...context.played, event.civ]
      },
    }),
    randomize: assign({
      currentCiv: ({ context }) => {
        const unplayedCivs = context.enabled.filter(
          (civ) => !context.played.includes(civ),
        )

        // prevent next civ from being the same as the current civ
        let nextCiv
        do {
          nextCiv = getRandomItemFrom(unplayedCivs)
        } while (nextCiv === context.currentCiv)

        return nextCiv
      },
    }),
    resetPlayedCivs: assign({
      played: () => [],
    }),
    unplayCiv: assign({
      played: ({ context, event }) => {
        assertEvent(event, 'civ.unplay')
        return context.played.filter((civ) => civ !== event.civ)
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
    allCivsPlayed: ({ context }) => {
      const remainingCivs = context.enabled.filter(
        (civ) => !context.played.includes(civ),
      )
      return remainingCivs.length === 0
    },
    hasAtLeast2CivsEnabled: ({ context }) => context.enabled.length > 1,
  },
}).createMachine({
  context: {
    enabled: [...CIVS],
    played: [],
  },
  initial: 'indeterminate',
  on: {
    'civ.enable': {
      actions: 'enableCiv',
      target: '.indeterminate',
    },
    'civ.disable': {
      actions: ['disableCiv', 'unsetCurrentCivIfNoLongerEnabled'],
      target: '.indeterminate',
    },
    'civ.play': {
      actions: 'playCiv',
    },
    'civ.unplay': {
      actions: 'unplayCiv',
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
        randomize: [
          {
            guard: 'allCivsPlayed',
            actions: ['resetPlayedCivs', 'randomize'],
          },
          {
            actions: 'randomize',
          },
        ],
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

export const useCiv = (
  civ: Civ,
): {
  isEnabled: boolean
  hasBeenPlayed: boolean
  toggleEnabled: () => void
  togglePlayed: () => void
} => {
  const app = useAppActorRef()
  const isEnabled = useEnabledCivs().includes(civ)
  const hasBeenPlayed = usePlayedCivs().includes(civ)

  const toggleEnabled = useCallback(() => {
    app.send(
      isEnabled ? { type: 'civ.disable', civ } : { type: 'civ.enable', civ },
    )
  }, [app, civ, isEnabled])

  const togglePlayed = useCallback(() => {
    app.send(
      hasBeenPlayed ? { type: 'civ.unplay', civ } : { type: 'civ.play', civ },
    )
  }, [app, civ, hasBeenPlayed])

  return {
    isEnabled,
    hasBeenPlayed,
    toggleEnabled,
    togglePlayed,
  }
}
