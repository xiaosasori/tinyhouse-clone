<template>
  <div class="listing-booking">
    <a-card class="listing-booking__card">
      <div>
        <a-typography-paragraph>
          <a-typography-title
            :level="2"
            class="listing-booking__card-title"
          >
            {{ formatPrice }}
            <span>/day</span>
          </a-typography-title>
        </a-typography-paragraph>
        <a-divider />
        <div class="listing-booking__card-date-picker">
          <a-typography-paragraph strong>
            Check In
          </a-typography-paragraph>
          <a-date-picker
            v-model:value="checkInDateLocal"
            :disabled-date="disabledDate"
            :disabled="checkInInputDisabled"
            format="YYYY/MM/DD"
            :show-today="false"
            @openChange="checkOutDateLocal = null"
          />
        </div>
        <div class="listing-booking__card-date-picker">
          <a-typography-paragraph strong>
            Check Out
          </a-typography-paragraph>
          <a-date-picker
            :value="checkOutDateLocal"
            format="YYYY/MM/DD"
            :disabled-date="disabledDate"
            :show-today="false"
            :disabled="checkOutInputDisabled"
            @change="verifyAndSetCheckOutDate"
          />
        </div>
      </div>
      <a-divider />
      <a-button
        size="large"
        type="primary"
        class="listing-booking__card-cta"
        :disabled="buttonDisabled"
        @click="$emit('openModal')"
      >
        Request to book!
      </a-button>
      <a-typography-text
        type="secondary"
        mark
      >
        {{ buttonMessage }}
      </a-typography-text>
    </a-card>
  </div>
</template>

<script lang="ts">
import moment, { Moment } from 'moment'
import { PropType, defineComponent, computed } from 'vue'
import { Viewer } from '@/lib/types'
import { Listing as ListingData } from '@/lib/graphql'
import { formatListingPrice, displayErrorMessage } from '@/utils'
import { useVModel } from '@/composables/useVModel'

interface BookingsIndexMonth {
  [key: string]: boolean
}

interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth
}

interface BookingsIndex {
  [key: string]: BookingsIndexYear
}

export default defineComponent({
  name: 'ListingCreateBooking',
  props: {
    price: Number,
    checkInDate: Object as PropType<Moment | null>,
    checkOutDate: Object as PropType<Moment | null>,
    viewer: Object as PropType<Viewer>,
    host: Object as PropType<ListingData['listing']['host']>,
    bookingsIndex: String,
  },
  emits: ['update:checkInDate', 'update:checkOutDate', 'openModal'],
  setup(props) {
    const checkInDateLocal = useVModel(props, 'checkInDate')
    const checkOutDateLocal = useVModel(props, 'checkOutDate')

    const bookingsIndexJson: BookingsIndex = JSON.parse(props.bookingsIndex)

    const dateIsBooked = (currentDate: Moment): boolean => {
      const year = currentDate.year()
      const month = currentDate.month()
      const day = currentDate.date()

      if (bookingsIndexJson[year] && bookingsIndexJson[year][month]) {
        return Boolean(bookingsIndexJson[year][month][day])
      }

      return false
    }

    const disabledDate = (currentDate: Moment | null): boolean => {
      if (currentDate) {
        // days before today and today
        const dateIsBeforeEndOfDay = currentDate.isBefore(moment().endOf('day'))
        return dateIsBeforeEndOfDay || dateIsBooked(currentDate)
      }
      return false
    }

    const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
      if (checkInDateLocal.value && selectedCheckOutDate) {
        if (
          moment(selectedCheckOutDate).isBefore(checkInDateLocal.value, 'days')
        ) {
          return displayErrorMessage(
            `You can't book date of check out to be prior to check in!`
          )
        }
        let dateCursor = checkInDateLocal.value
        while (moment(dateCursor).isBefore(selectedCheckOutDate, 'days')) {
          dateCursor = moment(dateCursor).add(1, 'days')
          const year = dateCursor.year()
          const month = dateCursor.month()
          const day = dateCursor.date()

          if (
            bookingsIndexJson[year] &&
            bookingsIndexJson[year][month] &&
            bookingsIndexJson[year][month][day]
          ) {
            return displayErrorMessage(
              "you can't book a period of time that overlaps existing bookings. Please try again!"
            )
          }
        }
      }
      checkOutDateLocal.value = selectedCheckOutDate
    }

    const viewerIsHost = props.viewer.id === props.host.id
    const checkInInputDisabled = computed(() => {
      return !props.viewer.id || viewerIsHost || !props.host.hasWallet
    })
    const checkOutInputDisabled = computed(
      () => checkInDateLocal.value === null
    )
    const buttonDisabled = computed(() => {
      return checkInDateLocal.value === null || checkOutDateLocal.value === null
    })

    let buttonMessage = props.viewer.id
      ? "You won't be charged yet"
      : 'You have to be signed in to book a listing!'

    if (viewerIsHost) {
      buttonMessage = "You can't book your own listing!"
    }

    if (!props.host.hasWallet) {
      buttonMessage =
        "The host has disconnected from Stripe and thus won't be able to recieve payments!"
    }
    const formatPrice = computed(() => {
      return formatListingPrice(props.price)
    })
    return {
      disabledDate,
      verifyAndSetCheckOutDate,
      buttonMessage,
      buttonDisabled,
      checkOutInputDisabled,
      checkInInputDisabled,
      checkInDateLocal,
      checkOutDateLocal,
      formatPrice,
    }
  },
})
</script>

<style>
</style>
