const adjust = n => f => xs => mapi(x => i => i == n ? f(x) : x)(xs)
const dropFirst = xs => xs.slice(1)
const dropLast = xs => xs.slice(0, xs.length - 1)
const id = x => x
const k = x => y => x
const map = f => xs => xs.map(f)
const mapi = f => xs => xs.map((x, i) => f(x)(i))
const merge = o1 => o2 => Object.assign({}, o1, o2)
const mod = x => y => ((y % x) + x) % x //http://bit.ly/2oF4mQ7
const objOf = k => v => {var o = {}; o[k] = v; return o}
const pipe = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x)
const prop = k => o => o[k]
