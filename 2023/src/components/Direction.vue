<script setup lang="ts">
import { ref, computed, watch } from "vue"

const props = defineProps<{
  direction: number
}>()

function direction_diff(heading: number){
  // Possibilities: N, S, E, W
  //  second for atan, first for atan
  // [55.83586804837251, 12.270102782277808]

  switch (true) {
    case 337 <= heading || heading < 22:
      return "N"
    case 22 <= heading && heading < 67:
      return "NE"
    case 67 <= heading && heading < 112:
      return "E"
    case 112 <= heading && heading < 157:
      return "SE"
    case 157 <= heading && heading < 202:
      return "S"
    case 202 <= heading && heading < 247:
      return "SW"
    case 247 <= heading && heading < 292:
      return "W"
    case 292 <= heading && heading < 337:
      return "W"
  }

  return heading
}

const heading = computed(() => {
  return direction_diff(props.direction)
})

const bgColor = ref("bg-light-blue")

const possibleColors = [
  "red", "pink", "purple", "deep-purple", "indigo", "blue",
  "light-blue", "cyan", "teal", "green", "light-green", "lime",
  "yellow", "amber", "orange", "deep-orange", "brown", "blue-grey",
  "grey"
];

watch(heading, (newHead, oldHead) => {
  if (newHead !== oldHead) {
    let newValue = bgColor.value;
    while (newValue == bgColor.value){
      const color = possibleColors[Math.floor(Math.random() * possibleColors.length)]
      newValue = `bg-${color}-lighten-3`
    }
    bgColor.value = newValue
  }
})
</script>

<template>
  <p class="text-h1 text-center py-16" :class="[ bgColor ]">
    {{ heading }}
  </p>
</template>

<style scoped>
</style>
