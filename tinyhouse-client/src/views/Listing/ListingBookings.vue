<template>
  <div class="listing-bookings">
    <a-divider />
    <div class="listing-bookings__section">
      <a-typography-title class="listing-bookings__title" :level="4">
        Booking
      </a-typography-title>
    </div>
    <a-list
      :grid="{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 3,
      }"
      :dataSource="listingBookings.result"
      :locale="{ emptyText: 'No bookings have been made yet!' }"
      :pagination="{
        current: bookingsPage,
        total: listingBookings.total,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: setBookingsPage,
      }"
    >
      <template #renderItem="{ item }">
        <a-list-item class="listing-bookings__item">
          <div class="listing-bookings__bookings-history">
            <div>
              Check in:
              <a-typography-text strong>{{ item.checkIn }}</a-typography-text>
            </div>
            <div>
              Check out:
              <a-typography-text strong>{{ item.checkOut }}</a-typography-text>
            </div>
          </div>
          <router-link :to="`/user/${item.tenant.id}`">
            <a-avatar :src="item.tenant.avatar" :size="64" />
          </router-link>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Listing as ListingData } from "@/lib/graphql";

export default defineComponent({
  name: "ListingBookings",
  props: {
    listingBookings: Object as PropType<ListingData["listing"]["bookings"]>,
    bookingsPage: Number,
    limit: Number,
  },
  setup(_, { emit }) {
    function setBookingsPage(page: number) {
      emit("update:bookingsPage", page);
    }

    return { setBookingsPage };
  },
});
</script>
