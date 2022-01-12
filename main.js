import './style.css'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera); // Draw


// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xADD8E6, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Icosaedro
const threadGeometry = new THREE.TorusKnotGeometry(3, 1, 100, 16);
const threadMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500, wireframe: true });
const threadTexture = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('sun.jpg') })
const thread = new THREE.Mesh(threadGeometry, threadMaterial);
scene.add(thread);

// Light
const pointLight = new THREE.PointLight(0xffA500);
pointLight.position.set(0, 0, 0)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star)
}

Array(500).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('black.jpg');
scene.background = spaceTexture;

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    // torus.position.x += 0.1;
    // torus.position.y += 0.1;
    // torus.position.z += 0.1;

    console.log(torus.position)


    controls.update();


    renderer.render(scene, camera);
}

animate()

// Avatar 
// const sunTexture = new THREE.TextureLoader().load('sun.jpg');

// const sun = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: sunTexture }));

// scene.add(sun);

// Moon

// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

// const moon = new THREE.Mesh(
//     new THREE.SphereGeometry(3, 32, 32),
//     new THREE.MeshStandardMaterial({
//         map: moonTexture,
//         normalMap: normalTexture,
//     })
// );

// scene.add(moon);

// moon.position.z = 30;
// moon.position.setX(-10);

// sun.position.z = -5;
// sun.position.x = 2;

// Scroll Animation
// function moveCamera() {
//     const t = document.body.getBoundingClientRect().top;
//     moon.rotation.x += 0.05;
//     moon.rotation.y += 0.075;
//     moon.rotation.z += 0.05;

//     sun.rotation.y += 0.01;
//     sun.rotation.z += 0.01;

//     camera.position.z = t * -0.01;
//     camera.position.x = t * -0.0002;
//     camera.rotation.y = t * -0.0002;
// }

// document.body.onscroll = moveCamera;
// moveCamera();