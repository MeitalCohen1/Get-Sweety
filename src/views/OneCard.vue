<template>

  <q-dialog class="container-1 relative-position" v-model="localDialog" @hide="setSelectedRecipe()">
    <q-card style="min-width: 400px" class="box-1">
<!--            <q-card-actions v-close-popup>-->
<!--              <q-btn class="favorite" size="12px" round color="red" icon="favorite" />-->
<!--              <q-btn class="share" size="12px" round color="deep-orange-4" icon="ios_share" />-->
<!--              style="transform: translateY(30%)"-->
<!--              <q-btn class="back" size="12px" v-close-popup color="deep-orange-4" round icon="arrow_back" />-->
<!--            </q-card-actions>-->
      <q-img v-if="selectedRecipe.image" :src="selectedRecipe.image">
        <div class="btns">
          <q-btn class="" size="12px" v-close-popup color="deep-orange-4" round icon="arrow_back"/>
          <div>
            <q-btn class="favorite" size="12px" round color="red" icon="favorite" />
            <q-btn class="" size="12px" round color="deep-orange-4" icon="ios_share" />
          </div>
        </div>
      </q-img>
      <q-img v-else  src="https://firebasestorage.googleapis.com/v0/b/get-sweety.appspot.com/o/utils%2Fbaking-free-photos-2210x1473.jpg?alt=media&token=7fec607c-47ea-4c69-b4c5-54a6df11f62d"/>
      <q-card-section>
        <!--        <q-btn-->
        <!--            fab-->
        <!--            color="red"-->
        <!--            icon="favorite"-->
        <!--            class="absolute"-->
        <!--            style="top: 0; right: 12px; transform: translateY(-50%);"-->
        <!--        />-->
        <div class="no-wrap">
          <div class="nameType row text-h6 ellipsis">
            <div class="text-orange-10 text-right" style="size: 10px">{{ selectedRecipe.type }}</div>
            <div class="text-bold text-orange-10 text-right">{{ selectedRecipe.name }}</div>
          </div>

          <div class="diff q-gutter-y-md row">
            <q-rating
                v-model="selectedRecipe.difficulty"
                size="1em"
                color="grey"
                :color-selected="ratingColors"
                disable
            />
            <div dir="rtl" class="diff text-orange-10 text-right">{{ "דרגת קושי:" }}</div>
          </div>

          <!--          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">-->
          <!--            &lt;!&ndash;              <q-icon name="favorite"/>&ndash;&gt;-->
          <!--            I like it!-->
          <!--          </div>-->
        </div>
      </q-card-section>

      <div>
        <q-card-section class="row nameAmount">
          <div class="amount text-subtitle1" >
            <div dir="rtl" class="text-orange-10 text-left">{{ "כמויות:" }}</div>
            <q-item dir="rtl" v-for="Ingredient in selectedRecipe.ingredients" :key="Ingredient.name" v-ripple>
              <q-item-section>
                <q-item-label>{{ Ingredient.amount }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="name text-subtitle1" align="right">
            <div dir="rtl" class="text-orange-10 text-right">{{ "מרכיבים:" }}</div>

            <q-item dir="rtl" v-for="Ingredient in selectedRecipe.ingredients" :key="Ingredient.name" v-ripple>
              <q-item-section>
                <q-item-label>{{ Ingredient.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </q-card-section>
      </div>

      <q-card-section>
          <div class="text-caption text-grey" style="size: 15px">
            <div dir="rtl" class="preparation text-orange-10 text-right">{{ "אופן הכנה:" }}</div>
            <div class="text-body2 text-orange-10 text-right">{{ selectedRecipe.preparation }}</div>
          </div>
        </q-card-section>

<!--      <q-separator/>-->

      <!--      <q-card-actions align="right" v-close-popup>-->
      <!--        <q-btn v-close-popup flat color="primary" label="Reserve"/>-->
      <!--        <q-btn v-close-popup flat color="primary" round icon="event" />-->
      <!--      </q-card-actions>-->
    </q-card>
  </q-dialog>
</template>

<script>
import firebaseDatabase from '../middleware/firebase/database'
import {mapMutations, mapState} from "vuex";


export default {
  name: "OneCard",
  props: ['item'],
  data() {
    return {
      card: [],
      info: [],
      localDialog: true,
      ratingColors: ['orange-3', 'orange-5', 'orange', 'orange-9', 'orange-10']
    }
  },
  computed: mapState('recipes', ['selectedRecipe']),

  methods: {
    ...mapMutations('recipes', ['setSelectedRecipe']),
  },

  created() {
  },
}

</script>

<style scoped>

.container-1 {
  display: flex;
  flex-direction: column;
  padding-right: inherit;
  justify-content: center;
}

.btns{
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.box-1 {
  margin: 30px;
  height: 800px;
  max-width: 496px;
  border-radius: 20px;
  font-family: 'Prata', serif;
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
}

.nameAmount {
  flex-direction: row;
  justify-content: space-between;
  padding: 40px;
  margin-top: -20px;
}

.favorite {
  margin-right: 10px;
}

.back {
  position: absolute;
  z-index: 3;
  left: 4%;
  bottom:90%;
}

.share {
  position: absolute;
  z-index: 3;
  left: 85%;
  bottom:90%;
}


</style>