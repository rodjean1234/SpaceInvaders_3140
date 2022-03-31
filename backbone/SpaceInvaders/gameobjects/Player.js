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

		//set player lives to 3
		this.lives = 3;
		//create variable to change player position on X axis
		this.velocityX = 0;
		//variables for shooting
		this.projectile = [];
		this.shotdelay = 0;
		//TODO: Finish function to move player based on keyboard input
		function move(input){
			//key input for left is 37
			if(input == 37){
				//moves left by subtracting from it's x position
				velocityX = -1;	
			}
			//key input for right is 39
			if(input == 39){
				//moves right by adding to it's x position
				velocityX = 1;
			}
			this.x += velocityX;
			velocityX = 0;
		}
		//TODO: Create function to spawn projectile and shoot it
		function shoot(input){
			//key input for space is 32
			if(input == 32){
				//TODO: spawn a projectile
				
				//set shot delay to 0.5 secs
				this.shotdelay = 0.5;
			}
		}
		//TODO: create hitbox to detect when player gets shot
	}

	draw() {
		if(this.image) {
			c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height,)
		}
	}
}
