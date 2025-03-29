import { useCurrentCiv } from '@/machines/app'
import { capitalize } from '@/string'
import { CivIcon } from './civ-icon'

export const CurrentCiv = () => {
  const civ = useCurrentCiv()

  if (!civ) return null

  return (
    <div className="inline-flex h-[120px] w-[120px] flex-col items-center justify-center border-3 border-gray-400 shadow-2xl hover:border-gray-500">
      <CivIcon civ={civ} />
      <p>{capitalize(civ)}</p>
    </div>
  )
}
