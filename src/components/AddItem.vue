<template>
  <div dir="rtl">
    <div class="text">
      <p>הוסף מתכון חדש:</p>
    </div>

    <div class="inputs">
    <q-input class="q-mb-sm" outlined v-model="localNewRecipe.name" label="שם המתכון"/>
    <q-select class="q-mb-sm" outlined v-model="localNewRecipe.type" :options="typeOptions" label="חלבי/פרווה">
      <template v-slot:prepend>
        <q-icon name="cake"/>
      </template>
    </q-select>

    <q-select class="q-mb-lg" outlined v-model="localNewRecipe.difficulty" :options="diff" label="רמת קושי">
      <template v-slot:prepend>
        <q-icon name="emoji_events"/>
      </template>
    </q-select>

          <div class="name">
              <q-select class="q-mb-sm" dir="rtl" outlined color="deep-orange-4" v-model="newIngredient.name" :options="options" label="הוסף מרכיב">
                <template v-slot:prepend>
                  <q-icon name="add" />
                </template>
              </q-select>
          </div>

        <q-input outlined v-model="newIngredient.amount" label="הכנס כמות" class="q-mb-md"/>
        <q-btn color="deep-orange-4" @click="addIngredient" label="הוסף מרכיב" class="q-mb-lg"/>

      <div>
        <q-item class="q-mb-md" dir="rtl">
          <q-item-section class="list text-bold ">רשימת המרכיבים:</q-item-section>
        </q-item>
        <q-list style="width: 300px;" dense bordered class="rounded-borders q-mb-md">
            <q-item style="flex-direction: column" v-for="(Ingredient, index) of localNewRecipe.ingredients" :key="Ingredient.name" v-ripple>
              <q-item-section style="margin-right: 10px">
                <div class="nameAmount">
                  <q-item-label style="margin-left: 5px; margin-block-start: auto;">{{ Ingredient.amount }}</q-item-label>
                  <q-item-label>{{ Ingredient.name }}</q-item-label>
                </div>

                <div class="deleteBtn">
                  <q-btn
                      @click="removeIngredient(index)"
                      outline
                      round
                      color="deep-orange-4"
                      size="xs"
                      icon="delete"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
      </div>

      <div>
        <q-input
            v-model="localNewRecipe.preparation"
            placeholder=" אופן ההכנה"
            filled
            type="textarea"
            color="deep-orange-4"
            bg-color="grey-4"
            class="q-mb-md"
            style="width: 300px;"
        />
      </div>


    <div class="addImg">
      <q-input class="q-mb-md" v-model="file" type="file" id="photo"/>
<!--      <q-btn @click="getImageUrl" class="q-mb-lg" label="הוסף תמונה למתכון"/>-->
<!--            <q-btn @click="deleteImage" class="q-mb-lg" label="מחק תמונה"/>-->
    </div>

    <q-btn v-if="!localNewRecipe.id" class="q-mb-md" color="deep-orange-4" text-color="white"
           label="הכנס מתכון"
           @click="insert()"/>
    <q-btn v-if="localNewRecipe.id" class="q-mb-md" color="deep-orange-4" text-color="white"
           label="עדכן מתכון"
           @click="update()"/>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import firebaseDatabase from '../middleware/firebase/database'
import database from '../middleware/firebase/database'
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
        difficulty: 1,
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

    // filterFn(val, update, abort) {
    //   if (val.length < 2) {
    //     abort()
    //     return
    //   }
    //
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
    //   })
    // }
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

.text {
  margin: 20px;
}
.inputs {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px;
  font-family: Arial, sans-serif;
}

.nameAmount {
  display: flex;
  flex-direction: row;
  font-family: Arial, sans-serif;
  margin-right: 10px;
}

.deleteBtn {
  transform: translateY(-20px) translateX(180px);
}

.addImg {
  margin: 10px;
}

</style>
