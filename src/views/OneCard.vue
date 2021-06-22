<template>

  <q-dialog class="container-1 relative-position" v-model="localDialog" @hide="setSelectedRecipe()">
    <q-card class="box-1">
      <q-img class="img" v-if="selectedRecipe.image" :src="selectedRecipe.image">
        <div class="btns">
          <q-btn size="9px" v-close-popup color="deep-orange-4" round icon="arrow_back"/>
          <div>
            <q-btn v-model="model" class="favorite" v-if="!model" size="9px" round color="red" icon="favorite" @click="addToUser(selectedRecipe.id)"/>
            <q-btn v-model="model" class="favorite" v-if="model" size="9px"outline round color="red" icon="favorite" @click="removeFavoriteFromUser(selectedRecipe.id)"/>
            <q-btn size="9px" round color="deep-orange-4" icon="ios_share"/>
          </div>
        </div>
      </q-img>
      <q-img v-else
             src="https://firebasestorage.googleapis.com/v0/b/get-sweety.appspot.com/o/utils%2Fbaking-free-photos-2210x1473.jpg?alt=media&token=7fec607c-47ea-4c69-b4c5-54a6df11f62d"/>
      <q-card-section>
        <div>
          <div class="nameType row text-h6 ellipsis">
            <div class="text-orange-10 text-right" style="font-size: 18px">{{ selectedRecipe.type }}</div>
            <div class="text-bold text-orange-10 text-right" style="font-size: 18px">{{ selectedRecipe.name }}</div>
          </div>

          <div class="diff">
            <q-rating
                v-model="selectedRecipe.difficulty"
                size="1em"
                color="grey"
                :color-selected="ratingColors"
                disable
            />
            <div dir="rtl" class="diff text-orange-10 text-right">{{ "דרגת קושי:" }}</div>
          </div>
        </div>
      </q-card-section>

      <div>
        <q-card-section class="row nameAmount">
          <div class="amount text-subtitle1">
            <div dir="rtl" class="text-orange-10" style="text-align: center">{{ "כמויות:" }}</div>
            <q-list dense padding class="rounded-borders">
            <q-item dir="rtl" v-for="Ingredient in selectedRecipe.ingredients" :key="Ingredient.name" v-ripple>
              <q-item-section class="amount">
                <q-item-label>{{ Ingredient.amount }}</q-item-label>
              </q-item-section>
            </q-item>
            </q-list>
          </div>

          <div class="name text-subtitle1" align="right">
            <div dir="rtl" style="font-size: 13px" class="text-orange-10 text-right">{{ "מרכיבים:" }}</div>
            <q-list dense padding class="rounded-borders">
            <q-item dir="rtl" v-for="Ingredient in selectedRecipe.ingredients" :key="Ingredient.name" v-ripple>
              <q-item-section class="Ingredient">
                <q-item-label>{{ Ingredient.name }}</q-item-label>
              </q-item-section>
            </q-item>
            </q-list>
          </div>
        </q-card-section>
      </div>

      <q-card-section>
        <div class="text-caption" style="font-size: 13px">
          <div class="preparation text-orange-10 text-right">{{ ":אופן הכנה" }}</div>
          <q-list dense padding class="rounded-borders">
            <q-item-section dir="rtl" class="preparation  text-right">
              <q-item-label>{{ selectedRecipe.preparation }}</q-item-label>
            </q-item-section>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import firebaseDatabase from '../middleware/firebase/database'
import {mapMutations, mapState, mapActions} from "vuex";

export default {
  name: "OneCard",
  props: ['item', 'recipeId'],
  data() {
    return {
      model: false,
      card: [],
      info: [],
      localDialog: true,
      ratingColors: ['orange-3', 'orange-5', 'orange', 'orange-9', 'orange-10']
    }
  },
  computed: {
    ...mapState('recipes', ['selectedRecipe']),
    ...mapState('users',['favorites', 'userRecipes']),
  },

  methods: {
    ...mapMutations('recipes', ['setSelectedRecipe']),
    ...mapActions('users', ['addRecipeToUser', 'removeRecipeFromUser']),

    addToUser() {
      this.addRecipeToUser(this.selectedRecipe.id)
      this.model = true;
    },

    removeFavoriteFromUser() {
      this.removeRecipeFromUser({
        dbKey : this.favorites[this.selectedRecipe.id],
        recipeId : this.selectedRecipe.id
      })
      this.model = false;
    },
  },
  created() {
    this.model =  !!(this.favorites[this.selectedRecipe.id]);
  }
}

</script>

<style scoped>

.container-1 {
  display: flex;
  flex-direction: column;
  padding-right: inherit;
  justify-content: center;
}

.btns {
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.box-1 {
  height: 700px;
  width: 400px;
  border-radius: 20px;
  font-family: Arial, sans-serif;
}

.nameType {
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
}

.diff {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
  font-size: 15px;
}

.img {
  width: 327px;
  height: 250px;
}

.nameAmount {
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
  margin-top: -20px;
}

.favorite {
  margin-right: 10px;
}

.amount {
  align-items: flex-start;
  font-size: 13px;
}

.Ingredient {
  font-size: 13px;
}

</style>
