<template>
  <div class="inputs" dir="rtl">
    הוסף מתכון חדש:

    <q-input outlined v-model="localNewRecipe.name" label="שם המתכון" style="max-width: 300px" class="q-mb-lg"/>
    <q-select outlined v-model="localNewRecipe.type" :options="typeOptions" style="max-width: 200px" class="q-mb-lg"
              label="חלבי/פרווה">

      <template v-slot:prepend>
        <q-icon name="icecream"/>
      </template>
    </q-select>

    <q-select outlined v-model="localNewRecipe.difficulty" :options="diff" style="max-width: 200px" class="q-mb-lg"
              label="רמת קושי">
      <template v-slot:prepend>
        <q-icon name="emoji_events"/>
      </template>
    </q-select>

    <div class="row">
      <div class="q-mx-lg">
        <div>
          <div class="name">
            <q-select
                filled
                v-model="newIngredient.name"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                @filter="filterFn"
                hint="הכנס מינימום שתי אותיות"
                style="width: 250px; padding-bottom: 10px"
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

        <q-input outlined v-model="newIngredient.amount" label="הכנס כמות" style="max-width: 200px" class="q-mb-lg"/>
        <q-btn @click="addIngredient" label="הוסף מרכיב" class="q-mb-lg"/>
      </div>

      <div class="q-mx-lg bg-deep-orange-4 text-white glossy">
        <div style="max-width: 400px">
          <q-list class="glossy" bordered separator>
            <q-item v-ripple>
              <q-item-section>רשימת המרכיבים</q-item-section>
            </q-item>

            <q-item v-for="(Ingredient, index) of localNewRecipe.ingredients" :key="Ingredient.name" v-ripple>
              <q-item-section>
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
          v-model="localNewRecipe.preparation"
          outlined
          autogrow
          label="אופן ההכנה"
      />
    </div>

    <div class="addImg">
      <q-input v-model="file" type="file" id="photo"/>
<!--      <q-btn @click="getImageUrl" class="q-mb-lg" label="הוסף תמונה למתכון"/>-->
<!--            <q-btn @click="deleteImage" class="q-mb-lg" label="מחק תמונה"/>-->
    </div>

    <q-btn v-if="!localNewRecipe.id" class="q-mb-lg" style="max-width: 200px" color="white" text-color="black"
           label="הכנס מתכון"
           @click="insert()"/>
    <q-btn v-if="localNewRecipe.id" class="q-mb-lg" style="max-width: 200px" color="white" text-color="black"
           label="עדכן מתכון"
           @click="update()"/>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import firebaseDatabase from '../middleware/firebase/database'
import firebaseInstance from "@/middleware/firebase";


const stringOptions = [
  'ביצים', 'שמן', 'חלב', 'סוכר', 'סוכר וניל', 'שמרים', 'קמח', 'תמצית וניל', 'שוקולד', 'פודינג וניל','סוכר חום','סודה לשתייה','מלח','שוקולד ציפס','חמאה'
]

export default {
  name: "AddItem",
  props: ['tableName'],
  computed: mapState('recipes',['editedRecipeId','editedRecipe'] ),

  data() {
    return {
      model: null,
      options: stringOptions,
      file: undefined,
      newIngredient: {},
      typeOptions: ['פרווה', 'חלבי'],
      diff: [1, 2, 3, 4, 5],

      localNewRecipe: {
        name: '',
        type: '',
        ingredients: [],
        preparation: '',
        difficulty: 3,
        image: null
      },

      ratingModel: 4,
      ratingColors: ['light-green-3', 'light-green-6', 'green', 'green-9', 'green-10'],
    }
  },
  methods: {
    ...mapActions('recipes', ['insertRecipe', 'updateRecipe', 'setEditRecipeById','getImageUrl']),
    ...mapMutations('recipes', ['setEditedRecipe', 'setEditedRecipeId']),

    localSetEditedRecipe() {
      this.setEditedRecipe(this.localNewRecipe)
    },

    goToHome() {
      this.$router.push(`/back-office`);
    },

    async insert() {
      if (this.file){
        const url = await this.getImageUrl()
      }
      this.localSetEditedRecipe();
      this.insertRecipe()
      this.file = ''
    },

    getImageUrl(){
      const storage = firebaseInstance.firebase.storage();
      const storageRef = storage.ref('recipes');
      const imageRef = storageRef.child(`/${this.file[0].name}`)
      return imageRef.put(this.file[0])
          .then(snapshot => {
            return snapshot.ref.getDownloadURL()
                .then(url => {
              this.localNewRecipe.image = url;
              return url
            })
            console.log('Image Uploaded Successfully!');
          });
    },

    // deleteImage(){
    //   const storage = firebaseInstance.firebase.storage();
    //   const storageRef = storage.ref(`recipes/`);
    //   storageRef.child(`/${this.file[0].name}`).delete().then(() => {
    //     console.log('image delete')
    //     this.localNewRecipe.image = null
    //   }).catch((error) => {
    //   });
    // },

    async update() {
      if (this.file){
        const url = await this.getImageUrl()
      }
      this.localSetEditedRecipe();
      this.updateRecipe();
      this.goToHome();
    },

    addIngredient() {
      this.localNewRecipe.ingredients.push(this.newIngredient)
      this.newIngredient = {}
    },
    removeIngredient(foundIndex) {
      this.localNewRecipe.ingredients.splice(foundIndex, 1)
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
    this.setEditedRecipeId(this.$route.params.id);
    this.setEditRecipeById()
    .then (()=> {
      Object.assign(this.localNewRecipe, this.editedRecipe)
    })
  }
}
</script>

<style scoped>
.inputs {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 30px;
  flex-wrap: wrap;
  font-family: 'Amatic SC', cursive;
}

.name {
  flex-direction: column;
  justify-content: right;
  margin: 30px;
  flex-wrap: wrap;
  font-family: 'Amatic SC', cursive;
}

.addImg {
  flex-direction: row;
  justify-items: right;
  width: 300px;
  max-width: 400px;
  justify-content: start;
  flex-wrap: wrap;
  /*align-items: inherit;*/
  font-family: 'Amatic SC', cursive;
  margin: 20px;
}

</style>