import { readFileSync } from 'fs'
import { resolve } from 'path'

const name = process.env.NODE_ENV == 'development' ? resolve(__dirname, './P1017.in') : '/dev/stdin'

const data = readFileSync(name)
    .toString('ascii')
    .trim()
    .split(' ')
    .map((x: string) => parseInt(x))

const base = data[0]
const radix = data[1]

console.log(`${base}=${base.toString(Math.abs(radix))}(base${radix})`)
process.exit()
