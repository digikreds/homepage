<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer location="right" expand-on-hover rail>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            title="Jane Smith"
            subtitle="SOME WHERE MYSTERIOS BUT USEFUL INFO" ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav >
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="min-height: 99vh">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>

</style>
