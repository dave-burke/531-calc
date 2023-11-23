import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useTrainingMaxStore = defineStore('trainingMax', () => {
  const squatMax = useLocalStorage('squatMax', 0)
  const benchMax = useLocalStorage('benchMax', 0)
  const deadMax = useLocalStorage('deadMax', 0)
  const pressMax = useLocalStorage('pressMax', 0)

  return { squatMax, benchMax, deadMax, pressMax }
})
