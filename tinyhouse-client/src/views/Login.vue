<template>
  <a-layout-content class="log-in">
    <a-spin v-if="loginLoading" size="large" tip="Logging you in..." />
    <ErrorBanner
      v-else-if="loginError"
      description="Sorry! We weren't able to log you in. Please try again later!"
    />

    <a-card class="log-in-card">
      <div class="log-in-card__intro">
        <a-typography-title :level="3" class="log-in-card__intro-title">
          <span role="img" aria-label="wave"> 👋 </span>
        </a-typography-title>
        <a-typography-title :level="3" class="log-in-card__intro-title">
          Log in to TinyHouse!
        </a-typography-title>
        <a-typography-text>
          Sign in with Google to start booking available rentals!
        </a-typography-text>
      </div>
      <button class="log-in-card__google-button" @click="handleConsentPage">
        <img
          src="@/assets/google_logo.jpeg"
          alt="Google Logo"
          class="log-in-card__google-button-logo"
        />
        <span class="log-in-card__google-button-text">
          Sign in with Google
        </span>
      </button>
      <a-typography-text type="secondary">
        Note: By signing in, you 'll be redirected to the Google consent form to
        sign in with your Google account.
      </a-typography-text>
    </a-card>
  </a-layout-content>
</template>

<script lang="ts">
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import { LOGIN, AUTH_URL } from "@/lib/graphql";
import ErrorBanner from "@/components/ErrorBanner.vue";
import { message } from "ant-design-vue";
import { setViewer } from "@/store/viewer";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  components: { ErrorBanner },
  setup() {
    const { load: loadAuthUrl, onResult, onError } = useLazyQuery(AUTH_URL);

    onResult((queryResult) => {
      window.location.href = queryResult.data.authUrl;
    });
    onError(() => {
      message.error(
        `Sorry! We weren't able to log you in. Please try again later!`
      );
    });
    function handleConsentPage() {
      loadAuthUrl();
    }

    const code = new URL(window.location.href).searchParams.get("code");
    onMounted(() => {
      code && mutate();
    });

    const {
      mutate,
      loading: loginLoading,
      error: loginError,
      onDone: loginSuccess,
    } = useMutation(LOGIN, () => ({
      variables: {
        input: { code },
      },
    }));

    const router = useRouter();

    loginSuccess((result) => {
      setViewer(result.data.login);
      sessionStorage.setItem("token", result.data.login.token);
      message.info(`You 've successfully logged in!`);
      router.push(`/user/${result.data.login.id}`);
    });

    return { handleConsentPage, loginLoading, loginError };
  },
};
</script>

