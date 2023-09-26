import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TripStopActivation, Destination, Trip, TripStopActivationResult, TripContext } from './types'

function direction_diff(cur: [number, number], dest: [number, number]):number{
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

  return heading
}

/**
 * 
 * @param dest Destination for activation
 * @param precision how unprecise can the location be
 * @returns function determining Wheter the current location is within precision of the destination
 */
function TripStopLocation(dest : [number, number], precision : number, activatedText:string) : TripStopActivation {
  return (ctx) => {
    const cur = ctx.Location
    const lat1 = cur[0],
        lon1= cur[1],
        lat2 = dest[0],
        lon2 = dest[1]

    const dist = Math.sqrt( Math.pow((lat2 - lat1), 2) + Math.pow( (lon2 - lon1), 2 ) ) * Math.pow(10, 4)
    const heading = direction_diff(cur, dest)
    const activated = dist < precision

    if (activated) {
      return {Activated: activated, Reason: {Type: "text", Info: activatedText}}
    } else {
      return {Activated: activated, Reason: {Type: "heading", Info: heading } }
    }
  }
}

/**
 * A time activated stop
 * @param time Time for activation
 * @returns 
 */
function TripStopTime(time : Date) : TripStopActivation {
  return (ctx) => {
    const activated = time < ctx.time
    return {Activated: activated, Reason: {Type: "text", Info: "Ikke endnu"} }
  }
}

/**
 * 
 * @param code code to check if has activated
 * @returns 
 */
function TripStopCode(code: string, activatedText:string) : TripStopActivation {
  return (ctx : TripContext) => {
    const activated = ctx.Codes.includes(code)
    if (activated) {
      return {Activated: activated, Reason: {Type: "text", Info: activatedText}}
    }else{
      return {Activated: activated, Reason: {Type: "text", Info: "Koden er ikke fundet"}}
    }
  }
}

import trips_raw from './trips.json'

const trips : {[key: string]:Trip} = trips_raw.trips.map((trip) => {
  const tour = trip.tour.map((stop) => {
    if (stop.type === "location") {
      return {
        activation: TripStopLocation(stop.position, stop.accuracy, stop.info)
      }
    } else if (stop.type === "time") {
      return {
        activation: TripStopTime(stop.time)
      }
    } else if (stop.type === "code") {
      return {
        activation: TripStopCode(stop.code, stop.info)
      }
    } else {
      throw new Error("Unknown stop type")
    }
  })

  return { teamName: trip.teamName, tour: tour }
}).reduce((acc : {[key: string]: Trip}, elm) => { acc[elm.teamName] = elm; return acc}, {});

export const useTripStore = defineStore('destination', () => {
  var route = localStorage.getItem("route")
  if (!route) {
    route = "nicolai"
  }

  console.log("Pursuing route", route)
  const tripState = ref({
    trip: trips[route],
    index: 0
  })

  const currentStop = computed(() => tripState.value.trip.tour[tripState.value.index])

  function nextStop() {
    tripState.value.index++
    return tripState.value.index
  }

  function setTripProgress(idx : number) {
    tripState.value.index = idx
  }
  
  // return { list, index, currentInfo, currentDestination, nextDestination, setDestination }
  return { tripState, currentStop, nextDestination: nextStop, setDestination: setTripProgress }
})
