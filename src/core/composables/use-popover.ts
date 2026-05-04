import type { Popover } from 'primevue'
import { useId, useTemplateRef } from 'vue'

export const usePopover = () => {
  const refId = useId()

  const popover = useTemplateRef<InstanceType<typeof Popover> | null>(refId)

  const toggleMenu = (event: Event) => {
    popover.value?.toggle(event)
  }

  return {
    refId,
    popover,
    toggleMenu,
  }
}
