<script setup lang="ts">
import { useLocationStore } from '@/stores/location'
import { computed } from 'vue'

const location = useLocationStore()

function direction_diff(cur: [number, number], dest: [number, number]){
  // Possibilities: N, S, E, W

  console.log("current", cur)
  var lat1 = cur[0],
      lon1= cur[1],
      lat2 = dest[0],
      lon2 = dest[1]

  const radians = Math.atan2( 
    Math.sin(lon2-lon1)*Math.cos(lat2), 
    Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)
  )
  var degrees = (radians / Math.PI * 180)
  if (degrees < 0 ) { degrees = degrees + 360}

  switch (true) {
    case 337 <= degrees && degrees < 22:
      return "N"
    case 22 <= degrees && degrees < 67:
      return "NE"
    case 67 <= degrees && degrees < 112:
      return "E"
    case 112 <= degrees && degrees < 157:
      return "SE"
    case 157 <= degrees && degrees < 202:
      return "S"
    case 202 <= degrees && degrees < 247:
      return "SW"
    case 247 <= degrees && degrees < 292:
      return "W"
    case 292 <= degrees && degrees < 337:
      return "W"
  
    default:
      break;
  }

  return degrees
}

var direction_to_move = computed(() => {
  const dest : [number, number]= [55.842241038500816, 12.42550192368334] // skolevej
  return direction_diff(location.pos, dest)
})

</script>

<template>
  <main>
    Du skal lige gå lidt mere mod {{  direction_to_move }}
  </main>
</template>
