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
  ctx.fillRect(0, 0. canvas.width, canvas.hieght)

  //Draw Snake
  ctx.fillStyle = 'rgb(0,200,50)'
  state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))

  //Draw Apples
  ctx.fillStyle = 'rgb(255, 50, 0)'
  ctx. fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))
}
