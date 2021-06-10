<template>
  <a-layout-content class="user">
    <ErrorBanner
      v-if="stripeError"
      description="We had an issue connecting with Stripe. Please try again soon."
    />
    <PageSkeleton v-if="loading && !user" />
    <template v-else-if="error">
      <ErrorBanner description="This user may not exist or we 've encountered an error. Please try again soon" />
      <PageSkeleton />
    </template>
    <a-row
      v-else
      :gutter="12"
      type="flex"
      justify="space-between"
    >
      <a-col :xs="24">
        <UserProfile
          :user="user"
          :viewer="viewer"
          :viewer-is-user="viewerIsUser"
        />
      </a-col>
      <a-col :xs="24">
        <UserListings
          :user-listings="user.listings"
          :limit="limit"
          :listings-page="listingsPage"
          @update:listingsPage="listingsPage = $event"
        />
        <UserBookings
          v-if="user.bookings"
          :user-bookings="user.bookings"
          :limit="limit"
          :bookings-page="bookingsPage"
          @update:bookingsPage="bookingsPage = $event"
        />
      </a-col>
    </a-row>
  </a-layout-content>
</template>

<script lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable'
import { User as UserData, USER } from '@/lib/graphql'
import { useRoute } from 'vue-router'
import { reactive, toRefs, computed, defineComponent } from 'vue'
import { viewer } from '@/store/viewer'
import UserProfile from './UserProfile.vue'
import UserListings from './UserListings.vue'
import UserBookings from './UserBookings.vue'

export default defineComponent({
  name: 'PageUser',
  components: { UserProfile, UserListings, UserBookings },
  setup() {
    const route = useRoute()
    const PAGE_LIMIT = 4
    const variables = reactive({
      id: route.params.id,
      bookingsPage: 1,
      listingsPage: 1,
      limit: PAGE_LIMIT
    })
    const { result, loading, error } = useQuery<UserData>(
      USER,
      variables,
      {
        fetchPolicy: 'cache-and-network',
      }
    )

    const user = useResult(result, null, (data) => data.user)
    const viewerIsUser = computed(() => {
      return viewer.id === route.params.id
    })

    // handle error redirected from page strip
    const stripeError = new URL(window.location.href).searchParams.get(
      'stripe_error'
    )

    return {
      user,
      loading,
      error,
      viewer,
      viewerIsUser,
      ...toRefs(variables),
      stripeError,
    }
  },
})
</script>

<style>
</style>
