<template>
  <div class="user-bookings">
    <a-typography-title :level="4" class="user-bookings__title">
      Bookings
    </a-typography-title>
    <a-typography-paragraph class="user-bookings__description">
      This section highlights the bookings you've made, and the
      check-in/check-out dates associated with the said bookings.
    </a-typography-paragraph>
    <a-list
      :grid="{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }"
      :dataSource="userBookings.result"
      :locale="{ emptyText: `You haven't made any bookings!` }"
      :pagination="{
        position: 'top',
        current: bookingsPage,
        total: userBookings.total,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: setBookingsPage,
      }"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <div class="user-bookings__bookings-history">
            <div>
              Check in:
              <a-typography-text strong>{item.checkIn}</a-typography-text>
            </div>
            <div>
              Check out:
              <a-typography-text strong>{item.checkOut}</a-typography-text>
            </div>
          </div>
          <ListingCard :listing="item" />
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListingCard from "@/components/ListingCard.vue";

export default defineComponent({
  name: "UserBookings",
  components: { ListingCard },
  props: {
    userBookings: Object,
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

<style>
</style>
