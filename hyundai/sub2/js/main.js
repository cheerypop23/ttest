import * as THREE from 'three';
import {GLTFLoader} from 'gltf';
import {OrbitControls} from 'orbit'


//랜더러
window.addEventListener('load', function () {
  init();
});

async function init() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false, //투명도
    
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  
  //camera
  
  const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth/window.innerHeight,
    1,500
  );
  //카메라 포지션 조절
  camera.position.set(5,2,4);
  
  //로딩바 만들기
  const progressBar = document.querySelector("#progress-bar")
  const progressBar1 = document.querySelector("#progress-bar-container")
  const loadingManager = new THREE.LoadingManager();//LoadingManager()->Three.js에서 제공

  loadingManager.onProgress = (url, loaded, total) => {
    progressBar.value = (loaded / total) * 100;// 현재 진행형
  }
  //로딩이 완료되면 보이지 않아야 함
  loadingManager.onLoad = () => {
    progressBar1.style.display ='none'
  }
  

  //큐브추가


  const controls = new OrbitControls(camera,renderer.domElement);
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.minDistance = 2.5;
  controls.maxDistance = 20;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 2;

  //씬
  const scene = new THREE.Scene();
  const gltfLoader = new GLTFLoader(loadingManager);
  const gltf = await gltfLoader.loadAsync('./src/hyundai_ioniq_5_-_lowpoly/scene.gltf');
  console.log("gltf",gltf)
  const cars = gltf.scene;
  cars.castShadow = true;

  cars.traverse(object => {
    if(object.isMesh){
      object.castShadow = true;
    }
  })
  
  cars.scale.set(1,1,1)
  cars.rotation.y = 94.5;
  cars.rotation.x = 50.25;
  cars.position.set(0,-1,-0.2);
  scene.add(cars);

  //Plane 바닥 그림자 

  const planeGeometry = new THREE.PlaneGeometry( 10, 10, 32, 32);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent : true,
    opcity : 3,

  })
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1.5
  ;

  //그림자 받음
  plane.receiveShadow = true;
  scene.add( plane );

  //조명추가
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.y = 3

  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.radius = 20

  scene.add(directionalLight);

  // const helper = new THREE.DirectionalLightHelper(directionalLight,5)
  // scene.add(helper)

  const spotLight = new THREE.SpotLight( 0xffffff , 10,20,
                              Math.PI * 0.15, 0.5, 0.5);
  spotLight.position.set( 7,6,6);
  
  scene.add( spotLight );
  // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
  // scene.add( spotLightHelper );



  //반응형
  render();
  
  function render() {
    renderer.render(scene, camera);
    
    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', handleResize);
}