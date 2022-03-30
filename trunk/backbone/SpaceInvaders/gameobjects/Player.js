class Player {
	constructor() {

		const image = new Image();
		image.src = '../Images/player.png //placeholder, file path and image will change
		image.onload = () => {
			this.image = image;
			this.width = image.width;
			this.height = image.height;

			// TODO: Update position using canvas dimensions
			// Set player start point to bottom mid
			this.position = {
				x: 0, 
				y: 0,
			}
		}
		
		// TODO: Update position using canvas. 
		// Set player start point to bottom mid 
		this.position = {
			x: 0,
			y: 0,
		}

		this.velocity = {
			x: 0,
			y: 0,
		}

		this.playerImage = playerImage;
		this.width = 100;
		this.height = 100;
	}
}
