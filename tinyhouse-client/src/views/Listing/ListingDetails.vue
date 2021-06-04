<template>
  <div class="listing-details">
    <div
      class="listing-details__image"
      :style="{
        backgroundImage: `url(${listing.image})`,
      }"
    />
    <div class="listing-details__information">
      <a-typography-paragraph
        type="secondary"
        class="listing-details__city-address"
      >
        <router-link :to="`/listings/${listing.city}`">
          <EnvironmentOutlined :style="{ color: iconColor }" />
          {{ listing.city }}
        </router-link>

        <a-divider type="vertical" />
        {{ listing.address }}
      </a-typography-paragraph>
      <a-typography-title :level="3" class="listing-details__title">
        {{ listing.title }}
      </a-typography-title>
    </div>
    <a-divider />
    <div class="listing-details__section">
      <router-link :to="`/user/${listing.host.id}`">
        <a-avatar :src="listing.host.avatar" :size="64" />
        <a-typography-title :level="2" class="listing-details__host-name">
          {{ listing.host.name }}
        </a-typography-title>
      </router-link>
    </div>
    <a-divider />
    <div class="listing-details__section">
      <a-typography-title :level="4">About this space</a-typography-title>
      <div class="listing-details__about-items">
        <a-tag color="magenta">{{ listing.type }}</a-tag>
        <a-tag color="magenta">{{ listing.numOfGuests }}</a-tag>
      </div>
      <a-typography-paragraph>
        {{ listing.description }}
      </a-typography-paragraph>
    </div>
  </div>
</template>

<script lang="ts">
import { Listing as ListingData } from "@/lib/graphql";
import { defineComponent, PropType } from "vue";
import { EnvironmentOutlined } from "@ant-design/icons-vue";
import { iconColor } from "@/utils";

export default defineComponent({
  name: "ListingDetails",
  components: { EnvironmentOutlined },
  props: {
    listing: Object as PropType<ListingData["listing"]>,
  },
  setup() {
    return { iconColor };
  },
});
</script>

<style>
</style>
