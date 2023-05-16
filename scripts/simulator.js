class Simulator{
    constructor(components = []) {
      this.canvas = document.querySelector('canvas')
      this.context = this.canvas.getContext('2d')
      this.components = components
      this.canvas.width = 1260
      this.canvas.height = 700
    }
  
    start() {
      this.animate()
    }
  
    animate() {
      // Clear the canvas
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.fillStyle = '#339199'
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

      for (let component in this.components){ 
        this.components[component].draw(this.canvas)
      }
  
      // Call the draw method again to create an animation loop
      requestAnimationFrame(() => this.animate())
    }

    
  }