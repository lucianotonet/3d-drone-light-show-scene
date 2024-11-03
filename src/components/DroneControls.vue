<script setup lang="ts">
interface Props {
  onReset: () => void;
  onSphere: () => void;
  onHelix: () => void;
  onCube: () => void;
}

defineProps<Props>();
</script>

<template>
  <div class="controls">
    <button @click="onReset">Reset All</button>
    <button @click="onSphere">Sphere</button>
    <button @click="onHelix">Double Helix</button>
    <button @click="onCube">Cube</button>
  </div>
</template>

<style scoped>
.controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  gap: 10px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

button {
  background: rgba(0, 68, 255, 0.2);
  border: 1px solid rgba(0, 68, 255, 0.3);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

button:hover {
  background: rgba(0, 68, 255, 0.4);
  border-color: rgba(0, 68, 255, 0.5);
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}
</style>