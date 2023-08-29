<script setup lang="ts">
import { useLocationStore } from '@/stores/location'

const location = useLocationStore()

console.log(location.latlong )



</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
  <span>{{ location.latlong }}</span>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
