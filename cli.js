const readline = require('readline');
const Snake = require('./snake')
const base =  require('./base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

//Mutable State
let State = Snake.initialState()

//Matrix State
const Matrix = {
  make: table => base.rep(base.rep('.')(table.cols))(table.rows),
  set: val =>  pos => base.adjust(pos.y)(base.adjust(pos.x)(base.k(val))),
  addSnake: state => base.pipe(...base.map(Matrix.set('X'))(state.snake)),
  addApple: state => Matrix.set('o')(state.apple),
  addCrash: state => state.snake.length == 0 ? base.map(base.map(base.k('#'))) : base.id,
  toString: xsxs => xsxs.map(xs => xs.join(' ')).join('\r\n'),
  fromState: state => base.pipe(
    Matrix.make,
    Matrix.addSnake(state),
    Matrix.addApple(state),
    Matrix.addCrash(state),
  )(state)
}

//Key Events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') process.exit()
    switch (key.name.toUpperCase()) {
      case 'W': case 'K': case 'UP': State = Snake.enqueue(State, Snake.NORTH); break
      case 'A': case 'H': case 'LEFT': State = Snake.enqueue(State, Snake.WEST); break
      case 'S': case 'J': case 'DOWN': State = Snake.enqueue(State, Snake.SOUTH); break
      case 'D': case 'L': case 'RIGHT': State = Snake.enqueue(State, Snake.EAST); break
    }
});

//Game Loop
const show = () =>  console.log('\x18c' + Matrix.toString(Matrix.fromState(State)))
const step = () => State = Snake.next(State)
//Main
setInterval(() => { step(); show() }, 80)