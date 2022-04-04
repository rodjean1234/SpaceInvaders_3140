import Invaders from "./Invaders.js"

import { canvas } from './Canvas.js';

export default class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0,
        }

        // The speed of Invaders
        this.travel = {
            x: 5,
            y: 0,
        }

        this.invaders = []

        // Set random # of invaders on each reload
        const cols = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        // The width of the grid is responsible to track when to `bounce`
        this.width = cols * 70

        // Create a row and col of Invaders according to `cols` and `rows`
        for(let x = 0; x < cols; x++){
            for(let y = 0; y < rows; y++){
                this.invaders.push(
                    new Invaders({
                        position: {
                            x: x * 70,
                            y: y * 60 
                        }
                    })
                )
            }
        }

    }

    update() {
        this.position.x += this.travel.x
        this.position.y += this.travel.y

        this.travel.y = 0

        // Creates the bouncing effect from side to side
        if (this.position.x + this.width >= canvas.width || this.position.x  <= 0) {
            this.travel.x = -this.travel.x
            this.travel.y = 70
        }
    }
}