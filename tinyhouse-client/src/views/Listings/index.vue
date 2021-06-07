<template>
  <a-layout-content class="listings">
    <ListingsSkeleton v-if="loading" />
    <template v-else-if="error">
      <ErrorBanner description="We either couldn't find anything matching your search or we've encountered an error. If you're searching for a unique location, try searching again with more common keywords." />
      <ListingsSkeleton />
    </template>
    <template v-else>
      <a-typography-title
        :level="3"
        class="listings__title"
      >
        Results for "{{ listings.region }}"
      </a-typography-title>
      <div v-if="listings.result.length > 0">
        <a-affix :offset-top="64">
          <a-pagination
            v-model:current="page"
            :default-page-size="limit"
            :total="listings.total"
            hide-on-single-page
            show-less-items
            class="listings-pagination"
          />
          <ListingsFilters v-model:filter="filter" />
        </a-affix>

        <a-list
          :grid="{
            gutter: 8,
            lg: 4,
            sm: 2,
            xs: 1
          }"
          :data-source="listings.result"
        >
          <template #renderItem="{item}">
            <a-list-item>
              <ListingCard :listing="item" />
            </a-list-item>
          </template>
        </a-list>
      </div>
      <div v-else>
        <a-typography-paragraph>
          It appears that no listings have been created for
          <a-typography-text mark>
            {{ listingsRegion }}
          </a-typography-text>
        </a-typography-paragraph>
        <a-typography-paragraph>
          Be the first person to create a&nbsp;
          <router-link to="/host">
            listing in this area!
          </router-link>
        </a-typography-paragraph>
      </div>
    </template>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import { ListingsFilter } from '@/lib/graphql/globalTypes'
import { LISTINGS } from '@/lib/graphql'
import ListingsSkeleton from './ListingsSkeleton.vue'
import ListingsFilters from './ListingsFilters.vue'
import ListingCard from '@/components/ListingCard.vue'

export default defineComponent({
  name: 'PageListings',
  components: { ListingsSkeleton, ListingsFilters, ListingCard },
  setup() {
    const route = useRoute()
    const PAGE_LIMIT = 4
    const location = ref<string>(route.params.location)
    const filter = ref<ListingsFilter>(ListingsFilter.PRICE_LOW_TO_HIGH)
    const page = ref<number>(1)

    const { result, loading, error } = useQuery(LISTINGS, {
      filter,
      location,
      limit: PAGE_LIMIT,
      page,
    })
    const listings = useResult(result)

    return {
      filter,
      location,
      page,
      limit: PAGE_LIMIT,
      listings,
      loading,
      error,
      ListingsFilter,
    }
  },
})
</script>

<style>
</style>
