<template></template>

<script lang="ts">
import moment, { Moment } from "moment";
import { PropType, defineComponent } from "vue";
export default defineComponent({
  name: "ListingCreateBooking",
  props: {
    price: Number,
    checkInDate: Object as PropType<Moment | null>,
    checkOutDate: Object as PropType<Moment | null>,
  },
});
</script>

<style>
</style>
