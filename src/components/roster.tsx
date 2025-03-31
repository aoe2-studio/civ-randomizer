import { useEnabledCivs } from '@/machines/app'
import { AnimatePresence, motion } from 'motion/react'
import { CivIcon } from './civ-icon'

export const Roster = () => {
  const enabledCivs = useEnabledCivs()

  return (
    <motion.ul
      layout
      className="not-prose flex min-w-[100%] flex-wrap gap-1 gap-y-2"
    >
      <AnimatePresence>
        {enabledCivs.map((civ) => {
          return (
            <motion.li
              key={civ}
              layout="position"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <CivIcon civ={civ} />
            </motion.li>
          )
        })}
      </AnimatePresence>
    </motion.ul>
  )
}
