<template>
  <a-layout-content className="listings">
    <PageSkeleton v-if="loading" />
    <template v-else-if="error">
      <ErrorBanner
        description="This listing may not exist or we 've encounted an error. Please try again soon."
      />
      <PageSkeleton />
    </template>
    <a-row v-else :gutter="24" type="flex" justify="space-between">
      <a-col :xs="24" :lg="14">
        <ListingDetails :listing="listing" />
        <ListingBookings
          v-if="listing.bookings"
          :listingBookings="listing.bookings"
          :bookingsPage="bookingsPage"
          @update:bookingsPage="bookingsPage = $event"
          :limit="limit"
        />
      </a-col>
      <!-- <a-col :xs="24" :lg="10">
          {listingCreateBookingElement}
        </a-col> -->
    </a-row>
    <!-- {listingCreateBookingModalElement} -->
  </a-layout-content>
</template>

<script>
import { LISTING } from "@/lib/graphql";
import { useQuery, useResult } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { ref } from "vue";
import ListingDetails from "./ListingDetails.vue";
import ListingBookings from "./ListingBookings.vue";

export default {
  name: "PageListing",
  components: { ListingDetails, ListingBookings },
  setup() {
    const route = useRoute();
    const PAGE_LIMIT = 3;
    const bookingsPage = ref(1);
    const { result, loading, error } = useQuery(LISTING, {
      id: route.params.id,
      limit: PAGE_LIMIT,
      bookingsPage,
    });

    const listing = useResult(result, null, (data) => data.listing);

    return { listing, loading, error, bookingsPage, limit: PAGE_LIMIT };
  },
};
</script>

<style>
</style>
