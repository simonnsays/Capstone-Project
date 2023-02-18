const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width =  window.innerWidth 
canvas.height = window.innerHeight

let components = []
let selectedComponent = null
let scale = 0 
let showHighlight = false

class component {
    constructor({position, imgSrc, width, height, xCorrect, yCorrect}){
        this.position = position
        this.image = new Image()
        this.image.src = imgSrc
        this.width = width
        this.height = height
        this.xCorrect = xCorrect
        this.yCorrect = yCorrect
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height) 
    }

    isClose() {
        if(distance({x: this.position.x, y: this.position.y},{x: this.xCorrect, y: this.yCorrect}) < this.width / 4) {
            return true
        }
        return false
    }

    snap() {
        this.position.x = this.xCorrect
        this.position.y = this.yCorrect
    }
}

function distance(point1, point2) {
    let a = point1.x - point2.x
    let b = point1.y - point2.y
    let c = Math.sqrt(a*a + b*b)
    return c
}

const pcCase = new component ({
    position: {x: 250, y:150},
    imgSrc: './img/simlator-assets/pc1-case1.png',
    width: 430,
    height: 458

})

components.push(pcMoBo = new component({
    position: {x: 990, y: 280},
    imgSrc: './img/simlator-assets/pc1-mobo1.png',
    width: 213,
    height: 250,
    xCorrect: pcCase.position.x + 60,
    yCorrect: pcCase.position.y + 70
}))

components.push(pcRam = new component({
    position: {x: 990, y: 50},
    imgSrc: './img/simlator-assets/pc1-ram1.png',
    width: 129,
    height: 57,
    xCorrect: pcCase.position.x + 190,
    yCorrect: pcCase.position.y + 150
}))

components.push(pcFan = new component({
    position: {x: 990, y: 150},
    imgSrc: './img/simlator-assets/pc1-fan1.png',
    width: 194,
    height: 88,
    xCorrect: pcCase.position.x + 60,
    yCorrect: pcCase.position.y + 250
}))


components.push(pcMicro = new component({
    position: {x: 990, y: 580},
    imgSrc: './img/simlator-assets/pc1-microPr1.png',
    width: 129,
    height: 100,
    xCorrect: pcCase.position.x + 115,
    yCorrect: pcCase.position.y + 100
}))


function animate() {
    c.clearRect(0,0,canvas.width,canvas.height)
    c.fillStyle = '#334155'
    c.fillRect(0,0,canvas.width,canvas.height)
    window.requestAnimationFrame(animate)
    pcCase.draw() 
    for(let i = 0; i < components.length; i++){
        components[i].draw()
    }
    
    if (showHighlight) {
        c.fillStyle = 'rgb(0,255,0,0.2)'
        c.fillRect(selectedComponent.xCorrect, selectedComponent.yCorrect, selectedComponent.width, selectedComponent.height)
    }

}
animate()


canvas.addEventListener('mousedown', (e) => {
    selectedComponent = getPiece(e)
    
    if (selectedComponent != null) {
        const index = components.indexOf(selectedComponent)
        if(index > -1){
            components.splice(index,1)
            components.push(selectedComponent)
        }

        selectedComponent.offset = {
            x: e.clientX - selectedComponent.position.x,
            y: e.clientY - selectedComponent.position.y
        }
    }
})

canvas.addEventListener('mousemove', (e) => {
    
    if (selectedComponent != null){
        selectedComponent.position.x = e.clientX - selectedComponent.offset.x
        selectedComponent.position.y = e.clientY - selectedComponent.offset.y

        if (selectedComponent.isClose()) {
            showHighlight = true
        }
    }

})

canvas.addEventListener('mouseup', (e) => {
    if(selectedComponent.isClose()) {
        selectedComponent.snap()
    } 
    selectedComponent = null
    showHighlight = false
})

function getPiece(loc) {
    for (let i = components.length - 1; i >= 0; i--) {
        if(loc.x >= components[i].position.x &&
            loc.x <= components[i].position.x + components[i].width &&
            loc.y >= components[i].position.y &&
            loc.y <= components[i].position.y + components[i].height) {
                return components[i]   
            }
    }
    return null
}

// ADD SNAP FEATURE ( DONE :) )
// ADD COMPATIBILITY FEATURE

