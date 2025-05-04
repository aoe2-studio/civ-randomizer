import { useCiv, useCurrentCiv } from '@/actors/app'
import { civData } from '@/civ-data'
import type { Civ } from '@/types'
import { AnimatePresence, motion } from 'motion/react'
import { CivIcon } from './civ-icon'
import { PlayedCheck } from './played-check'

const CurrentCivInner = ({ civ }: { civ: Civ }) => {
  const { name } = civData[civ]
  const { hasBeenPlayed, togglePlayed } = useCiv(civ)

  return (
    <motion.div
      onClick={togglePlayed}
      className="not-prose relative inline-flex h-[200px] w-[200px] cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden border-3 border-gray-400 text-2xl shadow-2xl select-none hover:border-gray-500"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={civ}
          className="absolute flex h-full w-full flex-col items-center justify-center gap-2"
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: -400 }}
          transition={{
            type: 'spring',
            visualDuration: 0.25,
            bounce: 0.15,
          }}
        >
          <div className="relative cursor-pointer select-none">
            <PlayedCheck show={hasBeenPlayed} />
            <CivIcon civ={civ} size="lg" />
          </div>
          <p>{name}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export const CurrentCiv = () => {
  const civ = useCurrentCiv()
  return civ ? <CurrentCivInner civ={civ} /> : null
}
