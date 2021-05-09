<template>
  <div>
    <AddItem :tableName="tableName"></AddItem>
    <!--    פה צריך להעביר לו את האייטם ואת הטייבל אז צריך להעביר דרך פרופס-->
  </div>
</template>

<script>
// import localStorageDriver from '../middleware/local-storage';
// import api from '../middleware/api';
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
  methods: {

  },
  created() { // בעת טעינת ה-COMP תפעיל את הפונ' GET שהוא ילך וימשוך את זה מהסטוראז' לפי ID וילך ויחזיר לנו  את אותו האייטם
    // this.get();
  }
}
</script>

<style scoped>

</style>