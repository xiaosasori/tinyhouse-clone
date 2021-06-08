<template>
  <div class="user-profile">
    <a-card class="user-profile__card">
      <div class="user-profile__avatar">
        <a-avatar
          :src="user.avatar"
          :size="100"
        />
      </div>
      <a-divider />
      <div class="user-profile__details">
        <a-typography-title :level="4">
          Details
        </a-typography-title>
        <a-typography-paragraph>
          Name: <a-typography-text strong>
            {{ user.name }}
          </a-typography-text>
          <a-typography-paragraph>
            Contact:
            <a-typography-text strong>
              {{ user.contact }}
            </a-typography-text>
          </a-typography-paragraph>
        </a-typography-paragraph>
      </div>
      <!-- logged in user views his profile -->
      <template v-if="viewerIsUser">
        <a-divider />
        <div class="user-profile__details">
          <a-typography-title :level="4">
            Additional Details
          </a-typography-title>
          <!-- if user has wallet -->
          <template v-if="viewer.hasWallet">
            <a-typography-paragraph>
              <a-tag color="green">
                Stripe Registered
              </a-tag>
            </a-typography-paragraph>
            <a-typography-paragraph>
              Icome Earned:&nbsp;
              <a-typography-text strong>
                {{ income }}
              </a-typography-text>
            </a-typography-paragraph>
            <a-button
              type="danger"
              class="user-profile__details-cta"
              :loading="loading"
              @click="disconnectStripe"
            >
              Disconnect Stripe
            </a-button>
            <a-typography-paragraph type="secondary">
              By disconnecting, you won't be able to recieve
              <a-typography-text strong>
                any further payments
              </a-typography-text>. This will prevent users from
              booking listings that you might have already created.
            </a-typography-paragraph>
          </template>
          <!-- if user have no wallet -->
          <template v-else>
            <a-typography-paragraph>
              Interested in becoming a TinyHouse host? Register with your Stripe
              account!
            </a-typography-paragraph>
            <a-button
              type="primary"
              class="user-profile__details-cta"
              @click="redirectToStripe"
            >
              Connect with Stripe
            </a-button>
            <a-typography-paragraph type="secondary">
              TinyHouse uses
              <a
                href="https://stripe.com/en-US/connect"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stripe
              </a>
              to help transfer your earnings in a secure and trusted manner.
            </a-typography-paragraph>
          </template>
        </div>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from 'vue'
import { User, DISCONNECT_STRIPE } from '@/lib/graphql'
import { formatListingPrice } from '@/utils'
import { useMutation } from '@vue/apollo-composable'
import { setViewer } from '@/store/viewer'
import { displaySuccessNotification, displayErrorMessage } from '@/utils'

export default defineComponent({
  name: 'UserProfile',
  props: {
    user: Object as PropType<User>,
    viewer: Object,
    viewerIsUser: Boolean,
  },
  setup(props) {
    // https://stripe.com/docs/connect/oauth-reference
    const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${
      import.meta.env.VITE_S_CLIENT_ID
    }&scope=read_write`

    function redirectToStripe() {
      window.location.href = stripeAuthUrl
    }

    const income = computed(() => {
      return props.user.income ? formatListingPrice(props.user.income) : '0$'
    })

    // disconnect stripe
    const { mutate, loading, onDone, onError } = useMutation(DISCONNECT_STRIPE)
    function disconnectStripe() {
      mutate()
    }

    onDone((result) => {
      setViewer({ hasWallet: result.data.disconnectStripe.hasWallet })
      displaySuccessNotification(
        "You've successfully disconnected from Stripe!",
        "You'll have to reconnect with Stripe to continue to create listings."
      )
    })

    onError(() => {
      displayErrorMessage(
        "Sorry! We were'nt able to disconnect you from Stripe. Please try again later!"
      )
    })

    return { redirectToStripe, disconnectStripe, income, loading }
  },
})
</script>

