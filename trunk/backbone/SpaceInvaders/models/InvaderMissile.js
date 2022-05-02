import { cv } from './Canvas.js';

// Implement Missles for our Player. 
export default class Missile {
    constructor({position, speed}) { // Rename: alternative name, velocity, speed, travel
        this.position = position
        this.speed = speed

        this.width= 3
        this.height = 10
        
        
    }

    draw() {
        cv.fillStyle = 'white'
        cv.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }
}
