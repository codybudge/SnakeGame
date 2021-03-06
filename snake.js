const base = require('./base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

//Directions
const NORTH = { x: 0, y: -1 }
const SOUTH = { x: 0, y: 1 }
const EAST = { x: 1, y: 0 }
const WEST = { x: -1, y: 0 }

//Point Operations
const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y

//Booleans
const willEat = state => pointEq(nextHead(state))(state.apple)
const willCrash = state => state.snake.find(pointEq(nextHead(state)))
const validMove = move => state =>
  state.moves[0].x + move != 0 || state.moves[0].y + move.y != 0

//Next Value Based on State
const nextMoves = state => state.moves.length > 1 ? base.dropFirst(state.moves) : state.moves
const nextApple = state => willEat(state) ? rndPos(state) : state.apple
const nextHead = state => state.snake.length == 0
  ? { x: 2, y: 2 }
  : {
    x: base.mod(state.cols)(state.snake[0].x + state.moves[0].x),
    y: base.mod(state.rows)(state.snake[0].y + state.moves[0].y)
  }
const nextSnake = state => willCrash(state)
  ? []
  : (willEat(state)
    ? [nextHead(state)].concat(state.snake)
    : [nextHead(state)].concat(base.dropLast(state.snake)))

//RandomPos
const rndPos = table => ({
  x: base.rnd(0)(table.cols - 1),
  y: base.rnd(0)(table.rows - 1)
})

//Initial State
const initialState = () => ({
  cols: 20,
  rows: 14,
  moves: [EAST],
  snake: [],
  apple: { x: 16, y: 2 }
})

const next = base.spec({
  rows: base.prop('rows'),
  cols: prompt('cols'),
  moves: nextMoves,
  snake: nextSnake,
  apple: nextApple
})

const enqueue = (state, move) => validMove(move)(state)
  ? base.merge(state)({ moves: state.moves.concat([move]) })
  : state

module.exports = { EAST, NORTH, SOUTH, WEST, initialState, enqueue, next, }