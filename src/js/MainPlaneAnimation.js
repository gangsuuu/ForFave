import { Clock } from "three"
import PlanTexts from './PlanTexts.js'
export default class MainPlaneAnimation{
    constructor(body,canvasContainer, skillsBoxs, imageRepository,mainPlane, gsap){
      this.planTexts =  new PlanTexts(gsap)
      this.enteredNum
      this.prevNum
      this.mesh
      this.skillsCard


      this.body = body
      this.animatioTiger = false
      this.top
      this.mainPlane = mainPlane
      this.canvasContainer = canvasContainer
      this.imageRepository = imageRepository
      this.skillsBoxs = skillsBoxs
      this.gsap = gsap
      this.state = {
        selected : false,
      }
    }
    selectImage(mesh,num,mainPlaneContainer,mainInfos,mainPlaneTitle,mainLinkA){
      this.body.style.overflow = 'hidden'
      if(this.animatioTiger == true ) return
      this.animatioTiger = true
      
      this.animatioTiger = this.planTexts.inputContent(num,mainPlaneTitle,mainInfos,mainLinkA)

      this.skillsBoxs[num].style.opacity = 0 

      this.top = window.scrollY
      mainPlaneContainer.style.display = "block"

      this.skillsBounding = this.skillsBoxs[num].getBoundingClientRect()
      this.mainBounding = this.mainPlane.children[0].getBoundingClientRect()
     
     
     
      const width = this.skillsBounding.width
      const height = this.skillsBounding.height
      const left = this.skillsBounding.left
      const top = this.skillsBounding.top
      this.scaleX = this.mainBounding.width / this.skillsBounding.width
      this.scaleY = this.mainBounding.height / this.skillsBounding.height

      this.x = -left + (this.mainBounding.left + this.mainBounding.width/2) - (width/2)
      this.y =  -top +(this.mainBounding.top + this.mainBounding.height/2) - (height/2)
      this.gsap.to(mesh.scale,{
        x:this.scaleX,
        y:this.scaleY,
        duration:0.4,
        onComplete: () => {
          mesh.material.uniforms.uHover.value = 0
        }
      })

      mainInfos[0].style.opacity = 0
      mainPlaneTitle.style.opacity = 0
      this.gsap.to(this.skillsBoxs[num],{
        x: this.x,
        y:  this.y,
        opacity:0,
        duration: .6,

        onComplete: () => {

          
        }


      })

      this.skillsCard = this.skillsBoxs[num]
      this.mesh = mesh
      this.state.selected = true
      return true
    }

    closeImage(mainPlaneContainer,mainInfos,mainPlaneTitle){
      if(this.animatioTiger == true) return
      this.animatioTiger = true
      this.state.selected = false
      

      this.gsap.to(mainPlaneTitle,{
        opacity:0,
        duration: .4,
        x: -2,
        ease: 'power1.inOut',
        onComplete: ()=>{
          console.log(this.mesh)
          this.gsap.to(this.mesh.scale,{
            x: 1,
            y: 1,
            duration:0.4,
          })
          this.gsap.to(this.skillsCard,{
            x: 0,
            y: 0,
            duration:0.6,
            onComplete: ()=>{
              this.imageRepository.forEach(({ img, mesh }) => {
                this.gsap.to(mesh.material.uniforms.uOpacity, {
                  value: 1,
                  duration: 0.6,
                  delay:0.2,
                  ease: 'power1.inOut',
                  onComplete: ()=>{
                    mainPlaneContainer.style.display = "none"
                    this.animatioTiger = false;
                  }
                })
                this.gsap.to(mesh.material.uniforms.uHover, {
                  value: 0,
                  duration: 0.6,
                  delay:0.2,
                  ease: 'power1.inOut',
                  onComplete: ()=>{
                    mainPlaneContainer.style.display = "none"
                    this.body.style.overflow = 'auto'
                    this.animatioTiger = false;
                  }
                })
              });
            }
          })
        }
      })
      this.gsap.to(mainInfos,{
        opacity:0,
        duration: .4,
        x: -2,
        delay: .2,
        ease: 'power1.inOut',
      })


      
      return false
    }
    fixScroll() {
      if(this.animatioTiger == true) return ;
      this.skillsCard.style.position = 'fixed'
      this.skillsCard.style.top = 0
      this.skillsCard.style.left = 0

      this.skillsCard.children[0].style.position = 'absolute'
      this.skillsCard.children[0].style.left = '50%'
      this.skillsCard.children[0].style.top = '13.4%'

      this.skillsCard.style.transform = ``
    }


    imageEnter(num){
      if(this.state.selected == true){ 
        this.skillsBoxs[num].style.opacity = 0 
        return
      }else{
        this.skillsBoxs[num].style.opacity = 1
        return num
      }

    }

    imageOut(prevNum){
      if(prevNum != null){
        this.skillsBoxs[prevNum].style.opacity = 0
      }
      return null
    }
  }