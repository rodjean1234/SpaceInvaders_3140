import { cv } from './Canvas.js';

export default class Particle {
    constructor({position, speed, radius, color}) { // Rename: alternative name, velocity, speed, travel
        this.position = position
        this.speed = speed

        this.radius = radius
        this.color = color
        
        this.opacity = 1
    }

    draw() {
        cv.save()
        cv.globalAlpha = this.opacity
        cv.beginPath()
        cv.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2 )
        cv.fillStyle = this.color
        cv.fill()
        cv.closePath()
        cv.restore()
    }

    update() {
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        this.opacity -= 0.01
    }
}
