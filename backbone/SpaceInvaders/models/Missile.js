import { cv } from './Canvas.js';

// Implement Missles for our Player. 
export default class Missile {
    constructor({position, speed}) { // Rename: alternative name, velocity, speed, travel
        this.position = position
        this.speed = speed

        const image = new Image();
		image.src = '../Images/slap.png'
		image.onload = () => {
			// const imageScale = 0.1
            const imageScale = 0.2
			this.image = image
			this.width = image.width * imageScale
			this.height = image.height * imageScale
		}
    }

    draw() {
        // TODO: This is causeing a 
        // **Uncaught TypeError: 
        // CanvasRenderingContext2D.drawImage: 
        // Argument 1 could not be converted to any of: 
        // HTMLImageElement, SVGImageElement, HTMLCanvasElement, HTMLVideoElement, OffscreenCanvas, ImageBitmap.** 
		cv.drawImage(
			this.image, 
			this.position.x, 
			this.position.y, 
			this.width, 
			this.height,
		)
    }

    update() {
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }
}
