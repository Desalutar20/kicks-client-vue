import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

export const useDebounce = <T>(value: MaybeRefOrGetter<T>, delay = 1000) => {
  const debounced = ref<T>(toValue(value))

  watch(
    () => toValue(value),
    (newValue, _, onCleanup) => {
      const timeoutId = setTimeout(() => {
        debounced.value = newValue
      }, delay)

      onCleanup(() => {
        clearTimeout(timeoutId)
      })
    },
  )

  return debounced
}
