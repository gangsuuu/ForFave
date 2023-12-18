import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl?raw';
import fragmentShader from '../shaders/fragment.glsl?raw';
import GUI from 'lil-gui';
import { gsap } from 'gsap';
import MouseAnimation from './MouseMove.js';
import ScrollAnimation from './ScrollAnimation.js'
import MainPlaneAnimation from './MainPlaneAnimation.js'
import 'gsap/CSSPlugin'


export default function () {
  setTimeout (function () {
    scrollTo(0,0);
    },100);
  
  const body = document.querySelector('body')
  const frontEnds = document.querySelectorAll('.forntIs') 
  const frontEndsHide = document.querySelector('.forntIsHide') 
  const subjectTitles = document.querySelectorAll('.subjectTitle');
  const aboutContainer = document.querySelector('.aboutContainer');
  const aboutFirst = document.querySelector('.aboutFirst')
  const aboutSecond = document.querySelector('.aboutSecond')
  const container = document.querySelector('#container');
  const skillsContainer = document.querySelector('.SkillsContainer');
  const mainPlane = document.querySelector('.mainPlane')
  const cursor = document.querySelector('.cursor')
  const skillsBoxs = document.querySelectorAll('.skillsBox')
  const mainInfos = document.querySelectorAll('.mainInfo')
  const canvasContainer = document.querySelector('.canvasContainer')
  const mainPlaneContainer = document.querySelector('.mainPlaneContainer')
  const mainPlaneTitle = document.querySelector('.mainPlaneTitle')
  const subjeContents = document.querySelectorAll('.subjeContent')
  const mainLinkA = document.querySelector('.mainLinkA')


  let screenSection = 0
  let meshNum = 0
  let mainMesh
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  
  
  container.appendChild(renderer.domElement);
  
  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const scrollAnimation = new ScrollAnimation(aboutFirst,aboutSecond,aboutContainer,skillsContainer,subjectTitles,subjeContents,gsap);
  const mouseAnimation = new MouseAnimation(cursor)
  let mainPlaneAnimation
  

  const skillsGroup = new THREE.Group()
  const raycaster = new THREE.Raycaster()
  const clock = new THREE.Clock();
  const LoadingManager =  new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader()
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasSize.width / canvasSize.height,
    0.1,
    100
  );
  camera.position.set(0, 0, 50);
  camera.fov = Math.atan(canvasSize.height / 2 / 50) * (180 / Math.PI) * 2;



    /** 로딩 */
    LoadingManager.onstart = (url, loaded, total) => {
    }
    LoadingManager.onProgress = (url, loaded, total) => {
      console.log((loaded / total) * 100 + '%')
    }

    LoadingManager.onload = () => {
      body.style.overflow = 'auto'
      console.log('loadall')
    }



  const imageRepository = [];
  const loadImages = async() =>{
    const images =[...document.querySelectorAll('.contentImagesCanvas')];
    
    const fetchImages = images.map(
      (image) => 
      new Promise((resolve, reject) => {
      image.onload = resolve(image);
      image.onerror = reject;
    }))
    
    const loadedImages = await Promise.all(fetchImages);
    return loadedImages;
  }

  
  const createMainPlane = () =>{
    const {width, height} = mainPlane.getBoundingClientRect()
    const geometry = new THREE.PlaneGeometry(width,height,16,16)
    const material = new THREE.MeshBasicMaterial({color:'blue'})
    const mesh = new THREE.Mesh(geometry, material)
  
    mainMesh = mesh
    scene.add(mesh)
  }

  const createImages = (images) => {

    const imageMeshes = images.map((image) => {
      const material = new THREE.ShaderMaterial({
        uniforms : {
          uTexture: {
            value: textureLoader.load(image.src),
          },
          uTime: {
            value: 0,
          },
          uHover: {
            value: 0,
          },
          uHoverX: {
            value: 0.5,
          },
          uHoverY: {
            value: 0.5,
          },
          uOpacity :{
            value: 1
          }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide,
        transparent : true,

      });
      
      const {width, height} = image.getBoundingClientRect();
      const clonedMaterial = material.clone()
      clonedMaterial.uniforms.uTexture.value = textureLoader.load(image.src);


      const geometry = new THREE.PlaneGeometry(width, height, 16, 16);
      const mesh = new THREE.Mesh(geometry, clonedMaterial);
      
      skillsGroup.add(mesh)
      mesh.name = meshNum
      meshNum++
      imageRepository.push({img:image, mesh});

      return mesh;
    });
    mainPlaneAnimation = new MainPlaneAnimation(body,canvasContainer,skillsBoxs,imageRepository,mainPlane, gsap)
    return imageMeshes
  };

  const create = async() => {
    createMainPlane()
    const loadedImages =  await loadImages()
    const images = createImages([...loadedImages])
    scene.add(...images)
  };

  


  /** 스크롤 블락  **/
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e.preventDefault();
    }
    
    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }
    

  const imagesResize  = () => {
    imageRepository.forEach(({img,mesh}) =>{
      const {width, height, top, left, right} = img.getBoundingClientRect();


      
      let scaleX =  width / mesh.geometry.parameters.width
      let scaleY =  height / mesh.geometry.parameters.height
      mesh.geometry.scale(scaleX, scaleY, 1)

    })
  }


  /** 화면 리사이즈 */
  const resize = () => {
    canvasSize.width = window.innerWidth;
    canvasSize.height = window.innerHeight;

    camera.aspect = canvasSize.width / canvasSize.height;
    camera.fov = Math.atan(canvasSize.height / 2 / 50) * (180 / Math.PI) * 2;
    camera.updateProjectionMatrix();
    
    renderer.setSize(canvasSize.width, canvasSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


    
    const {width, height} = mainPlane.getBoundingClientRect()
    mainMesh.position.y = canvasSize.height/2 - height/2 - (window.innerHeight/100 * 30)
    mainMesh.position.x = -canvasSize.width/2 + width/2 + (window.innerWidth/100 * 9) 
    const boxSize = 1
    const ratio = mainMesh.geometry.height / mainMesh.geometry.width
    mainMesh.scale.set(boxSize, boxSize * ratio, 1.0)


    const fontPer =  window.innerWidth / 1980
    body.style.fontSize = `${fontPer}rem`
    const fontHeight = frontEndsHide.getBoundingClientRect().height
    for(let i = 0; i < frontEnds.length; i++){
      setTextPosition(i,fontHeight)
    }
    imagesResize() 
    scrollAnimation.tittleAnimation()
    scrollAnimation.aboutAnimation()
  };


  const setTextPosition = (i,height) => {
   switch(i){
    case 0:
      frontEnds[i].style.transform = `translate3d(0,0,${height/2}px) rotateX(0deg)`
      break;
      case 1:
      frontEnds[i].style.transform = `translate3d(0,${height/2}px,0) rotateX(-90deg)`
      break;
      case 2:
      frontEnds[i].style.transform = `translate3d(0,0,${(height/2) * -1}px) rotateX(-180deg)`
      break;
      case 3:
      frontEnds[i].style.transform = `translate3d(0,${(height/2) * -1}px,0) rotateX(-270deg)`
      break;
   }
  };

 const titleSetEvent = () =>{
  const subjectTitleHide = document.querySelectorAll('.subjectTitleHide');
  let titles = [] 
  subjectTitleHide.forEach((text,index) => {
    let words = text.innerHTML.split('')
    titles.push(words)
  })
  for(let i = 0; i < subjectTitles.length; i++){
      for(let j = 0; j < titles[i].length; j++){
        let span = document.createElement('span')
        span.innerHTML = titles[i][j]
        subjectTitles[i].appendChild(span)
      }
  }
 }
 

 const retransform = () =>{
  imageRepository.forEach(({img,mesh}) =>{
    const {width, height, top, left, right} = img.getBoundingClientRect();
    mesh.position.x = -canvasSize.width/2 + width/2 + left
    mesh.position.y = canvasSize.height / 2 - height / 2 - top;
    // mesh.geometry.parameters.width = width;
    // mesh.geometry.parameters.height = height;
  })
  
 }


  const getRaycaster = (e) => {
    const pointer = {
      x: (e.clientX / canvasSize.width) * 2 - 1,
      y: -(e.clientY / canvasSize.height) * 2 + 1,
    };

    raycaster.setFromCamera(pointer, camera);

    // const intersects = raycaster.intersectObjects(skillsGroup);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      let mesh = intersects[0].object;
      mesh.material.uniforms.uHoverX.value = intersects[0].uv.x - 0.5;
      mesh.material.uniforms.uHoverY.value = intersects[0].uv.y - 0.5;

    }
    mouseAnimation.rayUpdate(intersects.length,onLink)
  }

   let prevNum
   let fixedNum
   let selected = false
   let onLink = 0
  const addEvent = () => {
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove',(e) =>{
      getRaycaster(e)
      mouseAnimation.update(e,screenSection)
    })
    window.addEventListener('scroll', (e)=>{
      scrollAnimation.aboutAnimation()
      screenSection = scrollAnimation.tittleAnimation()
      if(selected == true) mainPlaneAnimation.fixScroll()
    });
    imageRepository.forEach(({ img, mesh }) => {
      img.addEventListener('mouseenter', () => {

        prevNum = mainPlaneAnimation.imageEnter(mesh.name)
        if(selected == false){
          gsap.to(mesh.material.uniforms.uHover, {
            value: 1,
            duration: 0.4,
            ease: 'power1.inOut',
          });
        }else{
          mesh.material.uniforms.uHover.value = 0
        }
      });
      img.addEventListener('mouseout', () => {
        prevNum = mainPlaneAnimation.imageOut(prevNum)
        if(selected == false){
          gsap.to(mesh.material.uniforms.uHover, {
            value: 0,
            duration: 0.2,
            ease: 'power1.inOut',
          });
        }
      });
    });

    mainPlaneContainer.addEventListener('click',(e)=>{
      if(selected == false) return
      
      if(e.target == mainLinkA){
        return
      }else{
        selected = mainPlaneAnimation.closeImage(mainPlaneContainer,mainInfos,mainPlaneTitle)
      }
    })
    mainLinkA.addEventListener('mouseenter', ()=>{
      onLink = 1
    })
    mainLinkA.addEventListener('mouseout', ()=>{
      onLink = 0
    })


    skillsBoxs.forEach((box)=> {
      box.addEventListener('click', (e) => {
        e.preventDefault()
        imageRepository.forEach(({ img, mesh }) => {
          if(mesh.name == prevNum){
            fixedNum = mesh.name
            selected = mainPlaneAnimation.selectImage(mesh,prevNum,mainPlaneContainer,mainInfos,mainPlaneTitle,mainLinkA)
          }else{
            gsap.to(mesh.material.uniforms.uOpacity, {
              value: 0,
              duration: 0.6,
              ease: 'power1.inOut',
            });
            gsap.to(mesh.material.uniforms.uHover, {
              value: 0,
              duration: 0.6,
              ease: 'power1.inOut',
            });
          }
          
        });
      })
    })

    titleSetEvent()
  }


  const draw = () => {
    renderer.render(scene, camera);
    mouseAnimation.animation()
    retransform()


   

    imageRepository.forEach(({ img, mesh }) => {
      mesh.material.uniforms.uTime.value = clock.getElapsedTime();
      mesh.updateMatrix();
    });


    requestAnimationFrame(() => {
      draw();
    });
  };




  const initialize = async() => {
    await create();
    addEvent();
    resize();
    draw();
  };

  initialize().then();
}