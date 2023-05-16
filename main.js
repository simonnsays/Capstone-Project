// Create an instance of the CanvasGame class
const game = new Simulator();

game.components.push(new Component ({
    name: 'Case',
    position: {x:150, y:150},
    assetSrc: './assets/component-assets/pc1-case1.png'

}))

game.components.push(new Component ({
    name:'MoBo',
    position: {x:790, y:280},
    assetSrc: './assets/component-assets/pc1-mobo1.png'
}))

game.components.push(new Component ({
    name: 'Ram',
    position: {x:790, y: 180},
    assetSrc: './assets/component-assets/pc1-ram1.png'
}))

// Start the game
game.start()


