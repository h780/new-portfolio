import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.getElementById('canvas');

// Check if the canvas element is correctly referenced
if (!canvas) {
    console.error('Canvas element not found');
}

// 1. Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xF0F0F0);

// 2. Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. Create and Add Objects
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });  // green
const dodecahedron = new THREE.Mesh(geometry, material);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#468585' });  // green
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.2;

scene.add(dodecahedron);
scene.add(box); 

// 4. Add Lights
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);

// 5. Set up the Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 6. Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 7. Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// 8. Add Animation Loop
function animate() {
    requestAnimationFrame(animate);
    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;
    box.rotation.y += 0.05;
    controls.update();
    renderer.render(scene, camera);
}

animate();