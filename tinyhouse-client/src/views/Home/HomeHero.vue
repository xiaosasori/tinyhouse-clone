<template>
  <div class="home-hero">
    <div class="home-hero__search">
      <a-typography-title class="home-hero__title">
        Find a place you'll love to stay at
      </a-typography-title>
      <a-input-search
        placeholder="Search 'San Fransisco'"
        size="large"
        enter-button
        class="home-hero__search-input"
        @search="$emit('search', $event)"
      />
    </div>
    <a-row
      :gutter="12"
      class="home-hero__cards"
    >
      <a-col
        :md="6"
        :xs="12"
      >
        <router-link to="/listings/toronto">
          <a-card>
            <template #cover>
              <img
                src="@/assets/home/toronto.jpg"
                loading="lazy"
                alt="Toronto"
              >
            </template>
            Toronto
          </a-card>
        </router-link>
      </a-col>
      <a-col
        :md="6"
        :xs="12"
      >
        <router-link to="/listings/dubai">
          <a-card>
            <template #cover>
              <img
                src="@/assets/home/dubai.jpg"
                loading="lazy"
                alt="dubai"
              >
            </template>
            Dubai
          </a-card>
        </router-link>
      </a-col>
      <a-col
        :md="6"
        :xs="0"
      >
        <router-link to="/listings/los%20angeles">
          <a-card>
            <template #cover>
              <img
                src="@/assets/home/los-angeles.jpg"
                loading="lazy"
                alt="los angeles"
              >
            </template>
            Los Angeles
          </a-card>
        </router-link>
      </a-col>
      <a-col
        :md="6"
        :xs="0"
      >
        <router-link to="/listings/london">
          <a-card>
            <template #cover>
              <img
                src="@/assets/home/london.jpg"
                loading="lazy"
                alt="london"
              >
            </template>
            London
          </a-card>
        </router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'HomeHero',
  emits: ['search'],
}
</script>

<style>
</style>
