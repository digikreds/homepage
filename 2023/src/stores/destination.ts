import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const destinations : {[key: string]: number[][]} = {
  "morten": [
    [55.83586804837251, 12.270102782277808], // For enden af vejen
    [55.83636084800567, 12.270125653891546] // ved huset
  ],
  "nicolai": [
    [55.842241038500816, 12.42550192368334], // Skolevej
    [55.8426482781694, 12.42579507996865] // Huset
  ],
  "pno": [
    [55.67337596130846, 12.589015591505902],
    [55.672343845053206, 12.588795131895393]
  ]
}

// app.provide('appProvided', 'value')

export const useDestinationStore = defineStore('destination', () => {
  var route = localStorage.getItem("route")

  if (!route) {
    route = "nicolai"
  }

  console.log("Pursuing route", route, destinations, destinations[route])

  const destination_list : { visited: Date | undefined, pos: number[] }[] = [];
  for (let pos of destinations[route]) {
    destination_list.push({
      visited: undefined,
      pos: pos
    })
  }

  const list = ref(destination_list)
  const index = ref(0)
  const currentDestination = computed(() => list.value[index.value].pos)
  function nextDestination() {
    list.value[index.value].visited = new Date()

    console.log("Visited:", list.value[index.value])

    index.value++
  }
  
  return { list, index, currentDestination, nextDestination }
})
