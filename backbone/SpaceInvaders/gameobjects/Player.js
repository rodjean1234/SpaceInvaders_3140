const canvas = document.getElementById('gameCanvas')
const c = canvas.getContext('2D')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
	constructor() {
		const image = new Image();
		image.src = '../Images/player.png //placeholder, file path and image will change
		image.onload = () => {
			const imageScale = 0.2
			this.image = image;
			this.width = image.width * imageScale;
			this.height = image.height * imageScale;

			// TODO: Update position using canvas dimensions
			// Set player start point to bottom mid
			this.position = {
				x: canvas.width / 2  -this.width / 2, 
				y: canvas.height - this.height - 50,
			}
		}
	}

	draw() {
		if(this.image) {
			c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height,)
		}
	}
}
