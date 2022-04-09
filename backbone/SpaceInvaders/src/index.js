// Importing using ES6 Module
import Player from "../models/Player.js"
import Missile from "../models/Missile.js"
import Grid from "../models/Grid.js"

import { canvas, cv } from '../models/Canvas.js';

canvas.width = innerWidth
canvas.height = innerHeight

const player = new Player()
const missiles = []
const grids = [new Grid()]

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
    cv.fillStyle = 'black'
	cv.fillRect(0,0, canvas.width, canvas.height) // Temporary background

	player.update()
    
    var moveLeft = keys.a.pressed || keys.ArrowLeft.pressed
    var moveRight = keys.d.pressed || keys.ArrowRight.pressed

    shoot()

    grids.forEach((grid) => {
        grid.update();
        grid.invaders.forEach((invader, i) => {
            invader.update({travel: grid.travel});
            // Missile and invader collision
            missiles.forEach((missile, j) => {
                if(collides(invader, missile)) {
                    grid.invaders.splice(i, 1)
                    missiles.splice(j, 1)
                }
            })
        })
    })
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
    missiles.forEach((missile, index) => {
        // Garbade removal: Remove missile obj from array when it's off the screen
        if (missile.position.y + missile.image.height <= 0){
            missiles.splice(index, 1)
        }else{
            missile.update()
        }
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

//Stop player on keyup
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
function collides(a, b)
{
    if (a.position.x < b.position.x + b.width &&
        a.position.x + a.width > b.position.x &&
        a.position.y < b.position.y + b.height &&
        a.position.y + a.height > b.position.y) return true;

}