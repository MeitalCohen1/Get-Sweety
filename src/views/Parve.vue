<!--<template>-->

<!--<div class="parve">-->
<!--    <div class="row wrap">-->
<!--      <CardViewer v-for="(card,index) of milkyData" :card="card" :tableName="'tableRecipes'"/>-->
<!--    </div>-->

<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--// import localStorageDriver from "../middleware/local-storage";-->
<!--import CardViewer from "../components/CardViewer";-->
<!--import firebaseDatabase from '../middleware/firebase/database'-->

<!--export default {-->
<!--  name: "Parve",-->
<!--  components: {CardViewer},-->
<!--  data: () => ({-->
<!--    milkyData: [],-->
<!--    tableName:'tableRecipes'-->
<!--  }),-->
<!--  methods: {-->
<!--    read() {-->
<!--      var data = firebaseDatabase.read({entity:this.tableName)-->
<!--      for (var recipe of data) {-->
<!--        if (recipe.type == 'Parve'){-->
<!--          this.milkyData.push(recipe)-->
<!--        }-->
<!--      }-->
<!--      console.log(this.milkyData)-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.read()-->
<!--  }-->
<!--}-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->