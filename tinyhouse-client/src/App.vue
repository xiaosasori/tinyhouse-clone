<template>
  <a-layout class="app">
    <a-affix :offset-top="0" class="app_affix-header">
      <AppHeader />
    </a-affix>
    <router-view />
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader.vue'

export default defineComponent({
  name: 'App',
  components: {AppHeader}
})
</script>

<style>
.app {
  position: relative;
  background: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}
</style>
