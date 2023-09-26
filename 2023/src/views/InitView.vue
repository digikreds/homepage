<script setup lang="ts">
import FDFLoader from '@/components/FDFLoader.vue';
import { useRouter } from 'vue-router'
const router = useRouter();

var urlParams = new URLSearchParams(window.location.search);
for(var parameter of urlParams.entries()){
  var key = parameter[0];
  var value = parameter[1]
  localStorage.setItem(key, value)
}

// Do redirect

setTimeout(() => {
  router.push({path: '/'})
}, 2000)
</script>
<template>
  <FDFLoader />
    
</template>

<style scoped>
</style>
