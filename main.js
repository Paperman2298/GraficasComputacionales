import './style.css'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as THREE from 'three';
import { TextureLoader } from 'three';

// Crear la escena
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera); // Draw

const textureLoader = new THREE.TextureLoader();
// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xADD8E6, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

// Icosaedro
const threadGeometry = new THREE.TorusKnotGeometry(3, 1, 100, 16);
const threadMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500, wireframe: true });
const threadTexture = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('sun.jpg') })
const thread = new THREE.Mesh(threadGeometry, threadMaterial);

// Sun
const sunGeo = new THREE.SphereGeometry(10, 32, 16);
const sunTex = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('sun.jpg') });
const sun = new THREE.Mesh(sunGeo, sunTex);

scene.add(sun);

const sunTexture = "https://i.imgur.com/zU5oOjt.jpeg";
const uranusRingTexture = "https://i.imgur.com/F1y9Ve4.png";
const saturnTexture = "https://i.imgur.com/YKw0m4x.jpeg";
const saturnRingTexture = "https://i.imgur.com/u0muMiZ.png";
//sun = createCircle(sun, )
const planetaRandom = createCircle(10, saturnTexture,{
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
},34.5,0,0);
function createCircle(tamanio,textura,anillo,x,y,z){
    const geo = new THREE.SphereGeometry(tamanio,30,30);
    const mat = new THREE.MeshStandardMaterial({
        map:textureLoader.load(textura)
    });
    const mesh = new THREE.Mesh(geo,mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(anillo){
        let ringGeo = new THREE.RingGeometry(
            anillo.innerRadius,
            anillo.outerRadius,
            32
        );
        let ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(anillo.texture),
            side: THREE.DoubleSide
        });
        let ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = x;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.set(x,y,z);
    return {mesh, obj};
}

// Mercury
const mercuryGeo = new THREE.SphereGeometry(1, 32, 16);
const mercuryTex = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('mercury.jpg') });
const mercury = new THREE.Mesh(mercuryGeo, mercuryTex);
mercury.position.set(20, 0, 0)
//scene.add(mercury)
    // Venus
const venusGeo = new THREE.SphereGeometry(1, 32, 16);
const venusTex = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('venus.jpg') });
const venus = new THREE.Mesh(venusGeo, venusTex);
venus.position.set(30, 0, 0)
//scene.add(venus)
    // Earth
const earthGeo = new THREE.SphereGeometry(1, 32, 16);
const earthTex = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('earth.jpg') });
const earth = new THREE.Mesh(earthGeo, earthTex);
earth.position.set(40, 0, 0)
//scene.add(earth)
    // Mars
const marsGeo = new THREE.SphereGeometry(1, 32, 16);
const marsTex = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('mars.jpg') });
const mars = new THREE.Mesh(marsGeo, marsTex);
mars.position.set(50, 0, 0)
//scene.add(mars)
    // Jupiter
const jupiterGeo = new THREE.SphereGeometry(1, 32, 16);
const jupiterTex = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('jupiter.jpg') });
const jupiter = new THREE.Mesh(jupiterGeo, jupiterTex);
jupiter.position.set(60, 0, 0)
//scene.add(jupiter)
    // Saturn
const saturnGeo = new THREE.SphereGeometry(1, 32, 16);
const saturnTex = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('saturn.jpg') });
const saturn = new THREE.Mesh(saturnGeo, saturnTex);
saturn.position.set(70, 0, 0)
//scene.add(saturn)
    // Uranus
const uranusGeo = new THREE.SphereGeometry(1, 32, 16);
const uranusTex = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('uranus.jpg') });
const uranus = new THREE.Mesh(uranusGeo, uranusTex);
uranus.position.set(80, 0, 0)
//scene.add(uranus)
    // Neptune
const neptuneGeo = new THREE.SphereGeometry(1, 32, 16);
const neptuneTex = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('neptune.jpg') });
const neptune = new THREE.Mesh(neptuneGeo, neptuneTex);
neptune.position.set(90, 0, 0)
//scene.add(neptune)

// Light
const pointLight = new THREE.PointLight(0xffA500);
pointLight.position.set(0, 0, 0)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)


// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star)
}

Array(500).fill().forEach(addStar)

// Space
const spaceTexture = new THREE.TextureLoader().load('black.jpg');
scene.background = spaceTexture;

// Animate
function animate() {
    requestAnimationFrame(animate);
    /*torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;*/
    //mercury.rotateY(0.04);
    planetaRandom.mesh.rotateY(1);
    planetaRandom.obj.rotateY(0.01129);
    // Function planets
    //planetaRandom.mesh.rotateY(0.004);
    //planetaRandom.mesh.position.x = 0;
    // End of function planets
    controls.update();
    renderer.render(scene, camera);
}
    console.log(planetaRandom)

animate()