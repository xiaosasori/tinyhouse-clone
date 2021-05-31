<template>
  <div>
      Home
      {{result}}
  </div>
</template>

<script>
import {gql} from '@apollo/client'
import {useQuery} from '@vue/apollo-composable'
export default {
  setup() {
    const query = gql`
      query {
        listing(id: "5d378db94e84753160e08b30") {
          title
        }
      }
    `
    const {result} = useQuery(query)
    return {result}
  }
}
</script>

<style>

</style>