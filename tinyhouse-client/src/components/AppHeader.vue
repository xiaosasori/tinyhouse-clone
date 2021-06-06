<template>
  <a-layout-header class="app-header">
    <div class="app-header__logo-search-section">
      <div class="app-header__logo">
        <router-link to="/">
          <img
            src="@/assets/tinyhouse-logo.png"
            alt="App logo"
          >
        </router-link>
      </div>

      <div class="app-header__search-input">
        <a-input-search
          v-model.trim="search"
          placeholder="Search 'San Fransisco'"
          enter-button
          @search="handleSearch"
        />
      </div>
    </div>
    <div class="app-header__menu-section">
      <a-menu
        mode="horizontal"
        :selectable="false"
        class="menu"
      >
        <a-menu-item key="/host">
          <router-link to="/host">
            <HomeOutlined />
            Host
          </router-link>
        </a-menu-item>
        <template v-if="viewer.id && viewer.avatar">
          <a-sub-menu>
            <template #title>
              <a-avatar :src="viewer.avatar" />
            </template>
            <a-menu-item key="/user">
              <router-link :to="`/user/${viewer.id}`">
                <UserOutlined />
                Profile
              </router-link>
            </a-menu-item>
            <a-menu-item key="/logout">
              <div @click="handleLogout">
                <LogoutOutlined /> Log out
              </div>
            </a-menu-item>
          </a-sub-menu>
        </template>
        <a-menu-item v-else>
          <router-link to="/login">
            <a-button type="primary">
              Sign In
            </a-button>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-header>
</template>

<script>
import { defineComponent } from 'vue'
import { viewer, setViewer } from '@/store/viewer'
import { useMutation } from '@vue/apollo-composable'
import { LOGOUT } from '@/lib/graphql'
import { message } from 'ant-design-vue'
import {
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'AppHeader',
  components: { HomeOutlined, LogoutOutlined, UserOutlined },
  setup() {
    const { mutate: logout, onDone, onError } = useMutation(LOGOUT)
    onDone((result) => {
      setViewer(result.data.logout)
      sessionStorage.removeItem('token')
      message.info(`You 've successfully logged out!`)
    })
    onError(() => {
      message.error(
        `Sorry we were'nt able to log you out. Please try again later!`
      )
    })

    function handleLogout() {
      logout()
    }
    return { handleLogout }
  },
  data() {
    return {
      search: '',
      viewer,
    }
  },
  watch: {
    '$route.path': function (value) {
      if (!value.includes('/listings')) {
        this.search = ''
      }
      if (value.includes('/listings') && this.$route.params.id) {
        this.search = this.$route.params.id
      }
    },
  },
  methods: {
    handleSearch() {
      this.$router.push(`/listings/${this.search}`)
    },
  },
})
</script>

<style scoped>
</style>
