import { canvas, cv } from './Canvas.js';

export default class Player {
	constructor() {
		const image = new Image();
		image.src = '../Images/student.png'
		image.onload = () => {
			// const imageScale = 0.5
			const imageScale = 0.4
			this.image = image
			this.width = image.width * imageScale
			this.height = image.height * imageScale

			this.position = {
				x: canvas.width / 2 - this.width / 2,
				y: canvas.height - this.height - 30, // TODO: This can lead to bugs. Dont use static int. Update to canvas height
			}
		}

		// The speed of Player
		this.travel = {
			x: 0,
			y: 0
		}
		
		this.opacity = 1
	}

	draw() {
		cv.save()
		cv.globalAlpha = this.opacity
		cv.drawImage(
			this.image, 
			this.position.x, 
			this.position.y, 
			this.width, 
			this.height,
		)

		cv.restore()
	}

	update() {
		if (this.image) {
			this.draw()
			this.position.x += this.travel.x
		}
	}
}
