<template>
  <h2>Listings</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'PageListings',
  setup() {
    const route = useRoute()
    console.log(route.params.location)
  },
})
</script>

<style>
</style>
