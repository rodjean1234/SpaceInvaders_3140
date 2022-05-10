// Does this belong in models?
//TODO: Pressing the enter key takes away the menu but doesn't properly start the game, only pressing it with your cursor makes it run properly
document.body.addEventListener('keypress', (key) => {
    if(key.key == 'Enter') start()
})

// Show canvas and hide start screen
function start() {
    this.showScreen('start-screen', false)
    this.showScreen('canvas', true)
}

// Show game over screen on game over
function stop() {
    this.showScreen('start-screen', false)
    this.showScreen('canvas', false)
    this.showScreen('over-screen', true)
}

// Toggle elements
function showScreen(id, isShow) {
    let screen = document.getElementById(id)
    let display = ( isShow ) ? 'block' : 'none'
    screen.style.display = display 
}
