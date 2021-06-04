<template>
  <router-link :to="`/listing/${listing.id}`">
    <a-card hoverable>
      <template #cover>
        <div
          class="listing-card__cover-img"
          :style="{ backgroundImage: `url(${listing.image})` }"
        />
      </template>
      <div class="listing-card__details">
        <div class="listing-card__description">
          <a-typography-title :level="4" class="listing-card__price">
            {{ formatListingPrice(listing.price) }}
            <span>/day</span>
          </a-typography-title>
          <a-typography-text strong ellipsis class="listing-card__title">
            {{ listing.title }}
          </a-typography-text>
          <a-typography-text ellipsis class="listing-card__address">
            {{ listing.address }}
          </a-typography-text>
        </div>
        <div class="listing-card__dimensions listing-card__dimensions--guests">
          <UserOutlined :style="{ color: iconColor }" />
          <a-typography-text
            >{{ listing.numOfGuests }} guests</a-typography-text
          >
        </div>
      </div>
    </a-card>
  </router-link>
</template>

<script lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
import { defineComponent, PropType } from "vue";
import { iconColor, formatListingPrice } from "@/utils";

interface listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
}

export default defineComponent({
  name: "ListingCard",
  components: { UserOutlined },
  props: {
    listing: Object as PropType<listing>,
  },
  setup() {
    return { iconColor, formatListingPrice };
  },
});
</script>

