import { AnimatePresence, motion } from 'motion/react'

export const PlayedCheck = ({ show }: { show: boolean }) => {
  return (
    <AnimatePresence>
      {show ?
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={{
            hidden: { opacity: 0, scale: 3 },
            played: { opacity: 1, scale: 1 },
          }}
          transition={{
            ease: 'easeOut',
            visualDuration: 0.2,
          }}
          initial="hidden"
          animate="played"
          exit="hidden"
        >
          ✅
        </motion.div>
      : null}
    </AnimatePresence>
  )
}
