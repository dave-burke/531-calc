<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import '@mdi/font/css/materialdesignicons.css'
</script>

<template>
  <v-app>
    <v-layout>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>531 Calc</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <v-bottom-navigation>
      <v-btn value="home">
        <v-icon icon="mdi-home"></v-icon>
        <span>Home</span>
      </v-btn>
    </v-bottom-navigation>
    </v-layout>
  </v-app>
</template>
