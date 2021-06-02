<template>
  <a-layout-content class="not-found">
      <a-empty>
        <template #description>
          <a-typography-text class="not-found__description-title">
              Uh oh! Something went wrong :(
            </a-typography-text>
            <a-typography-text class="not-found__description-subtitle">
              The page you're looking for can't be found
            </a-typography-text>
        </template>
      </a-empty>
      <router-link
        to="/"
        class="not-found__cta ant-btn ant-btn-primary ant-btn-large"
      >
        Go to home
      </router-link>
    </a-layout-content>
</template>

<script>
export default {

}
</script>

<style>

</style>
