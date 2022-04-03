// TODO: Use Canvas.js
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

export default class Player {
	constructor() {
		const image = new Image();
		image.src = '../Images/student.png'
		image.onload = () => {
			const imageScale = 0.5
			this.image = image
			this.width = image.width * imageScale
			this.height = image.height * imageScale

			this.position = {
				x: canvas.width / 2 - this.width / 2,
				y: canvas.height - this.height - 150, // TODO: This can lead to bugs. Dont use static int. Update to canvas height
			}
		}

		this.travel = {
			x: 0,
			y: 0
		}
	}

	draw() {
		c.drawImage(
			this.image, 
			this.position.x, 
			this.position.y, 
			this.width, 
			this.height,
		)
	}

	update() {
		if (this.image) {
			this.draw()
			this.position.x += this.travel.x
		}
	}
}
