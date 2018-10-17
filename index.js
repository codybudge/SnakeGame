const Snake = require('./snake')
const base = require ('./base')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

//Mutable State
let state = initialState()

//Position Helpers
const x = c => Math.round(c * canvas.width / state.cols)
const y = r => Math.round(r * canvas.height / state.rows)

//Game Loop Draw
const draw = () => {
  //clear
  ctx.fillStyle = '#232323'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  //Draw Snake
  ctx.fillStyle = 'rgb(0,200,50)'
  state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))

  //Draw Apples
  ctx.fillStyle = 'rgb(255, 50, 0)'
  ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))

  //Add Crash 
  if (state.snake.length == 0) {
    ctx.fillStyle = 'rgb(255, 0, 0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

//Game Loop Update
const step = t1 => t2 => {
  if (t2 - t1 > 100) {
    state = next(state)
    draw()
    window.requestAnimationFrame(step(t2))
  } else {
    window.requestAnimationFrame(step(t1))
  }
}

//Key Events
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'h': case 'ArrowUp': state = Snake.enqueue(state, Snake.NORTH); break
    case 'a': case 'j': case 'ArrowLeft': state = Snake.enqueue(state, Snake.WEST); break
    case 's': case 'k': case 'ArrowDown': state = Snake.enqueue(state, Snake.SOUTH); break
    case 'd': case 'l': case 'ArrowRight': state = Snake.enqueue(state, Snake.EAST); break
  }
})

//Main
draw(); window.requestAnimationFrame(step(0))