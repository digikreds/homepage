import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'


export const useLocationStore = defineStore('location', () => {

  if (! ('geolocation' in navigator) ) {
      throw "Geolocation not available"
  }

  const pos : Ref<[number,number]> = ref([0,0])

  const handlePos = (position : GeolocationPosition) => {
    pos.value = [position.coords.latitude, position.coords.longitude];
  }

  const error = (positionError: GeolocationPositionError) => {
    console.log("DUH", positionError)
  }

  const options : PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 300000,
    timeout: 27000
  }
  navigator.geolocation.watchPosition(handlePos, error, options);  

  function updateNow(){
    navigator.geolocation.getCurrentPosition(handlePos, error, options)
  }

  const latlong = computed(() => pos.value.join(",") ) 

  return { pos, latlong, updateNow }
})
