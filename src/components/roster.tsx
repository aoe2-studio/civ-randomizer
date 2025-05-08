'use client'

import { useCiv, useEnabledCivs } from '@/actors/app'
import type { Civ } from '@/types'
import { AnimatePresence, motion } from 'motion/react'
import { CivIcon } from './civ-icon'
import { PlayedCheck } from './played-check'

const RosterItem = ({ civ }: { civ: Civ }) => {
  const { hasBeenPlayed, togglePlayed } = useCiv(civ)
  const animate = hasBeenPlayed ? ['visible', 'played'] : ['visible']

  return (
    <motion.li
      key={civ}
      className="relative cursor-pointer"
      layout="position"
      animate={animate}
      variants={{
        hidden: {
          opacity: 0,
          scale: 0,
        },
        visible: {
          opacity: 1,
          scale: 1,
        },
        played: { opacity: 0.9, scale: 0.9 },
        hovered: { scale: 1.1 },
      }}
      transition={{
        ease: 'easeOut',
        layout: {
          type: 'spring',
          visualDuration: 0.2,
          bounce: 0.2,
        },
      }}
      initial="hidden"
      exit="hidden"
      whileHover="hovered"
      onClick={togglePlayed}
    >
      <PlayedCheck show={hasBeenPlayed} />
      <CivIcon civ={civ} />
    </motion.li>
  )
}

export const Roster = () => {
  const enabledCivs = useEnabledCivs()

  return (
    <motion.ul
      layout
      className="not-prose flex min-w-[100%] flex-wrap gap-1 gap-y-2 select-none"
    >
      <AnimatePresence>
        {enabledCivs.map((civ) => (
          <RosterItem key={civ} civ={civ} />
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}
