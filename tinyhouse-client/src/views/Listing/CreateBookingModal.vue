<template>
  <a-modal
    :visible="modalVisible"
    centered
    :footer="null"
    @cancel="$emit('closeModal')"
  >
    <div class="listing-booking-modal">
      <div class="listing-booking-modal__intro">
        <a-typography-title class="listing-booking-modal__intro-title">
          <KeyOutlined />
        </a-typography-title>
        <a-typography-title
          class="listing-booking-modal__intro-title"
          :level="3"
        >
          Book your trip
        </a-typography-title>
        <a-typography-paragraph>
          Enter your payment information to book the listing between
          <a-typography-text
            strong
            mark
          >
            {{ checkInDate.format("MMMM Do YYYY") }}
          </a-typography-text>
          and
          <a-typography-text
            strong
            mark
          >
            {{ checkOutDate.format("MMMM Do YYYY") }}
          </a-typography-text>
          , inclusive.
        </a-typography-paragraph>
      </div>
      <a-divider />

      <div class="listing-booking-modal__charge-summary">
        <a-typography-paragraph>
          {{ formattedPrice }} * {{ daysBooked }} days =&nbsp;
          <a-typography-text strong>
            {{ formattedListingPrice }}
          </a-typography-text>
        </a-typography-paragraph>

        <a-typography-paragraph class="listing-booking-modal__charge-summary-total">
          Total =
          <a-typography-text
            strong
            mark
          >
            {{ formattedListingPrice }}
          </a-typography-text>
        </a-typography-paragraph>
      </div>
      <a-divider />
      <div class="listing-booking-modal__stripe-card-section">
        <!-- <CardElement
            hidePostalCode
            class="listing-booking-modal__stripe-card"
          /> -->
        <a-button
          size="large"
          type="primary"
          class="listing-booking-modal__cta"
          :loading="loading"
          @click="handleCreateBooking"
        >
          Book
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Moment } from 'moment'
import { useMutation } from '@vue/apollo-composable'
import { CREATE_BOOKING } from '@/lib/graphql'
import { KeyOutlined } from '@ant-design/icons-vue'
import {
  displayErrorMessage,
  displaySuccessNotification,
  formatListingPrice,
} from '@/utils'

export default defineComponent({
  name: 'CreateBookingModal',
  components: { KeyOutlined },
  props: {
    id: String,
    modalVisible: Boolean,
    price: Number,
    checkInDate: Object as PropType<Moment>,
    checkOutDate: Object as PropType<Moment>,
  },
  emits: ['closeModal', 'clearBookingData'],
  setup(props, { emit }) {
    const { mutate, loading, onDone, onError } = useMutation(CREATE_BOOKING)

    onDone(() => {
      emit('clearBookingData')
      displaySuccessNotification(
        "You've succesfully booked the listing!",
        'Booking history can always be found in your User page.'
      )
    })

    onError(() => {
      displayErrorMessage(
        "Sorry! We were'nt able to successfully book the listing. Please try again later."
      )
    })

    const daysBooked = props.checkOutDate.diff(props.checkInDate, 'days') + 1
    const listingPrice = daysBooked * props.price

    const handleCreateBooking = async () => {
      if (!stripe) {
        return displayErrorMessage(
          "Sorry! We weren't able to connect with Stripe."
        )
      }

      const { token, error } = await stripe.createToken()

      if (token) {
        createBooking({
          variables: {
            input: {
              source: token.id,
              checkIn: props.checkInDate.format('YYYY-MM-DD'),
              checkOut: props.checkOutDate.format('YYYY-MM-DD'),
              id: props.id,
            },
          },
        })
      } else {
        return displayErrorMessage(
          error && error.message
            ? error.message
            : "Sorry! We weren't able to book the listing. Please try again later."
        )
      }
    }

    const formattedListingPrice = computed(() => {
      return formatListingPrice(listingPrice, false)
    })

    const formattedPrice = computed(() => {
      return formatListingPrice(props.price, false)
    })

    return {
      loading,
      handleCreateBooking,
      formattedPrice,
      formattedListingPrice,
      daysBooked,
    }
  },
})
</script>

<style>
</style>
