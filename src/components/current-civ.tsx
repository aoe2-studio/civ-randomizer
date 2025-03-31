import { useCiv, useCurrentCiv } from '@/machines/app'
import { capitalize } from '@/string'
import type { Civ } from '@/types'
import { AnimatePresence, motion } from 'motion/react'
import { CivIcon } from './civ-icon'

const CurrentCivInner = ({ civ }: { civ: Civ }) => {
  const { hasBeenPlayed, togglePlayed } = useCiv(civ)

  return (
    <div
      onClick={togglePlayed}
      className="not-prose inline-flex h-[200px] w-[200px] flex-col items-center justify-center gap-3 border-3 border-gray-400 text-2xl shadow-2xl hover:border-gray-500"
    >
      <div className="relative">
        <AnimatePresence>
          {hasBeenPlayed ?
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={{
                hidden: { opacity: 0, scale: 3 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              ✅
            </motion.div>
          : null}
        </AnimatePresence>
        <CivIcon civ={civ} size="lg" />
      </div>
      <p>{capitalize(civ)}</p>
    </div>
  )
}

export const CurrentCiv = () => {
  const civ = useCurrentCiv()
  return civ ? <CurrentCivInner civ={civ} /> : null
}
