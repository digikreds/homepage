<script setup lang="ts">
import { useLocationStore } from '@/stores/location'
import {useDestinationStore } from '@/stores/destination'
import { computed } from 'vue'

const location = useLocationStore()
const destination = useDestinationStore()

function direction_diff(cur: [number, number], dest: [number, number]){
  // Possibilities: N, S, E, W
  //  second for atan, first for atan
  // [55.83586804837251, 12.270102782277808]

  console.log("current", cur, "destination", dest)
  var lat1 = cur[0],
      lon1= cur[1],
      lat2 = dest[0],
      lon2 = dest[1]

  // calculation from https://stackoverflow.com/questions/6016772/point-to-direction-of-a-gps-position
  const radians = Math.atan2(
    Math.sin(lon2-lon1)*Math.cos(lat2),
    Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1)
  )
  const degrees = (radians / Math.PI * 180)
  const heading = (degrees+360) % 360

  console.log("Calculated direction", heading)

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

var direction_to_move = computed(() => {
  // const dest : [number, number]= [55.842241038500816, 12.42550192368334] // skolevej
  const dest = destination.currentDestination
  return direction_diff(location.pos, dest)
})

var are_we_there = computed(() => {
  const dest = destination.currentDestination
  const cur = location.pos

  var lat1 = cur[0],
      lon1= cur[1],
      lat2 = dest[0],
      lon2 = dest[1]

  const dist = Math.sqrt( Math.pow((lat2 - lat1), 2) + Math.pow( (lon2 - lon1), 2 ) ) * Math.pow(10, 4)

  if (dist > 1) {
    return false
  }

  return true;
})

function nextDestination(){
  alert(destination.currentInfo)
  destination.nextDestination()
}

</script>

<template>
  <main>
    <div>Du skal lige gå lidt mere mod {{  direction_to_move }}</div>
    <div> Are we there yet? {{  are_we_there ? "Yup" : "Nope" }} </div>

    <div>
      <button @click="nextDestination" v-if="are_we_there">
        Gå videre
      </button>
    </div>

    
  </main>
</template>
