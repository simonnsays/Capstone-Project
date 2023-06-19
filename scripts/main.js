import {UI} from './ui.js'
import { Component } from './component.js'

const game = new UI
let components = []

components.push(new Component({
    type: 'pcCase',
    name: 'Nanoxia Deep Silence 3',
    size: 'mid-tower',
    states: {
        default: {imageSrc: '../assets/PC Case/Nanoxia/Side.png'},
        front: {imageSrc: '../assets/PC Case/Nanoxia/Front.png'}
    }
}))

components.push(new Component({
    type: 'MoBo',
    name: 'ASUS P8P67',
    size: 'ATX',
    states: {
        default: {imageSrc: '../assets/MotherBoard/ASUS/P8P67/Default.png'}
    }
}))

///////////// FILL SHOP Function
function fillShop(items) {
    const contents = document.querySelector('#shopContents');
    
    items.forEach((item) => {
        const content = document.createElement('a');
        content.className = 'content';
        content.id = item.name;
        content.addEventListener('click', () => transferToInv(content.id));

        const image = document.createElement('img');
        image.src = item.states.default.imageSrc;
        image.style.width = '150px';
        image.style.height = '150px';
        image.style.padding = '10px';

        content.appendChild(image);
        contents.appendChild(content);
    });
}

/////////////// TRANSFER TO INV
function transferToInv(name) {
    const contents = document.querySelector('#invContents');
    const content = document.createElement('a');
    content.className = 'content';
    content.id = name;
    content.addEventListener('click', () => transferToCanvas(content.id));

    const component = components.find((comp) => comp.name === content.id);
    if (component) {
        const image = document.createElement('img');
        image.src = component.states.default.imageSrc;
        image.style.width = '150px';
        image.style.height = '150px';
        image.style.padding = '10px';

        content.appendChild(image);
    }

    contents.appendChild(content);
}

/////////////// TRANSFER TO UI
function transferToCanvas(name) {
    const component = components.find(comp => comp.name === name);
    if (component) {
        if (component.type === 'pcCase') {
            game.addToPcCaseArea(component);
        } else {
            game.addToCmponentArea(component);
        }
    }
}

game.start()
fillShop(components)



