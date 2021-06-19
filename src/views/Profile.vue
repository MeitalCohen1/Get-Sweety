<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 812px" class="shadow-2">
      <q-footer reveal elevated>
        <q-toolbar class="footer bg-deep-orange-3">
          <q-tabs no-caps dense flat active-color="grey" class="text-white" v-model="tab">
            <q-tab name="face" style="font-size:17px" dense flat class="q-mr-lg" icon="face"/>
            <q-tab name="search" style="font-size:17px" dense flat class="q-mr-lg" icon="search"/>
            <!--            <q-btn  style="font-size:17px" dense flat class="q-mr-lg" icon="favorite" />-->
            <q-tab name="home" style="font-size:17px" dense flat class="q-mr-lg" icon="home"
                   @click="$router.push('/recipes')"/>
            <q-tab name="logout" search style="font-size:17px" dense flat class="q-mr-lg" @click="logoutBtn()"
                   icon="logout"/>
          </q-tabs>
        </q-toolbar>
      </q-footer>
      <q-page class="allPage" dir="rtl">
        <q-card class="card-container" flat>
          <!--        <q-btn class="q-mr-sm" color="deep-orange-4" dense flat icon="logout" round size="12px" @click="logout()"></q-btn>-->
          <!--        <q-btn class="q-mr-sm" color="deep-orange-4" dense flat icon="settings" round size="12px" :to="`/settings/${this.userId}`"></q-btn>-->
          <!--        <q-btn class="q-mr-sm" color="deep-orange-4" dense flat icon="edit" round size="12px" :to="`/edit-profile/${this.userId}`"></q-btn>-->

          <q-card-section class="upper-container text-center">
            <div class="image-container">
              <img v-if="user.photoURL"
                   :src="user.photoURL">

              <img v-if="!user.photoURL"
                   src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png">
            </div>
          </q-card-section>

          <q-separator/>

          <q-list class="lower-container">
            <q-item class="name">
              <q-item-section avatar>
                <q-icon color="deep-orange-4" name="person"/>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ user.displayName }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item class="email">
              <q-item-section avatar>
                <q-icon color="deep-orange-4" name="email"/>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ user.email }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="red" name="favorite"/>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ " המתכונים שאהבתי:" }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div class="cards">
            <CardViewer v-for="card in userRecipes" :card="card" :key="card.id" :recipeId="card.id"
                        :class="{profileMode}"/>
          </div>
        </q-card>
      </q-page>
    </q-layout>
  </div>
</template>

<script>
import firebaseInstance from "@/middleware/firebase";
import {mapActions, mapState} from 'vuex'
import CardViewer from "../components/CardViewer"

export default {
  name: "Profile",
  components: {CardViewer},
  data() {
    return {
      profileMode: 'true',
      onlyFavorites: [],
      // model: false,
      tab: 'face'
    }
  },
  computed: {
    ...mapState('users', ['user', 'userId', 'favorites', 'userRecipes']),
    ...mapState('recipes', ['recipes'])
  },

  methods: {
    ...mapActions('users', ['getUserById', 'getFavorites', 'getUserRecipes', 'logout']),
    ...mapActions('recipes', ['getRecipes']),

    logoutBtn() {
      this.logout()
      this.$router.push('/')
    },
  },

  async created() {
    await this.getUserById(window.user.uid)
    await this.getUserRecipes()
    // this.model =  !!(this.userRecipes);
  }
}
</script>
<style scoped>

.card-container {
  width: 375px;
  height: 812px;
  /*background: #fff;*/
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 10px 1px #000;
  background: seashell;
}

.upper-container {
  height: 180px;
  /*width: 400px;*/
  background-color: rgba(190, 140, 100, 0.2);
}

.image-container {
  background: white;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  padding: 5px;
  transform: translate(110px, 100px);
}

.image-container img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
}

.lower-container {
  text-align: left;
  margin-top: 80px;
  font-size: 16px;
}

.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: seashell;
}

</style>
