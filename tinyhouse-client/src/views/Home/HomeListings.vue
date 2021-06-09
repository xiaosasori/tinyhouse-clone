<template>
  <div class="home-listings">
    <a-typography-title
      :level="4"
      class="home-listings__title"
    >
      {{ title }}
    </a-typography-title>
    <a-list
      :grid="{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }"
      :data-source="listings"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <ListingCard :listing="item" />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ListingCard from '@/components/ListingCard.vue'

export default defineComponent({
  name: 'HomeListings',
  components: { ListingCard },
  props: {
    title: String,
    listings: Array,
  },
})
</script>
