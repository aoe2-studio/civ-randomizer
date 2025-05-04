import { CIV_ICONS_PATH, CIVS } from '@/constants'
import { capitalize } from '@/string'
import type { Civ } from '@/types'
import fs from 'node:fs/promises'
import path from 'node:path'
import { format } from 'prettier'

interface CivData {
  readonly id: string
  readonly name: string
  readonly icon: string
}

const HEADER = `
  import type { Civ } from '@/types'

  export interface CivData {
    readonly id: Civ
    readonly name: string
    readonly icon: string
  }
`

const OUT_PATH = path.join(__dirname, '../src/civ-data.ts')

main()

async function main() {
  const civData = CIVS.map((civ) => civToEntry(civ)).join('\n')
  const content = await format(
    `
    ${HEADER}

    export const civData: Record<Civ, CivData> = {
      ${civData}
    }
  `,
    {
      parser: 'typescript',
    },
  )

  await fs.writeFile(OUT_PATH, content, 'utf8')
}

function civToEntry(civ: Civ): string {
  const data = civToCivData(civ)
  return `${civ}: ${JSON.stringify(data, null, 2)},`
}

function civToCivData(civ: Civ): CivData {
  return {
    id: civ,
    name:
      civ === 'mayans' ? 'Maya'
      : civ === 'incas' ? 'Inca'
      : capitalize(civ),
    icon: `${CIV_ICONS_PATH}/${civ}.png`,
  }
}
