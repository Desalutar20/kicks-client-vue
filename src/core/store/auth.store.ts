// import { computed, ref } from 'vue'
// import { defineStore } from 'pinia'
// import type { User } from '@/core/types/user.type.ts'
//
// export const useAuthStore = defineStore('auth', () => {
//   const user = ref<User | null>(null)
//
//   const setUser = (u: User | null) => {
//     user.value = u
//   }
//
//   const isAuth = computed(() => !!user.value)
//
//   return {
//     isAuth,
//     setUser,
//     get user() {
//       return user.value
//     },
//   }
// })
