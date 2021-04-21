<template>
  <div class="q-pa-md">
    Add a new recipe:
    <!--  בעצם שמנו ב-V-MODEL את הפרמטרים שאנחנו רוצים למפות בין מה שיש לנו בדאטה לבין מה שיש לנו בוי מודל,-->
    <!--  כלומר הוי מודל עוזר לנו לעשות תהליך שנקרא ביינדינג בעצם לקשר את מה שיכנס לאינפוט לדאטה-->
    <q-input outlined v-model="newRecipe.name" label="Recipe Name" style="max-width: 400px"/>
    <q-select outlined v-model="newRecipe.type" :options="typeOptions" style="max-width: 200px" class="q-mb-lg"
              label="Type">

      <template v-slot:prepend>
        <q-icon name="icecream"/>
      </template>
    </q-select>

    <q-select outlined v-model="newRecipe.difficulty" :options="diff" style="max-width: 200px" class="q-mb-lg"
              label="Difficulty">
      <template v-slot:prepend>
        <q-icon name="emoji_events"/>
      </template>
    </q-select>

    <div class="row">
      <div class="q-mx-lg le">
        <!--      <q-input outlined v-model="newIngredient.name" label="Ingredient name" style="max-width: 170px" />-->
        <div class="q-pa-md">
          <div class="q-gutter-md row">
            <q-select
                filled
                v-model="newIngredient.name"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                @filter="filterFn"
                hint="Minimum 2 characters to trigger filtering"
                style="width: 250px; padding-bottom: 20px"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-orange">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>

        <q-input outlined v-model="newIngredient.amount" label="Ingredient amount" style="max-width: 170px"/>
        <q-btn @click="addIngredient" label="Add ingredient"/>
      </div>

      <div class="q-mx-lg bg-orange-8 text-white glossy">
        <div style="max-width: 350px">
          <q-list class="glossy" bordered separator>
            <q-item v-ripple>
              <q-item-section>Ingredients list</q-item-section>
            </q-item>

            <q-item v-for="(Ingredient, index) of newRecipe.ingredients" :key="Ingredient.name" v-ripple>
              <q-item-section class="">
                <div>
                  <q-item-label>{{ Ingredient.name }}</q-item-label>
                  <q-item-label>{{ Ingredient.amount }}</q-item-label>
                </div>

                <div>
                  <q-btn
                      @click="removeIngredient(index)"
                      round
                      color="primary"
                      size="xs"
                      icon="delete"
                  />
                </div>

              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

    </div>

    <div class="q-py-md" style="max-width: 300px">
      <q-input
          v-model="newRecipe.preparation"
          outlined
          autogrow
          label="Enter preparation"
      />
    </div>
    <q-btn v-if="!item" color="white" text-color="black" label="insert" @click="insert()"/>
    <q-btn v-if="item" color="white" text-color="black" label="update" @click="update()"/>
  </div>
</template>

<script>
// import localStorageDriver from '../middleware/local-storage';
import api from '../middleware/api'

const stringOptions = [
  'Eggs', 'Oil', 'Milk', 'Sugar', 'Vanilla sugar', 'yeast', 'flour', 'Vanilla extract', 'chocolate', 'Vanilla pudding'
]

export default {
  name: "AddItem",
  props: ['tableName', 'item'],
  data() {
    return {
      model: null,
      options: stringOptions,

      newIngredient: {},
      typeOptions: [
        'Parve', 'Milky'
      ],
      diff: [
        1, 2, 3, 4, 5
      ],

      newRecipe: {
        name: '',
        type: '',
        ingredients: [],
        preparation: '',
        difficulty: 0
      },

      ratingModel: 4,
      ratingColors: ['light-green-3', 'light-green-6', 'green', 'green-9', 'green-10'
      ],
    }
  },
  methods: {
    insert() {
      // localStorageDriver.insert(this.tableName, this.newRecipe);
      api.create({entity: this.tableName, data: this.newRecipe})
          .then(() => {
            this.newRecipe = {
              ingredients: [],
            }
            this.$emit('itemAdded'); // פה בעצם אנו יוצרים אירוע, כלומר כל פעם שאנחנו עושים הוספה של אייטם יווצר איוונט
          })
    },
    update() {
      api.update({entity: this.tableName, id: this.$route.params.id, data: this.newRecipe})
          .then(() => {
            this.$router.push(`/back-office`);
          })
    },
    addIngredient() {
      debugger
      const obj = {
        name: this.newIngredient.name,
        amount: this.newIngredient.amount
      }
      this.newRecipe.ingredients.push(obj)
      this.newIngredient = {}
    },
    removeIngredient(foundIndex) {
      this.newRecipe.ingredients.splice(foundIndex, 1)
    },
    filterFn(val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  },
  created() {
    if (this.item) {
      this.newRecipe = this.item;
    }
  }
}
</script>

<style scoped>

</style>