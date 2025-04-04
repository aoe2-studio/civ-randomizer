import { useCiv, useCurrentCiv } from '@/actors/app'
import { capitalize } from '@/string'
import type { Civ } from '@/types'
import { AnimatePresence, motion } from 'motion/react'
import { CivIcon } from './civ-icon'
import { PlayedCheck } from './played-check'

const CurrentCivInner = ({ civ }: { civ: Civ }) => {
  const { hasBeenPlayed, togglePlayed } = useCiv(civ)

  return (
    <motion.button
      onClick={togglePlayed}
      className="current-civ invert-color not-prose relative select-none"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={civ}
          className="content"
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: -400 }}
          transition={{
            type: 'spring',
            visualDuration: 0.25,
            bounce: 0.15,
          }}
        >
          <div className="relative">
            <PlayedCheck show={hasBeenPlayed} />
            <CivIcon civ={civ} size="lg" />
          </div>
          <p>{capitalize(civ)}</p>
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

export const CurrentCiv = () => {
  const civ = useCurrentCiv()
  return civ ? <CurrentCivInner civ={civ} /> : null
}
