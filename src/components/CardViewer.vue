<template>
  <div class="row">
    <div class="col-12 col-md">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" flat bordered>
              <q-item-section>
                <q-item-label></q-item-label>
              </q-item-section>
              <img src="../assets/cake1.webp"
                   style="height: 150px; max-width: 250px"
              />
              <q-card-section>
                <div class="text-overline text-orange-9">{{ card.name }}</div>
                <div class="text-h6 q-mt-sm q-mb-xs">{{ card.type }}</div>
                <div class="text-h6 q-mt-sm q-mb-xs">{{ card.difficulty }}</div>
                <div class="text-caption text-grey">
                  <q-item v-for="Ingredient in card.ingredients" :key="Ingredient.name" v-ripple>
                    <q-item-section>
                      <q-item-label>{{ Ingredient.name }} {{ Ingredient.amount }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <div class="q-pr-md">
                  <div class="q-gutter-y-md row">
                    <q-rating
                        v-model="card.difficulty"
                        size="1.5em"
                        color="grey"
                        :color-selected="ratingColors"
                        disable
                    />
                  </div>
                </div>
              </q-card-section>

              <q-card-actions>
                <q-btn flat color="dark" label="REMOVE" @click="remove(card.id)"/>
                <q-btn flat color="primary" label="Book"/>

                <q-space/>

                <q-btn
                    color="grey"
                    round
                    flat
                    dense
                    :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                    @click="expanded = !expanded"
                />
              </q-card-actions>

              <q-slide-transition>
                <div v-show="expanded">
                  <q-separator/>
                  <q-card-section class="text-subitle2">
                    <div class="text-h6 q-mt-sm q-mb-xs">אופן הכנה: {{ card.preparation }}</div>
                  </q-card-section>
                </div>
              </q-slide-transition>
        </q-card>
    </div>
  </div>


  </div>
</template>

<script>
import localStorageDriver from "@/middleware/local-storage";

export default {
  name: "CardViewer",
  props: ['tableName', 'card'],
  data() {
    return {
      expanded: false,
      cards: [],
      ingredients: [],
      ratingColors: ['orange-3', 'orange-5', 'orange', 'orange-9', 'orange-10']
    }
  },
  methods: {
    read() {
      this.data = localStorageDriver.select(this.tableName); // אני רוצה בעת הטעינה של ה-COMP לעשות שליפה מהלוקאל סטוראז' ובעצם להביא את הנתונים

    },
    remove(id) {
      localStorageDriver.remove(this.tableName, id);
      this.read()
    },
  }
}

</script>


<style scoped>

</style>