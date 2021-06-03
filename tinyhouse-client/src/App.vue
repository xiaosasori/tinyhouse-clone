<template>
  <a-layout class="app">
    <div v-if="loading" class="app-skeleton__spin-section">
      <a-spin size="large" tip="Launching Tinyhouse" />
    </div>
    <template v-else>
      <a-affix :offset-top="0" class="app_affix-header">
        <AppHeader />
      </a-affix>
      <router-view />
    </template>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";
import { useMutation } from "@vue/apollo-composable";
import { LOGIN } from "@/lib/graphql";
import { setViewer } from "@/store/viewer";

export default defineComponent({
  name: "App",
  components: { AppHeader },
  setup() {
    const { mutate, loading, onDone: loginSuccess } = useMutation(
      LOGIN,
      () => ({
        variables: {
          input: null,
        },
      })
    );
    mutate();

    loginSuccess((result) => {
      setViewer(result.data.login);
      if (result.data.login.token) {
        sessionStorage.setItem("token", result.data.login.token);
      } else {
        sessionStorage.removeItem("token");
      }
    });

    return { loading };
  },
});
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
