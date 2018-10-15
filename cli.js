const readLine = require('readline');
const Snake = require('./snake')
const base =  require('./base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])
