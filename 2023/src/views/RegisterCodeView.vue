<script setup lang="ts">
import FDFLoader from '@/components/FDFLoader.vue';
import { useCodesStore } from '@/stores/codes';
import { useRouter } from 'vue-router'

const router = useRouter();
const codesStore = useCodesStore();

const urlParams = new URLSearchParams(window.location.search);
const codes = urlParams.getAll("code")

for(var code of codes){
  codesStore.AddCode(code)
}


setTimeout(() => {
  router.push({path: '/'})
}, 2000)
</script>
<template>
  <FDFLoader />
</template>

<style>

</style>
