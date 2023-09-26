import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

function loadState() {
  const codes = localStorage.getItem('codes')
  if (codes == null) return []
  return JSON.parse(codes)
}

function saveState(codes : string[]) {
  localStorage.setItem('codes', JSON.stringify(codes))
}

export const useCodesStore = defineStore('codes', () => {
  const loadedState = loadState()
  const codes = ref(loadedState)

  function AddCode(code : string) {
    codes.value.push(code)
    saveState(codes.value)
  }

  return { codes, AddCode }
})
