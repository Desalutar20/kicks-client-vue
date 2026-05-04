import { watchEffect, type MaybeRefOrGetter, toValue } from 'vue'

export function useBodyClass(className: string, active: MaybeRefOrGetter<boolean>) {
  watchEffect((onCleanup) => {
    document.body.classList.toggle(className, toValue(active))

    onCleanup(() => {
      document.body.classList.remove(className)
    })
  })
}
