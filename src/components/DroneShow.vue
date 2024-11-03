<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import DroneControls from './DroneControls.vue';
import { createDroneSwarm } from '../utils/droneSwarm';
import { setupEnvironment } from '../utils/environment';
import { DroneAPI } from '../utils/droneAPI';

const canvas = ref<HTMLCanvasElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let droneAPI: DroneAPI;

const initialCameraPosition = {
  position: new THREE.Vector3(0, 20, 50),
  target: new THREE.Vector3(0, 0, 0)
};

const initScene = () => {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000510, 0.001);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.copy(initialCameraPosition.position);
  camera.lookAt(initialCameraPosition.target);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value!,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000510);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 200;
  controls.minDistance = 5;

  setupEnvironment(scene);
  const droneSwarm = createDroneSwarm(scene, 8000);
  droneAPI = new DroneAPI(droneSwarm, camera, controls, initialCameraPosition);

  animate();
};

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  droneAPI.update();
  renderer.render(scene, camera);
};

const handleResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

onMounted(() => {
  initScene();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

defineExpose({ droneAPI });
</script>

<template>
  <canvas ref="canvas" />
  <DroneControls
    v-if="droneAPI"
    :onReset="() => droneAPI.resetAll(2)"
    :onSphere="() => droneAPI.formSphere(10, 2)"
    :onHelix="() => droneAPI.formDoubleHelix(10, 20, 2)"
    :onCube="() => droneAPI.formCube(20, 2)"
  />
</template>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000510;
}
</style>