<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import HeaderBar from './components/HeaderBar.vue'
</script>

<template>
  <header>
    <HeaderBar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <NavBar />
  </footer>
</template>
