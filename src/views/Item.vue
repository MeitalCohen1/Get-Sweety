<template>
  <div>
    <AddItem :item="item" :tableName="tableName"></AddItem>
<!--    פה צריך להעביר לו את האייטם ואת הטייבל אז צריך להעביר דרך פרופס-->
  </div>
</template>

<script>
import localStorageDriver from '../middleware/local-storage';
import AddItem from "@/components/AddItem";


export default {
  name: "Item",
  components: {
    AddItem
  },
  data() {
    return {
      item: {},
      tableName: 'tableRecipes'
    }
  },
  methods: {
    getItemById() {
      this.item = localStorageDriver.getItemById(this.tableName, this.$route.params.id)

    }
  },
  created() { // בעת טעינת ה-COMP תפעיל את הפונ' GET שהוא ילך וימשוך את זה מהסטוראז' לפי ID וילך ויחזיר לנו  את אותו האייטם
    this.getItemById();
  }
}
</script>

<style scoped>

</style>