<template>
  <div class="user-listings">
    <a-typography-title :level="4" class="user-listings__title">
      Listings
    </a-typography-title>
    <a-typography-paragraph class="user-listings__description">
      This section highlights the listings this user currently hosts and has
      made available for bookings.
    </a-typography-paragraph>
    <a-list
      :grid="{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }"
      :dataSource="userListings.result"
      :locale="{ emptyText: `User doesn't have any listings yet!` }"
      :pagination="{
        position: 'top',
        current: listingsPage,
        total: userListings.total,
        defaultPageSize: limit,
        hideOnSinglePage: true,
        showLessItems: true,
        onChange: setListingsPage,
      }"
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
import { defineComponent } from "vue";
import ListingCard from "@/components/ListingCard.vue";

export default defineComponent({
  name: "UserListing",
  components: { ListingCard },
  props: {
    userListings: Object,
    listingsPage: Number,
    limit: Number,
  },
  emits: ["update:listingsPage"],
  setup(_, { emit }) {
    function setListingsPage(page: number) {
      emit("update:listingsPage", page);
    }

    return { setListingsPage };
  },
});
</script>

<style>
</style>
