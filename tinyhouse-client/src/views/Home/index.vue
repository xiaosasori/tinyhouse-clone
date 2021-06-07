<template>
  <a-layout-content
    class="home"
    style="background-image: url('/src/assets/home/map-background.jpg')"
  >
    <HomeHero @search="search" />

    <div class="home__cta-section">
      <a-typography-title
        :level="2"
        class="home__cta-section-title"
      >
        Your guide for all things rental
      </a-typography-title>
      <a-typography-paragraph>
        Helping you make the best decisions in renting your last minute
        locations.
      </a-typography-paragraph>
      <router-link
        to="/listings/united%20states"
        class="ant-btn ant-btn-primary ant-btn-large home__cta-section-button"
      >
        Popular listings in the United States
      </router-link>
    </div>

    <HomeListingsSkeleton v-if="loading" />
    <HomeListings
      v-else
      title="Premium Listings"
      :listings="listings.result"
    />

    <div class="home__listings">
      <a-typography-title
        :level="4"
        class="home__listings-title"
      >
        Listings of any kind
      </a-typography-title>
      <a-row :gutter="12">
        <a-col
          :xs="24"
          :lg="12"
          style="margin-bottom: 12"
        >
          <router-link to="/listings/san%20fransisco">
            <div class="home__listings-img-cover">
              <img
                src="@/assets/home/san-fransisco.jpg"
                alt="San Fransisco"
                class="home__listings-img"
                loading="lazy"
              >
            </div>
          </router-link>
        </a-col>
        <a-col
          :xs="24"
          :lg="12"
          style="margin-bottom: 12"
        >
          <router-link to="/listings/cancún">
            <div class="home__listings-img-cover">
              <img
                src="@/assets/home/cancun.jpg"
                alt="Cancún"
                class="home__listings-img"
                loading="lazy"
              >
            </div>
          </router-link>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>
</template>

<script lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable'
import { defineComponent } from 'vue'
import { ListingsFilter } from '@/lib/graphql/globalTypes'
import { LISTINGS, ListingsData } from '@/lib/graphql'
import HomeListingsSkeleton from './HomeListingsSkeleton.vue'
import HomeListings from './HomeListings.vue'
import HomeHero from './HomeHero.vue'
import { useRouter } from 'vue-router'
import { displayErrorMessage } from '@/utils'

export default defineComponent({
  name: 'PageHome',
  components: { HomeListingsSkeleton, HomeListings, HomeHero },
  setup() {
    const router = useRouter()
    const PAGE_LIMIT = 4
    const PAGE_NUMBER = 1

    const { result, loading } = useQuery<ListingsData>(
      LISTINGS,
      {
        filter: ListingsFilter.PRICE_HIGH_TO_LOW,
        limit: PAGE_LIMIT,
        page: PAGE_NUMBER,
      },
      {
        fetchPolicy: 'cache-and-network',
      }
    )
    const listings = useResult(result)

    const search = (value: string) => {
      console.log('search', value)
      const trimmedValue = value.trim()
      if (trimmedValue) {
        router.push(`/listings/${trimmedValue}`)
      } else {
        displayErrorMessage('Please enter a valid search!')
      }
    }

    return { listings, loading, search }
  },
})
</script>

<style>
</style>
