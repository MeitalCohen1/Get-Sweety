<template>
  <div class="main">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link
        href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cookie&family=Dancing+Script:wght@500&display=swap"
        rel="stylesheet">

    <q-layout view="lHh lpr lFf" container style="height: 812px" class="shadow-2">
      <q-footer reveal elevated>
        <q-toolbar class="footer bg-deep-orange-3">
          <q-tabs no-caps dense flat active-color="grey" class="text-white" v-model="tab">
            <q-tab name="face" style="font-size:17px" dense flat class="q-mr-lg" @click=moveToProfile icon="face"/>
            <q-tab name="search" style="font-size:17px" dense flat class="q-mr-lg" icon="search"/>
            <!--            <q-btn  style="font-size:17px" dense flat class="q-mr-lg" icon="favorite" />-->
            <q-tab name="home" style="font-size:17px" dense flat class="q-mr-lg" icon="home"/>
            <q-tab name="logout" search style="font-size:17px" dense flat class="q-mr-lg" @click="logoutBtn()"
                   icon="logout"/>
          </q-tabs>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page class="q-pa-md">
          <div class="headLine text-h5 text-deep-orange-4 text-left" dir="ltr">
            Hi,
            <br>
            Are You Hungry?
          </div>

          <div class="Button">
            <q-btn unelevated rounded color="deep-orange-4" label="מרכיבים" @click="openDialog()"/>
            <q-btn unelevated rounded color="deep-orange-4" label="פרווה" @click="filterType('פרווה')"/>
            <q-btn unelevated rounded color="deep-orange-4" label="חלבי" @click="filterType('חלבי')"/>
          </div>

          <Ingredients @searchIsClicked="getResult"/>

          <div class="row wrap cards">
            <CardViewer v-for="card in ((filtered.length && filtered ) || recipes)" :card="card" :recipeId="card.id"
                        :key="card.id" :model="model"/>
            <OneCard v-if="selectedRecipe"></OneCard>

          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>

import CardViewer from "../components/CardViewer";
import OneCard from "@/views/OneCard";
import Ingredients from "@/components/Ingredients";
import {mapActions, mapMutations, mapState, mapGetters} from 'vuex'

export default {
  name: "Recipes",
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
    tab: 'home',
  }),
  computed: {
    ...mapState('recipes', ['recipes', 'selectedRecipe']),
    ...mapState('users', ['userId', 'favorites'])
  },

  methods: {
    ...mapActions('recipes', ['getRecipes']),
    ...mapMutations('recipes', ['openDialog']),
    ...mapGetters('recipes', ['filterByType']),
    ...mapActions('users', ['getUser', 'getFavorites', 'logout']),

    getResult(value) {
      this.filtered = value;
      if (!this.filtered.length) {
        this.$vToastify.warning("אין מתכון מתאים לפי בקשתך")
      }
    },

    filterType(type) {
      this.filtered = this.filterByType()(type)
    },

    logoutBtn() {
      this.logout()
      this.$router.push('/')
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
  font-family: Arial, sans-serif;
  background-color: rgba(190, 140, 100, 0.2);
}

.headLine {
  font-family: 'Cookie', cursive;
  font-size: 40px;
  margin: 30px;
}

.footer {
  justify-content: center;
  align-items: center;
}

.Button {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  flex-wrap: wrap;
}

.cards {
  justify-content: center;
}
</style>
