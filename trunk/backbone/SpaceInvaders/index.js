import Player from "./gameobjects/Player.js"
import { canvas, c } from "../models/Canvas.js"

const player = new Player()

// Maybe do two player mode if we have time?
const keys = {
    a: {pressed: false},
    d: {pressed: false},
    ArrowLeft: {pressed: false},
    ArrowRight: {pressed: false},
    space: {pressed: false}
}

function move() {
	requestAnimationFrame(move)
	c.fillRect(0,0, canvas.width, canvas.height) // Temporary background
	player.update()
    
    var moveLeft = keys.a.pressed || keys.ArrowLeft.pressed
    var moveRight = keys.d.pressed || keys.ArrowRight.pressed

    if (moveLeft && player.position.x >= 0) {
        player.travel.x = -5
    }else if (moveRight && player.position.x + player.width <= canvas.width) {
        player.travel.x = 5
    }else {
        player.travel.x = 0
    }
}

move()

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
        case ' ': // shoot TODO: Implement
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
