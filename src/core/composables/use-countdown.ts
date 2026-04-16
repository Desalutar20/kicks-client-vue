import { onBeforeUnmount, ref } from 'vue'

export function useCountdown({
  seconds: initial,
  onFinish,
}: {
  seconds: number
  onFinish: () => void
}) {
  let interval: ReturnType<typeof setInterval> | null = null
  const seconds = ref(initial)

  const start = () => {
    if (interval) return

    interval = setInterval(() => {
      seconds.value--

      if (seconds.value <= 0) {
        stop()
        onFinish()
      }
    }, 1000)
  }

  const stop = () => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  onBeforeUnmount(() => {
    stop()
  })

  return { seconds, start, stop }
}
