<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 812px" class="shadow-2">
      <q-footer reveal elevated>
        <q-toolbar class="footer bg-deep-orange-3">
          <q-tabs no-caps dense flat active-color="grey" class="text-white" v-model="tab">
            <q-tab name="face" style="font-size:17px" dense flat class="q-mr-lg" icon="face" />
            <q-tab name="search" style="font-size:17px" dense flat class="q-mr-lg" icon="search" />
            <!--            <q-btn  style="font-size:17px" dense flat class="q-mr-lg" icon="favorite" />-->
            <q-tab name="home" style="font-size:17px" dense flat class="q-mr-lg" icon="home" @click="$router.push('/recipes')" />
            <q-tab name="logout" search style="font-size:17px" dense flat class="q-mr-lg" @click="logout()" icon="logout" />
          </q-tabs>
        </q-toolbar>
      </q-footer>
    <q-page class="allPage q-pa-md" dir="rtl">
      <q-card class="card-container" flat>
<!--        <q-btn class="q-mr-sm" color="deep-orange-4" dense flat icon="logout" round size="12px" @click="logout()"></q-btn>-->
<!--        <q-btn class="q-mr-sm" color="deep-orange-4" dense flat icon="settings" round size="12px" :to="`/settings/${this.userId}`"></q-btn>-->
<!--        <q-btn class="q-mr-sm" color="deep-orange-4" dense flat icon="edit" round size="12px" :to="`/edit-profile/${this.userId}`"></q-btn>-->

        <q-card-section class="upper-container text-center">
<!--          <div class="image-container">-->
<!--            <img v-if="user.data.photoURL"-->
<!--                 :src="user.data.photoURL">-->

<!--            <img v-if="!user.data.photoURL"-->
<!--                 src="https://st.depositphotos.com/2101611/4338/v/950/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg">-->
<!--          </div>-->

<!--          <div class="lower-container">-->
<!--            <q-list class="list">-->
<!--              <q-item clickable v-ripple>-->
<!--                <q-item-section style="text-align: right" avatar>-->
<!--&lt;!&ndash;                  <q-icon color="primary" name="chevron_left" />&ndash;&gt;-->
<!--                </q-item-section>-->
<!--                <q-item-section>{{ user.data.displayName }}</q-item-section>-->
<!--              </q-item>-->

<!--&lt;!&ndash;            {{ user.data.email }}&ndash;&gt;-->
<!--            </q-list>-->
<!--          </div>-->
<!--          <q-avatar size="100px" font-size="52px">-->
<!--            <img v-if="user.data.photoURL"-->
<!--                 :src="user.data.photoURL">-->

<!--            <img v-if="!user.data.photoURL"-->
<!--                 src="https://st.depositphotos.com/2101611/4338/v/950/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg">-->
<!--          </q-avatar>-->

<!--          <q-item-section class="lower-container" ><br>-->
<!--            <q-item-label class="text-bold">{{ user.data.displayName }}</q-item-label>-->
<!--                      <q-item-label caption>-->
<!--                        {{ user.email }}-->
<!--                      </q-item-label>-->
<!--          </q-item-section>-->
        </q-card-section>

        <q-separator/>
        <br>

        <q-list class="lower-container" >
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

          <div class="row">
            <CardViewer v-model="model" v-for="card in userRecipes" :card="card" :key="card.id" :recipeId="card.id"
                        :class="{profileMode}"/>
          </div>
      </q-card>
    </q-page>
    </q-layout>
  </div>
</template>

<script>
import firebaseInstance from "@/middleware/firebase";
import {mapActions, mapState, mapMutations} from 'vuex'
import CardViewer from "../components/CardViewer"

export default {
  name: "Profile",
  components: {CardViewer},
  data() {
    return {
      profileMode: 'true',
      onlyFavorites: [],
      model: 'true',
      tab: 'face'
    }
  },
  computed: {
    ...mapState('users', ['user', 'userId', 'favorites', 'userRecipes']),
    ...mapState('recipes', ['recipes'])
  },

  methods: {
    // ...mapMutations([]),
    ...mapActions('users', ['getUserById', 'getFavorites', 'getUserRecipes']),
    ...mapActions('recipes', ['getRecipes']),

    logout() {
      firebaseInstance.firebase.auth().signOut().then(() => {
        this.$router.push('/')
      }).catch((error) => {
      });
    },

  },

  async created() {
    debugger
    await this.getUserById(window.user.uid)
    await this.getUserRecipes()
  }
}
</script>
<style scoped>

/*.profileMode {*/
/*  width: 250px;*/
/*  height: 300px;*/
/*}*/

.card-container {
  width: 375px;
  height: 812px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 10px 1px #000;
}
.upper-container {
  height: 170px;
  /*width: 400px;*/
  background-color: rgba(190, 140, 100, 0.2);
}

.image-container {
  background: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 5px;
  transform: translate(130px, 100px);
}

.image-container img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.lower-container {
  text-align: left;
  margin-top: 50px;
}
/*.email {*/
/*  margin-right: 40px;*/
/*}*/


</style>
