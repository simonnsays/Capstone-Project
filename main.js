// Create an instance of the CanvasGame class
const game = new Simulator();

// create instances of components
game.components.push(new Component ({
    name: 'Case',
    position: {x:150, y:150},
    assetSrc: './assets/component-assets/pc1-case1.png',
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


//create instances for slots
game.components[0].slots.push(new Slot ({
    name: 'MoBo',
    position: {
        x: game.components[0].position.x ,
        y: game.components[0].position.y 
    },
    offset: {
        x: 45,
        y: 35
    },
    highlight: {
        x: game.components[0].position.x ,
        y: game.components[0].position.y ,
        x2: game.components[1].image.width,
        y2: game.components[1].image.height
    }
}))

// Start the game
game.start()




