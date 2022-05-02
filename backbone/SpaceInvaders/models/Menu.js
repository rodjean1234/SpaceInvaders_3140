// Does this belong in models?
document.body.addEventListener('keypress', (key) => {
    if(key.key == 'Enter') start()
})

function start() {
    this.showScreen('start-screen', false)
    this.showScreen('canvas', true)
}

function showScreen(id, isShow) {
    let screen = document.getElementById(id)
    let display = ( isShow ) ? 'block' : 'none'
    screen.style.display = display 
}
