import { cv } from './Canvas.js';
import InvaderMissile from './InvaderMissile.js';

// Invader, includes invader image, size, speed, push, and shoot.
export default class Invaders {
	constructor({ position }) {
        // Invaders Image and image dimension
		const image = new Image();
		image.src = '../Images/Professor.png'
		image.onload = () => {
			const imageScale = 0.2
			this.image = image
			this.width = image.width * imageScale
			this.height = image.height * imageScale

			this.position = {
				x: position.x,
				y: position.y
			}
		}

		this.travel = {
			x: 0,
			y: 0
		}
	}

	draw() {
		cv.drawImage(
			this.image, 
			this.position.x, 
			this.position.y, 
			this.width, 
			this.height,
		)
	}

	update( {travel}) {
		if (this.image) {
			this.draw()
			this.position.x += travel.x
            this.position.y += travel.y

		}
	}

	shoot(invaderMissiles) {
        invaderMissiles.push(new InvaderMissile({
            position: {
				x: this.position.x + this.width / 2,
				y: this.position.y + this.height
			},
			speed: {
				x: 0,
				y: 5
			}
        }))
    }
}
