class Component {
    constructor ({name, position, assetSrc}) {
        this.name = name
        this.position = position
        this.image = new Image()
        this.image.src = assetSrc
    }

    draw(canvas) {
        canvas.getContext('2d').drawImage(this.image,this.position.x, this.position.y)
    }
}