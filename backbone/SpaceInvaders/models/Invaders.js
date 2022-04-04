import { cv } from './Canvas.js';

export default class Invaders {
	constructor({ position }) {
        // Invaders Image and image dimension
		const image = new Image();
		image.src = '../Images/chris_rock.jpeg'
		image.onload = () => {
			const imageScale = 0.1
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
}
