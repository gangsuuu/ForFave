export default class MouseAnimation{
  constructor(cursor){
    this.cursor = cursor
    this.spring = .1
    this.currentX
    this.currentY
    
    this.x = .5 * window.innerWidth
    this.y =  .5 * window.innerHeight
    this.px = 0
    this.py = 0


    this.screenSection
    this.ps = 0
    this.scale = 0
  }
  update(e,screenSection){
    this.x = e.clientX
    this.y = e.clientY
    this.screenSection = screenSection
  }
  rayUpdate(onOff,onLink){
    if(this.screenSection == 0){
      this.scale = 12
    }else if(this.screenSection == 1){
      if(onOff == 1){
       this.scale = 8
       this.cursor.children[0].style.opacity = 1
      }else if(onOff == 0){
       this.scale = 2
       this.cursor.children[0].style.opacity = 0
      }
    }else if(this.screenSection == 2){
      this.scale = 8
    }

    if(onLink == 1){
      this.scale = 10
      this.cursor.children[0].innerHTML = 'VIST'
    }
   
  
  }
  animation(){
    this.scaleX = ( 1 - Math.abs(this.x - this.px) * 0.001)
    this.scaleY = ( Math.abs(1 - Math.abs(this.y - this.py) * 0.005))
    if(this.scaleX < 0.2){
      this.scaleX += 0.1
    }



    this.ps = (this.scale - this.ps)
    this.px += (this.x - this.px) * this.spring
    this.py += (this.y - this.py) * this.spring
    this.cursor.style.transform = `translate(${this.px}px,${this.py}px) scale(${this.scale})  scaleY(${this.scaleX})`
  }
}