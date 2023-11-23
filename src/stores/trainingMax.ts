import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTrainingMaxStore = defineStore('trainingMax', () => {
  const squatMax = ref(0)
  const benchMax = ref(0)
  const deadMax = ref(0)
  const pressMax = ref(0)

  return { squatMax, benchMax, deadMax, pressMax }
})
