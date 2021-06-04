<template>
  <div class="user-profile">
    <a-card class="user-profile__card">
      <div class="user-profile__avatar">
        <a-avatar :src="user.avatar" :size="100" />
      </div>
      <a-divider />
      <div class="user-profile__details">
        <a-typography-title :level="4">Details</a-typography-title>
        <a-typography-paragraph>
          Name: <a-typography-text strong>{{ user.name }}</a-typography-text>
          <a-typography-paragraph>
            Contact:
            <a-typography-text strong>{{ user.contact }}</a-typography-text>
          </a-typography-paragraph>
        </a-typography-paragraph>
      </div>
      <template v-if="viewerIsUser">
        <a-divider />
        <div class="user-profile__details">
          <a-typography-title :level="4">Additional Details</a-typography-title>
          <!-- {additionalDetails} -->
          <template v-if="true">
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
import { PropType } from "vue";
import { User } from "@/lib/graphql";
export default {
  props: {
    user: Object as PropType<User>,
    viewerIsUser: Boolean,
  },
  methods: {
    redirectToStripe() {},
  },
};
</script>

<style>
</style>
