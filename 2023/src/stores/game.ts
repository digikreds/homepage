import { ref, computed, watch } from 'vue'
import { defineStore, type StoreDefinition } from 'pinia'
import { useLocationStore } from './location'
import { useTripStore } from './trip'
import type { TripContext } from './types'
import { useCodesStore } from './codes'

type LatLong = {Latitude: number, Longitude: number}

type LocationHistory = {
  Datum: Date
  Position: LatLong
}

type GameState = {
  TripName: string
  TripProgress: number
  LocationHistory: LocationHistory[]
  LastSync: Date
}

function NewDefaultTripContext(currentPosition : [number,number], currentCodes: string[]) : TripContext {
  return {
    Location: currentPosition, // Gotta get this from somewhere
    Time: new Date(),
    Codes: currentCodes // Get from cookies, or local storage
  }
}

function loadGameState() : GameState {
  const raw_data = localStorage.getItem("game")
  if (raw_data === null || raw_data === "") {
    const initialState : GameState = {
      TripName: "",
      TripProgress: 0,
      LocationHistory: [],
      LastSync: new Date(0)
    }
    return initialState
  }
  const data = atob(raw_data)
  return JSON.parse(data)
}

function saveGameState(state : GameState) {
  const data = JSON.stringify(state)
  localStorage.setItem("game", btoa(data))
}

export const useGameStore = defineStore('game', () => {
  const location = useLocationStore(),
        trip = useTripStore(),
        codes = useCodesStore()

  const initialState : GameState = loadGameState()
  initialState.LastSync = new Date()
  initialState.TripName = trip.tripState.trip.teamName
  const state = ref(initialState)

  trip.setDestination(state.value.TripProgress)

  const currentStepActivation = computed(() => {
    const currentPosition = location.pos,
          currentCodes = codes.codes
    const tripContext = NewDefaultTripContext(currentPosition, currentCodes)
    const currentStep = trip.currentStop
    if (currentStep === undefined) return {Activated: false, Reason: { Type: "error", Info: "No current step"}}
    return currentStep.activation(tripContext)
  })

  function AdvanceTrip() {
    if(currentStepActivation.value.Activated) {
      const progress = trip.nextDestination()
      state.value.TripProgress = progress

      saveGameState(state.value)
    }
  }

  watch(state, (newState, _) => {
    console.log("Saving state")
    saveGameState(newState)
  })
  
  return { state, currentStepActivation, AdvanceTrip}
})
