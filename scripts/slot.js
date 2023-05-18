class Slot {
    constructor({name, position, offset, highlight = {x:0, y:0, x2:0, y2:0}, showHighlight = false}) {
        this.name = name
        this.position = position
        this.offset = offset
        this.highlight = highlight
        this.showHighlight = showHighlight
    }

    distance(point1, point2) {
        let a = point1.x - point2.x
        let b = point1.y - point2.y
        let c = Math.sqrt(a*a + b*b)
        return c
    }

    isClose(piece, width) {
        return this.distance(piece,{x:this.position.x + this.offset.x, y:this.position.y +this.offset.y}) < ( width/ 4)
    }

    draw(canvas) {
        canvas.getContext('2d').fillStyle = 'rgb(0,255,0,0.2)'
        canvas.getContext('2d').fillRect((this.position.x + this.offset.x), (this.position.y + this.offset.y), this.highlight.x2, this.highlight.y2)
    }
}