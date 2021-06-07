<template>
  <div class="home-listings-skeleton">
    <a-skeleton :paragraph="{ rows: 0 }" />
    <a-list
      :grid="{
        gutter: 8,
        xs: 1,
        sm: 2,
        lg: 4,
      }"
      :data-source="[{}, {}, {}, {}]"
    >
      <template #renderItem>
        <a-list-item>
          <a-card loading>
            <template #cover>
              <div
                style="
                  background-image: url(/src/assets/home/listing-loading-card-cover.jpg);
                "
                class="home-listings-skeleton__card-cover-img"
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
  name: "HomeListingsSkeleton",
};
</script>

