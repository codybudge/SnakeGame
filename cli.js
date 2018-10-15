const readLine = require('readline');
const Snake = require('./snake')
const base =  require('./base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

//Matrix State
const Matrix = {
  make: table => rep(rep('.')(table.cols))(table.rows),
  set: val =>  pos => adjust(pos.y)(adjust(pos.x)(k(val))),
  addSnake: state => pipe(...map(Matrix.set('X'))(state.snake)),
  addApple: state => Matrix.set('o')(state.apple),
  addCrash: state => state.snake.length == 0 ? map(map(k('#'))) : id,
  toString: xsxs => xsxs.map(xs => xs.join(' ')).join('\r\n'),
  fromState: state => pipe(
    Matrix.make,
    Matrix.addSnake(state),
    Matrix.addApple(state),
    Matrix.addCrash(state),
  )(state)
}
