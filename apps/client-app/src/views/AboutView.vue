<template>
  <div class="about">
    <h1>Version {{ appVersion }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { version } from '../../package.json';

const appVersion = ref(version)

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
