import { readFileSync } from 'fs'
import { resolve } from 'path'

const name = process.env.NODE_ENV == 'development' ? resolve(__dirname, './P1001.in') : '/dev/stdin'

const data = readFileSync(name)
const result = data
    .toString('ascii')
    .trim()
    .split(' ')
    .filter((item) => item !== '')
    .map((x: string) => parseInt(x))
    .reduce((a: number, b: number) => a + b, 0)
console.log(result)
process.exit()
