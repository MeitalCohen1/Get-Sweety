<template>
  <div class="main">
    <div class="q-pa-md">
      <q-toolbar class="bg-deep-orange-4 text-white q-my-md shadow-4">
        <q-btn flat round dense icon="menu" class="q-mr-sm"  />
        <q-space/>
        <q-btn flat dense label="אזור אישי" class="q-mr-sm" @click=moveToProfile() />
        <q-btn @click="logout()" icon="logout"> Log out</q-btn>
      </q-toolbar>
    </div>

    <div class="head text-h4 text-deep-orange-12 text-deep-orange-10 text-right headLine " dir="rtl">
      שלום,
      <br>
      מה תרצה לקינוח?
    </div>

    <div class="Button">
      <q-btn unelevated rounded color="deep-orange-4" label="מרכיבים" @click="openDialog()"/>
      <q-btn unelevated rounded color="deep-orange-4" label="פרווה" @click="filterType('פרווה')"/>
      <q-btn unelevated rounded color="deep-orange-4" label="חלבי" @click="filterType('חלבי')"/>
    </div>
    <Ingredients @searchIsClicked="getResult"/>

    <div class="row wrap cards">
      <CardViewer v-for="card in ((filtered.length && filtered ) || recipes)" :card="card" :recipeId="card.id" :key="card.id"/>
      <OneCard v-if="selectedRecipe"></OneCard>
    </div>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState, mapGetters} from 'vuex'
import CardViewer from "../components/CardViewer";
import OneCard from "@/views/OneCard";
import firebaseInstance from "@/middleware/firebase";
import Ingredients from "@/components/Ingredients";

export default {
  name: "Recipes",
  // props: ['users'],
  components: {
    CardViewer, OneCard, Ingredients
  },

  data: () => ({
    isClicked: false,
    searchInput: '',
    milkyData: [],
    users: [],
    filtered: [],
    tableName: 'tableRecipes',
    model: 'two',
  }),
  computed: {
    ...mapState('recipes', ['recipes', 'selectedRecipe']),
    ...mapState('users', ['userId'])
  },

  methods: {
    ...mapActions('recipes', ['getRecipes']),
    ...mapActions('users', ['getUser', 'getFavorites']),
    ...mapMutations('recipes', ['openDialog']),
    ...mapGetters('recipes', ['filterByType']),

    getResult(value) {
      this.filtered = value;
      if (!this.filtered.length) {
        this.$vToastify.warning("אין מתכון מתאים לפי בקשתך")
      }
    },

    filterType(type) {
      this.filtered = this.filterByType()(type)
    },

    logout() {
      firebaseInstance.firebase.auth().signOut().then(() => {
        this.$router.push('/home')
      }).catch((error) => {
      });
    },

    async moveToProfile() {
      await this.$router.push(`/profile/${window.user.uid}`)
    }
  },

  created() {
    this.getFavorites()
    this.getRecipes()
  }
}

</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.head {
  font-family: 'Bellefair', serif;
  width: 1700px;
}

.Button {
  display: flex;
  max-width: 400px;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  flex-wrap: wrap;
  align-items: center;
  font-family: 'Amatic SC', cursive;
  margin: 25px;
}

.cards {
  justify-content: center;
}
</style>
