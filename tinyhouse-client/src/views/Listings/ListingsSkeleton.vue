<template>
  <div>
    <a-skeleton :paragraph="{ rows: 1 }" />
    <a-list
      :grid="{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4
      }"
      :data-source="[{}, {}, {}, {}, {}, {}, {}, {}]"
    >
      <template #renderItem>
        <a-list-item>
          <a-card loading>
            <template #cover>
              <div
                class="listings-skeleton__card-cover-img"
                style="background-image: url(/src/assets/listing-loading-card-cover.jpg)"
              />
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'ListingsSkeleton',
}
</script>

<style>
</style>
