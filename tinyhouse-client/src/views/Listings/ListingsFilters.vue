<template>
  <div class="listings-filters">
    <span>Filter By</span>
    <a-select v-model:value="filterLocal">
      <a-select-option :value="ListingsFilter.PRICE_LOW_TO_HIGH">
        Price: Low to High
      </a-select-option>
      <a-select-option :value="ListingsFilter.PRICE_HIGH_TO_LOW">
        Price: High to Low
      </a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts">
import { ListingsFilter } from '@/lib/graphql/globalTypes'
import { PropType, defineComponent } from 'vue'
import { useVModel } from '@/composables'

export default defineComponent({
  name: 'ListingsFilters',
  props: {
    filter: String as PropType<ListingsFilter>,
  },
  emits: ['update:filter'],
  setup(props) {
    const filterLocal = useVModel(props, 'filter')
    return { filterLocal, ListingsFilter }
  },
})
</script>
