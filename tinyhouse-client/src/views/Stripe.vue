<template>
  <a-layout-content
    v-if="loading"
    class="stripe"
  >
    <a-spin
      size="large"
      tip="Connecting your stripe account..."
    />
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { CONNECT_STRIPE } from '@/lib/graphql'
import { useMutation } from '@vue/apollo-composable'
import { viewer, setViewer } from '@/store/viewer'
import { displaySuccessNotification } from '@/utils'

export default defineComponent({
  name: 'PageStripe',
  setup() {
    const router = useRouter()
    const code = new URL(window.location.href).searchParams.get('code')
    const { mutate, loading, onError, onDone } = useMutation(CONNECT_STRIPE, {
      variables: { input: { code } },
    })
    if (code) {
      mutate()
    } else {
      router.replace('/login')
    }

    onDone((result) => {
      setViewer({ hasWallet: result.data.connectStripe.hasWallet })
      displaySuccessNotification(
        "You 've successfully connected your Stripe Account!",
        'You can now begin to create listings in the Host page.'
      )
      router.push(`/user/${viewer.id}`)
    })

    onError(() => {
      router.push(`/user/${viewer.id}?stripe_error=true`)
    })
    return { loading }
  },
})
</script>
