<template>
  <div>
      <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
      <!-- {{result}} -->
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

    const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
    return {result, data}
  }
}
</script>

<style>

</style>