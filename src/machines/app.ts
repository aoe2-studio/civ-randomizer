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
export type CivTogglePlayedEvent = { type: 'civ.toggle.played'; civ: Civ }
export type CivPlayEvent = { type: 'civ.play'; civ: Civ }
export type CivUnplayEvent = { type: 'civ.unplay'; civ: Civ }
export type CivEvent =
  | CivToggleEnabledEvent
  | CivEnableEvent
  | CivDisableEvent
  | CivTogglePlayedEvent
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
    civToggleEnabled: raise(({ context, event }) => {
      assertEvent(event, 'civ.toggle.enabled')
      return context.enabled.includes(event.civ) ?
          ({ type: 'civ.disable', civ: event.civ } as const)
        : ({ type: 'civ.enable', civ: event.civ } as const)
    }),
    civTogglePlayed: raise(({ context, event }) => {
      assertEvent(event, 'civ.toggle.played')
      return context.played.includes(event.civ) ?
          ({ type: 'civ.unplay', civ: event.civ } as const)
        : ({ type: 'civ.play', civ: event.civ } as const)
    }),
    disableCiv: assign({
      enabled: ({ context, event }) => {
        assertEvent(event, 'civ.disable')
        return context.enabled.filter((civ) => civ !== event.civ)
      },
    }),
    enableCiv: assign({
      enabled: ({ context, event }) => {
        assertEvent(event, 'civ.enable')
        return [...context.enabled, event.civ]
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
    'civ.toggle.played': {
      actions: 'civTogglePlayed',
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

export const useCiv = (civ: Civ) => {
  const enabled = useEnabledCivs()
  const played = usePlayedCivs()

  return {
    isEnabled: enabled.includes(civ),
    hasBeenPlayed: played.includes(civ),
  }
}
