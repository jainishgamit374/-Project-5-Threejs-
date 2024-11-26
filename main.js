import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import vertex from "./utils/Shaders/vertex.glsl";
import fragment from "./utils/Shaders/fragment.glsl";
import Lenis from 'lenis' 
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 3;


// Object creation
const geometry = new THREE.IcosahedronGeometry(1.5, 50 , 50);
const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  side: THREE.DoubleSide,
  // wireframe: true,
  uniforms: {
    uTime: { value: 0.0 },       
    uColorChange: {
      value: 0.0
    }
  },
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

cube.position.y = -1.8;

// Renderer setup
const canvas = document.querySelector("#draw");
const renderer = new THREE.WebGLRenderer({ canvas , antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));



// Window resize event listener
window.addEventListener("resize", function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


var t1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".landing",
    start: "top top",
    end: "bottom center",
    // markers: true,
    scrub: true,
    pin: true,
  },
});

t1.to(cube.position, {
  y: 0,
  z: -2,
  duration: 1,
  ease: "power2.inOut",
}, "cz");

t1.to(material.uniforms.uColorChange, {
 value: 1,
  ease: "linear",
}, "cz");

t1.to(".head1 > h1", {
  y: 2,
  opacity: 0,
  duration: 1,
  ease: "power2.inOut",
}, "cz");

t1.from(".head2 > h1", {
  y: 150,
  duration: 1,
  ease: "power2.inOut",
});

// Animation function
const clock = new THREE.Clock();

function animate() {
  material.uniforms.uTime.value = clock.getElapsedTime();
  // controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
