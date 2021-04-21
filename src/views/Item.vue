<template>
  <div>
    <AddItem v-if="item.id" :item="item" :tableName="tableName"></AddItem>
    <!--    פה צריך להעביר לו את האייטם ואת הטייבל אז צריך להעביר דרך פרופס-->
  </div>
</template>

<script>
// import localStorageDriver from '../middleware/local-storage';
import AddItem from "@/components/AddItem";
import api from '../middleware/api';


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
    get() {
      api.get({entity: this.tableName, id: this.$route.params.id})
          .then((res) => {
            this.item = res
          })
    }
  },
  created() { // בעת טעינת ה-COMP תפעיל את הפונ' GET שהוא ילך וימשוך את זה מהסטוראז' לפי ID וילך ויחזיר לנו  את אותו האייטם
    this.get();
  }
}
</script>

<style scoped>

</style>