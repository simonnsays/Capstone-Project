class Simulator {
    constructor(components = [], selectedComponent = null) {
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
      // get mouse position AND boundingBox of components
      this.selectedComponent = this.getPiece(this.getMousePosition(e))
      const mousePosition = this.getMousePosition(e)

      // so that you won't grab asset by the corner always
      if (this.selectedComponent != null){
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
        for (let slot in this.selectedComponent.slots) {
          this.selectedComponent.slots[slot].position.x = mousePosition.x - this.selectedComponent.offset.x
          this.selectedComponent.slots[slot].position.y = mousePosition.y - this.selectedComponent.offset.y
        }

        for (let component in this.components) {
          for (let slot in this.components[component].slots){
            if (this.selectedComponent.name === this.components[component].slots[slot].name) {
              if (this.components[component].slots[slot].isClose(this.selectedComponent.position, this.selectedComponent.image.width)) {
                this.components[component].slots[slot].showHighlight = true
              } else {
                this.components[component].slots[slot].showHighlight = false
              }
            } 
          }
        }
      }
    }

    handleMouseUp() {      
      for (let component in this.components) {
        for (let slot in this.components[component].slots){
          if (this.components[component].slots[slot].isClose(this.selectedComponent.position, this.selectedComponent.image.width)) {
            this.selectedComponent.snap(this.components[component].slots[slot].placement())
          }

          this.components[component].slots[slot].showHighlight = false
        }
      }

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

        for (let slot in this.components[component].slots) {
          if (this.components[component].slots[slot].showHighlight) {
            this.components[component].slots[slot].draw(this.canvas)
          }
        }
      }
      
      // Call the draw method again to create an animation loop
      requestAnimationFrame(() => this.animate())
    }

    
  }