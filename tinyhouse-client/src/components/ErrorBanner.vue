<template>
  <a-alert
    banner
    closable
    :message="message"
    :description="description"
    type="error"
    class="error-banner"
  />
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Uh oh! Something went wrong :('
    },
    description: {
      type: String,
      default: 'Looks like something went wrong. Please check your connection and/or try again later.'
    }
  }
}
</script>
