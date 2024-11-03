import * as THREE from 'three';

export function setupEnvironment(scene: THREE.Scene) {
  // Create starfield using points
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 10000;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    const radius = 200 + Math.random() * 300;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);

    const intensity = 0.5 + Math.random() * 0.5;
    colors[i] = intensity;
    colors[i + 1] = intensity;
    colors[i + 2] = intensity + Math.random() * 0.3;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const starMaterial = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  // Add ground plane with grid
  const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
  const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0x001020,
    transparent: true,
    opacity: 0.3,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -50;
  scene.add(ground);

  // Add grid helper
  const grid = new THREE.GridHelper(1000, 100, 0x0044ff, 0x002288);
  grid.position.y = -50;
  scene.add(grid);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);
}