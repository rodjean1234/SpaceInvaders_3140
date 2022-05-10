// Importing using ES6 Module
import Player from "../models/Player.js"
import Missile from "../models/Missile.js"
import Grid from "../models/Grid.js"
import Particle from "../models/Particle.js";

import { canvas, cv } from '../models/Canvas.js';

const scoreElement = document.querySelector("#scoreElement")

// Player
const player = new Player()

// Lists
const missiles = []
const grids = []
const invaderMissiles = []
const particles = []

// Maybe do two player mode if we have time?
// TODO: Move to utils folder
const keys = {
    ArrowLeft: {pressed: false},
    ArrowRight: {pressed: false},
    a: {pressed: false},
    d: {pressed: false},
    space: {pressed: false}
}

// Moving stars giviing the moving effect.
for(let i = 0; i < 100; i++) {
    particles.push(new Particle({
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        }, 
        speed: {
            x: 0,
            y: 0.4,
        },
        radius: Math.random() * 2,
        color: 'white'
    }))
}

// frames necessary too calculate when invaders should spawn and shoot
let frames = 0;
let randInterval = Math.floor(Math.random() * 500 + 500);

// Game status
let game = {
    over: false,
    active: true,
}

// Score count
let score = 0

// Creating the spash particle for ememy hit
function createParticles({object, color, fades}) {
    for(let i = 0; i < 20; i++) {
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            }, 
            speed: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
            },
            radius: Math.random() * 3,
            color: color,
            fades
        }))
    }
}
let playerScream = () => new Audio("../Images/ouch.mp3").play()

// TODO: Move to Player.js
// animate() takes care of all animation that goes on in SpaceInvaders game.
function animate() {    
    // if the game is not active do not animate
    if(!game.active) return

	requestAnimationFrame(animate)

    const base_image = new Image();
    base_image.src = '../Images/Background_space_less_stars.png';
    base_image.onload = () => {
        cv.drawImage(base_image, 0, 0, canvas.width, canvas.height)
    }

	player.update()

    particles.forEach((particle, i)=> {
        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width
            particle.position.y = -particle.radius

        }
    })

    //rendering particles animation and fade
    particles.forEach((particle, index) => {
        if (particle.opacity <= 0){
            setTimeout(() => {
                particles.splice(index, 1)
            }, 0)
        }else {
            particle.update()
  
        }
    })
    
    invaderMissiles.forEach((invaderMissile, index) => {
        // Garbage removal to imporve performance. Removes item when missle is off the screen
        if (invaderMissile.position.y + invaderMissile.height >= canvas.height) {
            setTimeout(() => {
                invaderMissiles.splice(index,1)
            }, 0)
        }else {
            invaderMissile.update()
        }

        //missile hit player
        if (
            // TODO: line-too-long, break out to vars for better clarity. Could use collides(invaderMissile, player) and it works but causes alot of weird errors
            invaderMissile.position.y + invaderMissile.height >= player.position.y &&
            invaderMissile.position.x + invaderMissile.width >= player.position.x &&
            invaderMissile.position.x <= player.position.x + player.width
        ){
            // Moved gameOver to a function since it will be called in other places too
            gameOver();

        }
    })
    
    // Set valid keyboard input
    var moveLeft = keys.a.pressed || keys.ArrowLeft.pressed
    var moveRight = keys.d.pressed || keys.ArrowRight.pressed

    shoot()
    
    grids.forEach((grid) => {
        grid.update();

        // Random invaders on grid shoots after every 100 frames.
        if(frames % 100 === 0 && grid.invaders.length> 0){
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderMissiles)
        }

        // Invader movement
        grid.invaders.forEach((invader, i) => {
            invader.update({travel: grid.travel});

            // If invader runs into player, game over
            if(collides(invader, player)) {
                gameOver();
            }

            // Missile and invader collision
            missiles.forEach((missile, j) => {
                if(collides(invader, missile)) {
                    score +=100
                    scoreElement.innerHTML = score
                    createParticles({
                        object: invader,
                        color: 'red',
                        fades: true
                    })
                    grid.invaders.splice(i, 1)
                    missiles.splice(j, 1)
                }
            })
        })
    })

    // Player move animation and speed of movement
    if (moveLeft && player.position.x >= 0) {
        player.travel.x = -5
    }else if (moveRight && player.position.x + player.width <= canvas.width) {
        player.travel.x = 5
    }else {
        player.travel.x = 0
    }

    // Spawn a new grid of invader after a random interval of frames
    if (frames % randInterval === 0) {
        grids.push(new Grid())
        randInterval = Math.floor(Math.random() * 500 + 500);
        frames = 0
    }

    frames++

}

// TODO: Move to Player.js
function shoot() {
    missiles.forEach((missile, index) => {
        // Garbade removal (Performance): Remove missile obj from array when it's off the screen
        if (missile.position.y + missile.image.height <= 0){
            setTimeout(() => {
                missiles.splice(index,1)
            }, 0)
            missiles.splice(index, 1)
        }else{
            missile.update()
        }
    })
}

// start game when start button is clicked
document.getElementById('start').addEventListener('click', () => {
    setTimeout(() => {
        animate()
    }, 0)
});

let shootSound = () => new Audio("../Images/shoot_sound.mp3").play()

// Registers user key stroke. Valid keys are 'a', 'd', 'left arrow', 'right arrow'
addEventListener('keydown', ({key}) => {
    if (game.over) return

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
            missiles.push(new Missile({
                position: {x: player.position.x + player.width / 2, y: player.position.y}, speed: {x: 0, y:-10}
            }))
            shootSound()
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

//TODO: This does not belong here. Move to Player.js
function collides(a, b)
{
    if (a.position.x < b.position.x + b.width &&
        a.position.x + a.width > b.position.x &&
        a.position.y < b.position.y + b.height &&
        a.position.y + a.height > b.position.y) return true;

}
function gameOver() {
    playerScream();
            setTimeout(() => {
                invaderMissiles.splice(index,1)
                player.opacity = 0,
                game.over = true
            }, 0)

            // NOTE: We do NOT want to stop the game right after user is hit. 
            // For better UX stop game after 2 seconds after user is hit
            setTimeout(() => {
                game.active = false
            }, 2000)
            
            createParticles({
                object: player,
                color: 'white',
                fades: true,
            })

            let over_screen = document.getElementById('gameover-screen')
            over_screen.style.display = 'block'
            let canvas = document.getElementById('canvas')
            canvas.style.display = 'none'
            game.over = true
}