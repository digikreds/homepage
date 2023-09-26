<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import {useGameStore } from '@/stores/game'
import { ref } from 'vue';

const game = useGameStore()

const confirmationDialog = ref(false)

function advanceTrip(){
  game.AdvanceTrip()
  confirmationDialog.value = false
}

</script>

<template>
  <v-card>
    <v-layout>
      <v-main style="min-height: 99vh">
        <router-view></router-view>
      </v-main>
      <v-bottom-navigation>
        <v-btn 
          v-if="game.currentStepActivation.Activated"
          @click="confirmationDialog = true">Næste Post!</v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-card>

  <v-dialog
    v-model="confirmationDialog"
    width = "auto"
  >
    <v-card>
      <v-card-title class="text-h5">Er du sikker?</v-card-title>
      <v-card-text>
        Du kan ikke gå tilbage og se denne information igen
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="advanceTrip">Gå videre</v-btn>
        <v-btn @click="confirmationDialog = false">Tilbage</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
