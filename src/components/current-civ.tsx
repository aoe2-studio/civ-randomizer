import { useCiv, useCurrentCiv } from '@/machines/app'
import { capitalize } from '@/string'
import type { Civ } from '@/types'
import { AnimatePresence, motion } from 'motion/react'
import { CivIcon } from './civ-icon'

const CurrentCivInner = ({ civ }: { civ: Civ }) => {
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
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          key={civ}
          className="absolute flex h-full w-full flex-col items-center justify-center gap-2"
        >
          <div className="relative cursor-pointer select-none">
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
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export const CurrentCiv = () => {
  const civ = useCurrentCiv()
  return civ ? <CurrentCivInner civ={civ} /> : null
}
