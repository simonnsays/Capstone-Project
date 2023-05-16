class Simulator{
    constructor(components = [], selectedComponent = undefined) {
      this.canvas = document.querySelector('canvas')
      this.context = this.canvas.getContext('2d')
      this.components = components
      this.selectedComponent = selectedComponent
      this.canvas.width = 1260
      this.canvas.height = 700

      this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e))
      this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e))
      this.canvas.addEventListener('mouseup', () => this.handleMouseUp())
    }
    
    handleMouseDown(e) {
      
      this.selectedComponent = this.getPiece(this.getMousePosition(e))
      const mousePosition = this.getMousePosition(e)
      console.log(this.components[1].checkBoundingBox(mousePosition))
      console.log(mousePosition.x)
      console.log(e.clientX)

      if (this.selectedComponent != undefined){
        this.selectedComponent.offset = {
          x: mousePosition.x - this.selectedComponent.position.x,
          y: mousePosition.y - this.selectedComponent.position.y

        }
      }
    }

    handleMouseMove(e) {
      const mousePosition = this.getMousePosition(e)

      if(this.selectedComponent != null) {
        this.selectedComponent.position.x = mousePosition.x - this.selectedComponent.offset.x
        this.selectedComponent.position.y = mousePosition.y - this.selectedComponent.offset.y
      }
    }

    handleMouseUp() {
      this.selectedComponent = null
    }

    getPiece(loc){
      for (let i = this.components.length - 1 ; i >= 0; i--) {
        if(this.components[i].checkBoundingBox(loc)) return this.components[i]
      }
    }

    getMousePosition(e) {
      const rect = this.canvas.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
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