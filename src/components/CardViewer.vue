<template>
  <div class="row">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <div class="">
<!--          <q-btn size="15px" flat round color="red" icon="favorite" style="position: absolute"/>-->
          <q-btn-toggle
              size="15px" flat round color="deep-orange-4" icon="favorite" style="position: absolute"
              v-model="model"
              toggle-color="red"
              :options="[
        {icon: 'favorite', value: 'one'}]"
          />
          <img class="img" v-if="!card.image" src="../assets/picCard.jpg" @click="setSelectedRecipe(card.id)">
          <img class="img" v-else :src="card.image" @click="setSelectedRecipe(card.id)">
        </div>

        <q-card-actions align="center">
          <div class="q-pl-md">
            <div class="name">
              <div class="text-body2 text-orange-10 text-right">{{ card.name }}</div>
            </div>

            <div class="typeDiff row">
              <div class="rating row">
                <q-rating
                    v-model="card.difficulty"
                    size="1em"
                    :color-selected="ratingColors"
                    disable
                />
              </div>
              <p style="color: #e37946">|</p>
              <div class="text-orange-10 text-right">{{ card.type }}</div>
            </div>
          </div>
          <!--          <q-btn flat round color="teal" icon="bookmark"/>-->
          <!--          <q-btn flat round color="primary" icon="share"/>-->

        </q-card-actions>
      </q-card>
    </div>

  </div>
</template>

<script>
import OneCard from "@/views/OneCard";

import {mapMutations} from "vuex";

export default {
  name: "CardViewer",
  props: ['tableName', 'card'],
  components: {
    OneCard,
  },
  data() {
    return {
      model: null,
      expanded: false,
      cards: [],
      ingredients: [],
      ratingColors: ['orange-3', 'orange-5', 'orange', 'orange-9', 'orange-10']
    }
  },
  methods: {
    ...mapMutations('recipes', ['setSelectedRecipe']),
  },
}
</script>


<style scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  border-radius: 20px;

}

.name {
  display: flex;
  flex-direction: row;
  /*align-items: center;*/
  position: center;
}

.img {
  width: 100%;
  height: 200px;
  /*margin-top: -50px;*/
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.typeDiff {
  flex-direction: row;
  /*margin: -15px;*/
  justify-content: space-between;
}

.rating {
  /*left: 30px;*/
  justify-content: left;
  /*margin: -60px;*/
  /*padding: -50px;*/
  align-self: start;
}

</style>