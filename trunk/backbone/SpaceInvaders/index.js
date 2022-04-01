import Player from "./gameobjects/Player.js"
import Missile from "./gameobjects/Missile.js"

// canvas is used in multiples files. Follow DRY
// TODO: create nodes or package files to import canvas
const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const player = new Player()
const missiles = []

// Maybe do two player mode if we have time?
// TODO: Move to utils folder
const keys = {
    ArrowLeft: {pressed: false},
    ArrowRight: {pressed: false},
    a: {pressed: false},
    d: {pressed: false},
    space: {pressed: false}
}

// TODO: Move to Player.js
// animate() takes care of all animation that goes on in SpaceInvaders game.
function animate() {
	requestAnimationFrame(animate)
    c.fillStyle = 'black'
	c.fillRect(0,0, canvas.width, canvas.height) // Temporary background
	player.update()
    
    var moveLeft = keys.a.pressed || keys.ArrowLeft.pressed
    var moveRight = keys.d.pressed || keys.ArrowRight.pressed

    shoot()

    if (moveLeft && player.position.x >= 0) {
        player.travel.x = -5
    }else if (moveRight && player.position.x + player.width <= canvas.width) {
        player.travel.x = 5
    }else {
        player.travel.x = 0
    }
}

// TODO: Move to Player.js
function shoot() {
    missiles.forEach((missile) => { // see line 59
        missile.update()
    })
}

animate()

// Registers user key stroke. Validkeys as a, d, left arrow, right arrow
addEventListener('keydown', ({key}) => {
    switch (key) {
        case 'a': 
            keys.a.pressed = true
            break
        case 'd': 
            keys.d.pressed = true
            break
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight': 
            keys.ArrowRight.pressed = true
            break
        case ' ': 
            // TODO: This pushes new missles obj to missiles array. This will clog up array and slow down performance. Fix
            missiles.push(new Missile({
                position: {x: player.position.x + player.width / 2, y: player.position.y}, speed: {x: 0, y:-10}
            }))
            break
    }
})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'a': 
            keys.a.pressed = false
            break
        case 'd': 
            keys.d.pressed = false
            break
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight': 
            keys.ArrowRight.pressed = false
            break
        case ' ': // cancel shoot. TODO: Implement
            break
    }
})
