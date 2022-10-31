// Art 109 Three.js Demo Site
// client.js
// A basic three.js scene which displays and rotates a polygon with a wireframe

// Extract globals from external script
const { THREE } = window;

// Create a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  500 / 500,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x1660B2);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

// Add a polygon to the scene
const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
const material = new THREE.MeshStandardMaterial({ color: 0xf0c90a });

const poly = new THREE.Mesh(geometry, material);
scene.add(poly);

// add wireframe to shape
const matLineBasic = new THREE.LineBasicMaterial({ color: 0xf0c90a});
const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(wireframe, matLineBasic);
line.material.depthTest = false;
line.material.opacity = 0.9;
line.material.transparent = false;
scene.add(line);

// Position our camera so we can see the shape
camera.position.z = 5;

// Add a directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
scene.add(directionalLight);

// Add an ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
scene.add(ambientLight);

// Define and then call the render loop
// Define
function render() {
  requestAnimationFrame(render);

  // Rotate our shape
  poly.rotation.x += 0.005;
  poly.rotation.y += 0.005;
  line.rotation.x += 0.005;
  line.rotation.y += 0.005;
  renderer.render(scene, camera);
}
// Call
render();
