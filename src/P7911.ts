import { readFileSync } from 'fs'
import { resolve } from 'path'
import { URL } from 'url'

const name = process.env.NODE_ENV == 'development' ? resolve(__dirname, './P7911.in') : '/dev/stdin'

const data = readFileSync(name)
    .toString('ascii')
    .split('\r')
    .join('\n')
    .split('\n')
    .filter((val) => val !== '')

type status = number | 'ERR' | 'OK' | 'FAIL'

let servers: any = {}

let servants: string[] = []

for (let i = 1; i in data; i++) {
    const typical = data[i].split(' ')[0]
    const address = data[i].split(' ')[1]
    try {
        if (address.split('.').length !== 4 || address.split(':').length !== 2) {
            console.log('ERR')
            continue
        }
    } catch (_e) {
        console.log('ERR')
        continue
    }
    try {
        new URL('http://' + address)
    } catch (_e) {
        console.log('ERR')
        continue
    }
    const addressconf = {
        a: parseInt(address.split('.')[0]),
        b: parseInt(address.split('.')[1]),
        c: parseInt(address.split('.')[2]),
        d: parseInt(address.split('.')[3].split(':')[0]),
        e: parseInt(address.split('.')[3].split(':')[1]),
    }
    try {
        if (
            (address.split('.')[0] !== '0' && address.split('.')[0].split('')[0] == '0') ||
            isNaN(addressconf.a) ||
            addressconf.a > 255 ||
            (address.split('.')[1] !== '0' && address.split('.')[1].split('')[0] == '0') ||
            isNaN(addressconf.b) ||
            addressconf.b > 255 ||
            (address.split('.')[2] !== '0' && address.split('.')[2].split('')[0] == '0') ||
            isNaN(addressconf.c) ||
            addressconf.c > 255 ||
            (address.split('.')[3].split(':')[0] !== '0' && address.split('.')[3].split(':')[0].split('')[0] == '0') ||
            isNaN(addressconf.d) ||
            addressconf.d > 255 ||
            (address.split('.')[3].split(':')[1] !== '0' && address.split('.')[3].split(':')[1].split('')[0] == '0') ||
            isNaN(addressconf.e) ||
            addressconf.e > 65535
        ) {
            console.log('ERR')
            continue
        }
    } catch (_e) {
        console.log('ERR')
        continue
    }
    if (servants.includes(address)) {
        if (typical == 'Client') {
            if (servers[address] == undefined) {
                console.log('FAIL')
            } else {
                console.log(servers[address])
            }
        } else {
            console.log('FAIL')
        }
    } else {
        if (typical == 'Client') {
            console.log('FAIL')
        } else {
            servants.push(address)
            servers[address] = i
            console.log('OK')
        }
    }
}
