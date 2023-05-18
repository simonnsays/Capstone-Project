class Component {
    constructor ({name, position, assetSrc, slots = []}) {
        this.name = name
        this.position = position
        this.image = new Image()
        this.image.src = assetSrc
        this.slots = slots
    }

    checkBoundingBox({x, y}) { // boolean, checks if x,y is within bounding box
        let box = this.boundingBox
        return (x >= box.x && y >= box.y) && (x <= box.x2 && y <= box.y2)
    }

    get boundingBox(){
        return {
            x:this.position.x,
            y:this.position.y,
            x2:this.position.x + this.image.width,
            y2:this.position.y + this.image.height,
        }
    }

    draw(canvas) {
        canvas.getContext('2d').drawImage(this.image,this.position.x, this.position.y)
    }
}