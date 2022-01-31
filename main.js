import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { GUI } from "dat.gui";
// Imports de texturas de planetas:
let sunPath = "./texturas/planetas/sun.jpg";
let mercuryPath = "./texturas/planetas/mercury.jpg";
let plutonPath = "./texturas/planetas/pluton.jpeg";
let venusPath = "./texturas/planetas/venus.jpg";
let earthPath = "./texturas/planetas/earth.jpg";
let marsPath = "./texturas/planetas/mars.jpg";
let jupiterPath = "./texturas/planetas/jupiter.jpg";
let saturnPath = "./texturas/planetas/saturn.jpg";
let saturnRingPath = "./texturas/anillos/saturnRing.png";
let uranusPath = "./texturas/planetas/uranus.jpg";
let uranusRingPath = "./texturas/anillos/uranusRing.png";
let neptunePath = "./texturas/planetas/neptune.jpg";
let brightPath = "./texturas/planetas/bright.png";
// Crear la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(-25, 40, 40);
renderer.render(scene, camera);
const textureLoader = new THREE.TextureLoader();
const sunGeo = new THREE.SphereGeometry(10, 32, 16);
const sunTex = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load(sunPath),
});
const sun = new THREE.Mesh(sunGeo, sunTex);
scene.add(sun);
// Creacion de planetas
const mercurio = createCircle(3.2, mercuryPath, 0, 28, 0, 0);
const venus = createCircle(5.8, venusPath, 0, 44, 0, 0);
const earth = createCircle(6, earthPath, 0, 62, 0, 0);
const mars = createCircle(4, marsPath, 0, 78, 0, 0);
const jupiter = createCircle(12, jupiterPath, 0, 100, 0, 0);
const neptuno = createCircle(7, neptunePath, 0, 200, 0, 0);
const pluton = createCircle(2.8, plutonPath, 0, 216, 0, 0);
const saturno = createCircle(
  10,
  saturnPath,
  {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingPath,
  },
  138,
  0,
  0
);
const uranus = createCircle(
  7,
  uranusPath,
  {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingPath,
  },
  176,
  0,
  0
);
// Fin de creación de planetas
// Inicio de GUI
const gui = new GUI();
const cameraFolder = gui.addFolder("Controles");
cameraFolder.add(camera.position, "x", -1000, 1000).listen();
cameraFolder.add(camera.position, "y", -1000, 1000).listen();
cameraFolder.add(camera.position, "z", -1000, 1000).listen();
cameraFolder.open();
//Lights
let ambiColor = "#0c0c0c";
let ambientLight = new THREE.AmbientLight(ambiColor);
scene.add(ambientLight);
let spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(70,30,20);
spotLight.castShadow = false;
scene.add(spotLight);
let environment = new (function () {
  this.ambientColor = ambiColor;
  this.disableSpotlight = true;
})();
gui.addColor(environment, "ambientColor").name("Color").onChange(function (e) {
  ambientLight.color = new THREE.Color(e);
});
gui.add(environment, "disableSpotlight").name("Enable Spotlight").onChange(function (e) {
  spotLight.visible = !e;
});
let pointColor = "#333";
let lightningPoint = new THREE.PointLight(pointColor);
lightningPoint.distance = 100;
scene.add(lightningPoint);
//let sphereLight = new THREE.SphereGeometry(0.3);
let sphereLight = new THREE.SphereGeometry(12, 30, 30);
const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(brightPath),
});
let sphereLightMaterial = new THREE.MeshBasicMaterial({ color: 0xac6c25 });
let sphereLightMesh = new THREE.Mesh(sphereLight, mat);
sphereLightMesh.position.set(70,30,20);
sphereLightMesh.castShadow = false;
scene.add(sphereLightMesh);
var lightControls = new (function () {
  this.pointColor = pointColor;
  this.intensity = 1;
  this.distance = 100;
})();
gui.addColor(lightControls, "pointColor").name("Ray Color").onChange(function (e) {
  lightningPoint.color = new THREE.Color(e);
});
gui.add(lightControls, "intensity", 0, 50).onChange(function (e) {
  lightningPoint.intensity = e;
});
gui.add(lightControls, "distance", 0, 100).onChange(function (e) {
  lightningPoint.distance = e;
});
var obj = {
  add: function () {
    alert("Usa el mouse para mover la camara y la rueda del ratón.\n Ajusta la iluminosidad y los colores.");
  },
};
gui.add(obj, "add").name("Instrucciones");
// Fin de GUI
function createCircle(tamanio, textura, anillo, x, y, z) {
  const geo = new THREE.SphereGeometry(tamanio, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(textura),
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (anillo) {
    let ringGeo = new THREE.RingGeometry(
      anillo.innerRadius,
      anillo.outerRadius,
      32
    );
    let ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(anillo.texture),
      side: THREE.DoubleSide,
    });
    let ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = x;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.set(x, y, z);
  return {
    mesh,
    obj,
  };
}
// Light
const pointLight = new THREE.PointLight(0xffa500);
pointLight.position.set(0, 0, 0);
const ambientLightSecond = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLightSecond);
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(400, 50);
scene.add(lightHelper, gridHelper);
// Controls
const controls = new OrbitControls(camera, renderer.domElement);
// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(500).fill().forEach(addStar);
// Space
const spaceTexture = new THREE.TextureLoader().load("black.jpg");
scene.background = spaceTexture;
// Animate
function animate() {
  requestAnimationFrame(animate);
  // Planetas y su orbita
  saturno.mesh.rotateY(0.039);
  saturno.obj.rotateY(0.001);
  mercurio.mesh.rotateY(0.004);
  mercurio.obj.rotateY(0.009);
  venus.mesh.rotateY(0.002);
  venus.obj.rotateY(0.005);
  earth.mesh.rotateY(0.002);
  earth.obj.rotateY(0.001);
  mars.mesh.rotateY(0.004);
  mars.obj.rotateY(0.004);
  jupiter.mesh.rotateY(0.001);
  jupiter.obj.rotateY(0.001);
  uranus.mesh.rotateY(0.03);
  uranus.obj.rotateY(0.0004);
  neptuno.mesh.rotateY(0.032);
  neptuno.obj.rotateY(0.0001);
  pluton.mesh.rotateY(0.008);
  pluton.obj.rotateY(0.00007);
  sphereLightMesh.rotateY(0.00475);
  // Fin de planetas y atributos de su orbita
  //lightFun();
  controls.update();
  renderer.render(scene, camera);
}
animate();
