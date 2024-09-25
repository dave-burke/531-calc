<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify'
import { useLocalStorage } from '@vueuse/core'
import '@mdi/font/css/materialdesignicons.css'
import { onMounted } from 'vue'

const theme = useTheme()

const themeName = useLocalStorage('theme', 'light')

function toggleTheme() {
  themeName.value = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = themeName.value
}

onMounted(() => {
  theme.global.name.value = themeName.value
})
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar color="primary" density="compact">
        <v-app-bar-title>531 Calculator</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="toggleTheme" icon>
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-sheet max-width="450" class="mx-auto px-4">
          <RouterView />
        </v-sheet>
      </v-main>
      <v-bottom-navigation>
        <v-btn to="/">
          <v-icon icon="mdi-home"></v-icon>
          <span>Home</span>
        </v-btn>
        <v-btn to="/settings">
          <v-icon icon="mdi-cog"></v-icon>
          <span>Settings</span>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-app>
</template>
