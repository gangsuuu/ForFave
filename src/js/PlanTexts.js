export default class PlanTexts {
    constructor(gsap){
      this.gsap = gsap;
     this.tit = [
      'Trip on The Art',
      'Rainy',
      'AlphaMap',
      'TsParicles',
      'BallLights',
      'MirrorBall',
      'MouseTail',
      'CameraRollerCoaster',
      'CharacterAnimation',
      'Wrold Champion Ship',
      'PixelText'
     ]
     this.href = [
        'https://gangsuuu.github.io/Objectart/',
        'https://gangsuuu.github.io/rainAnimation/',
        'https://gangsuuu.github.io/alphaMapTest/',
        'https://gangsuuu.github.io/tsParticles/',
        'https://gangsuuu.github.io/ballLight/',
        'https://gangsuuu.github.io/mirrorBall/',
        'https://gangsuuu.github.io/mouseAnimation/',
        'https://gangsuuu.github.io/CameraShow/',
        'https://gangsuuu.github.io/characterAnimation/',
        'https://gangsuuu.github.io/boxRolling/',
        'https://gangsuuu.github.io/PixelText/'
     ]
     this.des = [
        `It's just normal GLSL objects. but only simple animation is following, and it doens't neey more somehing.`,
        `The Thor Hammer is on the web by GLFTLoader, And Use few of AmbiantLight, and producing with rains, So it's looked like disaster`,
        `AlphaMap can control 3d height, the mountin was made by simple2D texutre. Alphamap animats the nomarlmpa`,
        `TsParticles is make us used easy particles, if find to reference about, the work will be efftectly `,
        `A ball is on the lights, two ambient lights make dark mode, it's valueble producing`,
        `The Mirro reflect around object and Background, It's countroled by roughness, metalness with GUI`,
        `The Page only acitving by mouse position. the mouse tails is flexble,soft animation.`,
        `we couldn't see camera. But the camera is really important thing to animate procue, the web show activity camera move`,
        `GLFTLoader and Chreateranimation are played on the web, It's Mixed few Bin files on a file, and Countroll by script `,
        `The Rolling cubeBox is working by mouse, scoll and move, GLSL transition animation and texture animation make full`,
        `Canvas Texting Art, the container divied by row, and colums. divided place has pointsn umber and matching texture with each dot`
    ]
     this.tec = [
        'GLSL, THREE, CLOCK',
        'GLFTLoader,THREE',
        'AlphaMap, THREE',
        'Canvas, TsParticles',
        'TextureMap, THREE, ShadowMap',
        `CubeMap, THREE, GUI, Matehral`,
        'Canvas, CSS text sclae',
        'Camera, CurveExtraAPI, EnvMap ',
        'GLFTLoader, GLFTanimation,LoadingManager',
        'GLSL, TextureMap, JS',
        'Canvas, Pixel'

     ]
     this.know = [
        'GLSLObject, GLSLanimation, Clock,ropeAnimation',
        'GLFTObject, rainAnimation',
        'AlphaMap, mouseAnimation',
        'PaticlesAnimation, textAimation',
        'TextureMap, LightProduce',
        'CubeMap, MateralControl, GUI, reflect, rughness, matalness',
        '2dCanvas, MouseCursorAnimation, textSclaeAnimation',
        'CameraAnimation, Following ObjectLine, EnvMap',
        'CharacterAnimation, GLFTanimation, LoadingAnimation',
        'GLSL, GLSL Transition, THREE Group, Spliced texture each animation',
        'Canavs, PixleAnimation, Texting Animation,'
     ]
    }
    inputContent(number,mainPlaneTitle, mainInfos,mainLinkA){
      mainPlaneTitle.children[0].innerHTML = this.tit[number];
      mainLinkA.href = this.href[number]
      mainInfos[0].children[0].children[0].children[1].children[1].innerHTML = this.des[number]
      mainInfos[0].children[0].children[1].children[0].children[0].children[1].innerHTML = this.tec[number]
      mainInfos[0].children[0].children[1].children[0].children[1].children[1].innerHTML = this.know[number]

       this.gsap.fromTo(mainPlaneTitle,{
            opacity :0,
            y: 1,
            x: -3 
          },{
            opacity:1,
            y: 0,
            x: 0,
            duration: .4,
            delay: 0.3,
            ease: "power4.out",
          })
          this.gsap.fromTo(mainInfos,{
           opacity :0,
           y: 1,
           x: -3
          },{
            opacity:1,
            y: 0,
            x: 0,
            duration: .3,
            delay: 0.4,
            ease: "power4.out",
            onComplete : () => {
               return this.animatioTiger
            }
          })
       
    }

}