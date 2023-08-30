import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Destination = {
  info: string
  coord : [number, number]
}

const destinations : {[key: string]: Destination[]} = {
  "morten": [
    {info: "Flot, næste!", coord: [55.83586804837251, 12.270102782277808]}, // For enden af vejen
    {info: "Færdig!", coord: [55.83636084800567, 12.270125653891546]} // ved huset
  ],
  "nicolai": [
    {info: "Så er vi igang", coord: [55.8426482781694, 12.42579507996865]}, // Huset
    {info: "Flot, næste!", coord: [55.842241038500816, 12.42550192368334] }, // Skolevej
    {info: "Færdig!", coord: [55.8426482781694, 12.42579507996865] } // Huset
  ],
  "pno": [
    {info: "Flot, næste!", coord: [55.67337596130846, 12.589015591505902]},
    {info: "Færdig!", coord: [55.672343845053206, 12.588795131895393]}
  ]
}

// app.provide('appProvided', 'value')

export const useDestinationStore = defineStore('destination', () => {
  var route = localStorage.getItem("route")

  if (!route) {
    route = "nicolai"
  }

  console.log("Pursuing route", route, destinations, destinations[route])

  const destination_list : { visited: Date | undefined, dest: Destination }[] = [];
  for (let pos of destinations[route]) {
    destination_list.push({
      visited: undefined,
      dest: pos
    })
  }

  const list = ref(destination_list)
  const index = ref(0)
  const currentDestination = computed(() => list.value[index.value].dest.coord)
  const currentInfo = computed(() => list.value[index.value].dest.info)
  function nextDestination() {
    list.value[index.value].visited = new Date()

    console.log("Visited:", list.value[index.value])

    index.value++
  }
  
  return { list, index, currentInfo, currentDestination, nextDestination }
})
