<!--<template>-->
<!--  <div class="row">-->
<!--    <div class="q-pa-md row items-start q-gutter-md">-->
<!--      <q-card class="my-card">-->
<!--&lt;!&ndash;        <div class="">&ndash;&gt;-->
<!--&lt;!&ndash;          <q-btn v-model="model" flat round size="15px" icon="favorite" color="red" style="position: absolute"&ndash;&gt;-->
<!--&lt;!&ndash;                 @click="removeFavoriteFromUser(card.id)" v-if="model"/>&ndash;&gt;-->
<!--&lt;!&ndash;          <q-btn v-model="model" flat round size="15px" icon="favorite" color="deep-orange-4" style="position: absolute"&ndash;&gt;-->
<!--&lt;!&ndash;                 v-if="!model" @click="addToUser(card.id)"/>&ndash;&gt;-->
<!--        <div>-->
<!--          <img class="img" v-if="!card.image" src="../assets/picCard.jpg">-->
<!--          <img class="img" v-else :src="card.image">-->
<!--        </div>-->

<!--        <q-card-actions align="center">-->
<!--          <div class="q-pl-md">-->
<!--            <div class="name">-->
<!--              <div class="text-body2 text-orange-10 text-right">{{ card.name }}</div>-->
<!--            </div>-->

<!--            <div class="typeDiff row">-->
<!--              <div class="rating row">-->
<!--                <q-rating-->
<!--                    v-model="card.difficulty"-->
<!--                    size="1em"-->
<!--                    :color-selected="ratingColors"-->
<!--                    disable-->
<!--                />-->
<!--              </div>-->
<!--              <p style="color: #e37946">|</p>-->
<!--              <div class="text-orange-10 text-right">{{ card.type }}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          &lt;!&ndash;          <q-btn flat round color="teal" icon="bookmark"/>&ndash;&gt;-->
<!--          &lt;!&ndash;          <q-btn flat round color="primary" icon="share"/>&ndash;&gt;-->

<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// import OneCard from "@/views/OneCard";-->


<!--import {mapMutations, mapActions, mapState} from "vuex";-->

<!--export default {-->
<!--  name: "FavoriteRecipeCard",-->
<!--  props: ['tableName', 'card', 'recipeId'],-->
<!--  components: {-->
<!--    // OneCard,-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapState('users',['favorites'])-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      model: false,-->
<!--      expanded: false,-->
<!--      cards: [],-->
<!--      ingredients: [],-->
<!--      ratingColors: ['orange-3', 'orange-5', 'orange', 'orange-9', 'orange-10']-->
<!--    }-->
<!--  },-->
<!--  // methods: {-->
<!--  //   ...mapMutations('recipes', ['setSelectedRecipe']),-->
<!--  //   ...mapActions('users', ['addRecipeToUser', 'removeRecipeFromUser']),-->
<!--  //   addToUser() {-->
<!--  //     this.addRecipeToUser(this.recipeId)-->
<!--  //     this.model = true;-->
<!--  //   },-->
<!--  //-->
<!--  //   removeFavoriteFromUser() {-->
<!--  //     this.removeRecipeFromUser({-->
<!--  //       dbKey : this.favorites[this.recipeId],-->
<!--  //       recipeId : this.recipeId-->
<!--  //     })-->
<!--  //     this.model = false;-->
<!--  //   }-->
<!--  // },-->
<!--  // created() {-->
<!--  //   this.model =  (this.favorites[this.recipeId]) ? true : false;-->
<!--  // }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.my-card {-->
<!--  /*size: 100px;*/-->
<!--  width: 100%;-->
<!--  height: 270px;-->
<!--  max-width: 200px;-->
<!--  border-radius: 20px;-->

<!--}-->

<!--.name {-->
<!--  display: flex;-->
<!--  flex-direction: row;-->
<!--  /*align-items: center;*/-->
<!--  position: center;-->
<!--}-->

<!--.img {-->
<!--  width: 100%;-->
<!--  height: 200px;-->
<!--  /*margin-top: -50px;*/-->
<!--  border-top-left-radius: 20px;-->
<!--  border-top-right-radius: 20px;-->
<!--}-->

<!--.typeDiff {-->
<!--  flex-direction: row;-->
<!--  /*margin: -15px;*/-->
<!--  justify-content: space-between;-->
<!--}-->

<!--.rating {-->
<!--  /*left: 30px;*/-->
<!--  justify-content: left;-->
<!--  /*margin: -60px;*/-->
<!--  /*padding: -50px;*/-->
<!--  align-self: start;-->
<!--}-->

<!--</style>-->

