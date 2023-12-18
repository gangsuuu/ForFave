export default class ScrollAnimation{
  constructor(aboutFirst,aboutSecond,aboutContainer,skillsContainer,subjectTitles,subjeContents,gsap){
      this.title = document.querySelectorAll('.subjectTitle')
    
      this.aboutFirst  = aboutFirst
      this.aboutSecond = aboutSecond 
      this.gsap = gsap
      this.subjeContents = subjeContents
      this.aboutContainer = aboutContainer
      this.skillsContainer = skillsContainer
      this.subjectTitles = subjectTitles
      this.tittles = ['about','skills','habit']
      this.currentPosition
      this.tittleNum
      this.prevNum
  } 
  aboutAnimation(e){
    if(window.scroll.scrollY == 0) return
      this.triger = (this.aboutFirst.scrollHeight / 3) * 2
      this.trigers = this.triger/15
      this.tirgerAv = this.trigers / 2

      // this.aboutFirst.style.transform = `translate(0,${window.scrollY}px)`
      // this.aboutSecond.style.transform = `translate(0,${window.scrollY}px)`
      
      if(window.scrollY < (this.trigers * 3)  + this.tirgerAv){
          let scaleX = (window.scrollY / this.trigers) * 2
          if(scaleX > 1) scaleX = 1

          this.aboutFirst.children[0].style.transform = `translate(-50%,-50%) scaleX(${scaleX})`

          let scaleX2 = 1 - ((window.scrollY - this.trigers) / ((this.trigers*2) - this.trigers))
          if(scaleX2 < 0.5){
              scaleX2 = 0
          }
          if(scaleX2 >= .5){
            scaleX2 =1
          }

          this.aboutFirst.children[1].style.opacity = scaleX
          this.aboutFirst.children[0].children[1].style.transform = ` scaleX(${scaleX2})`

          
          this.aboutSecond.children[0].style.opacity = 0
          this.aboutSecond.children[1].style.opacity = 0
        }
        else if(window.scrollY > this.trigers * 4 - this.tirgerAv
        &&  window.scrollY < this.trigers * 7 + this.tirgerAv
        ){
          this.aboutSecond.children[0].style.opacity = 1
          let scaleX3 = 1 - ((window.scrollY - (this.trigers * 5)) / ((this.trigers* 6) - (this.trigers * 5)))
            if(scaleX3 < 0.4999){
                scaleX3 = 0
            }
            if(scaleX3 > .5){
                scaleX3 = 1
            }

          this.aboutFirst.children[0].children[0].style.transform = ` scaleX(${scaleX3})`
           
          this.aboutFirst.children[1].style.opacity = 1
          if(scaleX3 > 0){
            this.aboutSecond.style.zIndex = 54
          }
        }
        else if(window.scrollY > this.trigers * 8 - this.tirgerAv
        &&  window.scrollY < this.trigers * 11 + this.tirgerAv
        ){
          this.aboutSecond.children[1].style.opacity = 1
          let scaleX4 =  ((window.scrollY - (this.trigers * 8)) / ((this.trigers* 9) - (this.trigers * 8)))
          
          if(scaleX4 > 0){
            this.aboutSecond.style.zIndex = 100
          }
          if(scaleX4 < 0.4999){
            scaleX4 = 0
          }
          if(scaleX4 > .5){
            scaleX4 = 1
          }
          this.aboutSecond.children[1].style.transform = ` scaleX(${scaleX4})`

          let scaleX5 = 1 - ((window.scrollY - (this.trigers * 9)) / ((this.trigers* 10) - (this.trigers * 9)))
          if(scaleX5 < 0.49){
            this.aboutFirst.children[1].style.opacity = 0
            scaleX5 = 0
          }
          if(scaleX5 > .51){
            this.aboutFirst.children[1].style.opacity = 1
              scaleX5 = 1
          }
          this.aboutSecond.children[1].children[1].style.transform = ` scaleX(${scaleX5})`
        }
        else if(window.scrollY < (this.trigers * 15) + this.tirgerAv
        && window.scrollY > (this.trigers * 12) - this.tirgerAv
        ){
          let opacity = -((window.scrollY - (this.trigers * 14)) / ((this.trigers* 15) - (this.trigers * 13)))
          if(opacity < 0.3){
            opacity = 0
          }else if(opacity > 0.7){
            opacity = 1
          }
          this.aboutSecond.children[0].style.opacity = opacity
          this.aboutSecond.children[1].style.opacity = opacity
        }

        
     

          
         
        
  }  
  tittleAnimation(){
    if(this.position == null) this.position = 'about'
    if(window.scrollY > 0 && window.scrollY < this.aboutContainer.scrollHeight  - (window.innerHeight * 1.3)
      ){
      this.position = 'about'
    }else if(window.scrollY > this.aboutContainer.scrollHeight - (window.innerHeight * 1.3)
      && window.screenY < this.skillsContainer.scrollHeight - (window.innerHeight * 1.3)
      ){
      this.position = 'skills'
    }else if(
      window.scrollY > this.skillsContainer.scrollHeight - (window.innerHeight * 1.3)
    ){
      this.position = 'habit'
    }

    if(this.currentPosition != this.position){
     this.tittleNum = this.tittles.indexOf(this.position)
     this.gsap.fromTo(this.subjeContents[this.prevNum],{
      opacity: 1,
      x:0,
      y:0,
    },
    {
      opacity: 0,
      x:4,
      y:-3,
      duration: .2
    })
      this.gsap.fromTo(this.subjeContents[this.tittleNum],{
        opacity: 0,
        x:-4,
        y:3,
      },
      {
        opacity: 1,
        x:0,
        y:0,
        delay:.22,
        duration: .22
      })

     if(this.prevNum != null){
      for(let i = 0; i < this.subjectTitles[this.prevNum].children.length; i++){
        this.gsap.fromTo(this.subjectTitles[this.prevNum].children[i],{
          top: '0%',
        },
        {
          top: '-100%',
          duration:.5,
          delay: i * .06,
          ease: "expo.out",
        }
        )
      }
     }
      for(let i = 0; i < this.subjectTitles[this.tittleNum].children.length; i++){
        this.gsap.fromTo(this.subjectTitles[this.tittleNum].children[i],{
          top: '100%',
        },
        {
          top: '0%',
          duration:.5,
          delay: i * .06,
          ease: "expo.out",
        }

        )
      }
    }
    this.prevNum = this.tittleNum
    this.currentPosition =  this.position
    return this.tittleNum
  }
}