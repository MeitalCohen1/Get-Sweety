<template>
  <div class="row">
    <div class="q-pa-md">
      <q-card class="my-card">
        <div class="">
          <q-btn v-model="model" flat round size="15px" icon="favorite" color="red" style="position: absolute"
                 @click="removeFavoriteFromUser(card.id)" v-if="model"/>

          <q-btn v-model="model" flat round size="15px" icon="favorite" style="position: absolute; color:#f0e6df"
                 v-if="!model" @click="addToUser(card.id)"/>

          <img class="img" v-if="!card.image" src="../assets/picCard.jpg" @click="setSelectedRecipe(card.id)">
          <img class="img" v-else :src="card.image" @click="setSelectedRecipe(card.id)">
        </div>

        <q-card-actions class="cardText">
          <div class="name">
            <div class="text-body2 text-orange-10 ">{{ card.name }}</div>
          </div>

          <div class="typeAndDiff">
            <div class="rating">
              <q-rating
                  v-model="card.difficulty"
                  size="1em"
                  :color-selected="ratingColors"
                  disable
              />
            </div>
            <p style="color: #e37946; margin: 5px">|</p>
            <div class="type text-orange-10 text-right">{{ card.type }}</div>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import OneCard from "@/views/OneCard";

import {mapMutations, mapActions, mapState} from "vuex";

export default {
  name: "CardViewer",
  props: ['tableName', 'card', 'recipeId'],
  components: {
    OneCard,
  },
  computed: {
    ...mapState('users', ['favorites', 'userRecipes'])
  },
  data() {
    return {
      profileMode: false,
      model: false,
      expanded: false,
      cards: [],
      ingredients: [],
      ratingColors: ['orange-3', 'orange-5', 'orange', 'orange-9', 'orange-10']
    }
  },
  methods: {
    ...mapMutations('recipes', ['setSelectedRecipe']),
    ...mapActions('users', ['addRecipeToUser', 'removeRecipeFromUser']),
    addToUser() {
      this.addRecipeToUser(this.recipeId)
      this.model = true;
    },

    removeFavoriteFromUser() {
      this.removeRecipeFromUser({
        dbKey: this.favorites[this.recipeId],
        recipeId: this.recipeId
      })
      this.model = false;
    }
  },
  created() {
    this.model = !!(this.favorites[this.recipeId]);
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  border-radius: 20px;
}

.cardText {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

.typeAndDiff {
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
}

.name {
  padding: 5px;
  position: center;
}

.img {
  width: 100%;
  height: 200px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.rating {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  margin: 5px;
}

.type {
  margin: 5px
}

</style>
