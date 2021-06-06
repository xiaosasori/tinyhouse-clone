import { computed, getCurrentInstance } from 'vue'

export const useVModel = (props: Record<string, unknown>, propName: string) => {
  const vm = getCurrentInstance()?.proxy

  return computed({
    get() {
      return props[propName]
    },
    set(value) {
      vm?.$emit(`update:${propName}`, value)
    }
  })
}
