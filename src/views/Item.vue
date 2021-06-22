<template>
  <div>
    <AddItem :tableName="tableName"></AddItem>
  </div>
</template>

<script>
import AddItem from "@/components/AddItem";
import firebaseDatabase from '../middleware/firebase/database'

export default {
  name: "Item",
  components: {
    AddItem
  },
  data() {
    return {
      item: undefined,
      tableName: 'tableRecipes'
    }
  },
}
</script>

<style scoped>

</style>
