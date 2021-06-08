<template>
  <a-layout-content class="listings">
    <PageSkeleton v-if="loading" />
    <template v-else-if="error">
      <ErrorBanner description="This listing may not exist or we 've encounted an error. Please try again soon." />
      <PageSkeleton />
    </template>
    <a-row
      v-else
      :gutter="24"
      type="flex"
      justify="space-between"
    >
      <a-col
        :xs="24"
        :lg="14"
      >
        <ListingDetails :listing="listing" />
        <ListingBookings
          v-if="listing.bookings"
          :listing-bookings="listing.bookings"
          :bookings-page="bookingsPage"
          :limit="limit"
          @update:bookingsPage="bookingsPage = $event"
        />
      </a-col>
      <a-col
        :xs="24"
        :lg="10"
      >
        <ListingCreateBooking
          v-model:checkInDate="checkInDate"
          v-model:checkOutDate="checkOutDate"
          :price="listing.price"
          :viewer="viewer"
          :host="listing.host"
          :bookings-index="listing.bookingsIndex"
          @openModal="modalVisible = true"
        />
      </a-col>
      <CreateBookingModal
        v-if="modalVisible"
        :id="listing.id"
        :modal-visible="modalVisible"
        :check-in-date="checkInDate"
        :check-out-date="checkOutDate"
        :price="listing.price"
        @closeModal="modalVisible = false"
      />
    </a-row>
  </a-layout-content>
</template>

<script lang="ts">
import { LISTING } from '@/lib/graphql'
import { useQuery, useResult } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'
import { ref, defineComponent } from 'vue'
import ListingDetails from './ListingDetails.vue'
import ListingBookings from './ListingBookings.vue'
import ListingCreateBooking from './ListingCreateBooking.vue'
import CreateBookingModal from './CreateBookingModal.vue'
import { viewer } from '@/store/viewer'
import { Moment } from 'moment'

export default defineComponent({
  name: 'PageListing',
  components: {
    ListingDetails,
    ListingBookings,
    ListingCreateBooking,
    CreateBookingModal,
  },
  setup() {
    const route = useRoute()
    const PAGE_LIMIT = 3
    const bookingsPage = ref(1)

    const { result, loading, error } = useQuery(LISTING, {
      id: route.params.id,
      limit: PAGE_LIMIT,
      bookingsPage,
    })

    const listing = useResult(result, null, (data) => data.listing)

    const checkInDate = ref<Moment | null>(null)
    const checkOutDate = ref<Moment | null>(null)

    const modalVisible = ref<boolean>(false)
    return {
      checkInDate,
      checkOutDate,
      listing,
      loading,
      error,
      bookingsPage,
      limit: PAGE_LIMIT,
      viewer,
      modalVisible,
    }
  },
})
</script>

<style>
</style>
