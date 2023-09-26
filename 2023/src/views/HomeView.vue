<script setup lang="ts">
import { useLocationStore } from '@/stores/location'
import {useGameStore } from '@/stores/game'
import Direction from '@/components/Direction.vue'
import { computed } from 'vue'

const location = useLocationStore()
const game = useGameStore()

const stepActivated = computed(() => {
  return game.currentStepActivation
})

</script>

<template>
  <v-container class="mt-3">
    <v-row>
      <p class="text-h5">Jagter lige nu:</p>
    </v-row>
    <v-row align="center" v-if="!stepActivated.Activated"><v-col>
      <span v-if="stepActivated.Reason.Type == 'heading'">
        <Direction :direction="stepActivated.Reason.Info" />
      </span>
      <span v-else-if="stepActivated.Reason.Type == 'text'">
          <div
            class="text-h6 bg-purple-darken-2 font-weight-black pa-10 elevation-4 rounded"
            v-html="stepActivated.Reason.Info"></div>
      </span>
    </v-col></v-row>
    <v-row align="center" v-if="stepActivated.Activated"><v-col>
      <span v-html="stepActivated.Reason.Info"></span>
      <button></button>
    </v-col></v-row>
  </v-container>
</template>
