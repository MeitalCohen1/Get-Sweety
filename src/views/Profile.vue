<template>
  <div>
    <q-page class="q-pa-md" dir="rtl">
      <h4>הפרופיל שלי</h4>


      <q-card class="my-card" flat>
        <q-btn
            class="q-mr-sm"
            color="deep-orange-4"
            dense
            flat
            icon="logout"
            round
            size="12px"
            @click="logout()">
          <q-tooltip>Logout</q-tooltip>
        </q-btn>

        <q-btn
            class="q-mr-sm"
            color="deep-orange-4"
            dense
            flat
            icon="settings"
            round
            size="12px"
            :to="`/settings/${this.userId}`">
          <q-tooltip>Settings</q-tooltip>
        </q-btn>

        <q-btn
            class="q-mr-sm"
            color="deep-orange-4"
            dense
            flat
            icon="edit"
            round
            size="12px"
            :to="`/edit-profile/${this.userId}`">
          <q-tooltip>Edit Profile</q-tooltip>
        </q-btn>

        <q-card-section class="text-center">

          <q-avatar size="100px" font-size="52px">
            <img v-if="user.data.photoURL"
                 :src="user.data.photoURL">

            <img v-if="!user.data.photoURL"
                 src="https://st.depositphotos.com/2101611/4338/v/950/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg">
          </q-avatar>

          <q-item-section><br>
            <q-item-label class="text-bold">{{ user.data.displayName }}</q-item-label>
            <!--          <q-item-label caption>-->
            <!--            {{ user.email }}-->
            <!--          </q-item-label>-->
          </q-item-section>
        </q-card-section>

        <q-separator/>
        <br>

        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon color="deep-orange-4" name="email"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ user.data.email }}</q-item-label>
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

          <div class="row">
            <CardViewer v-model="model" v-for="card in userRecipes" :card="card" :key="card.id" :recipeId="card.id"
                        :class="{profileMode}"/>
          </div>
          <!--        <q-item>-->
          <!--          <q-item-section avatar>-->
          <!--            <q-icon color="grey" name="bolt"/>-->
          <!--          </q-item-section>-->

          <!--          <q-item-section>-->
          <!--            <q-item-label>{{ user.status }}</q-item-label>-->
          <!--          </q-item-section>-->
          <!--        </q-item>-->
        </q-list>
      </q-card>
    </q-page>
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
        this.$router.push('/home')
      }).catch((error) => {
      });
    },
  },

  async created() {
    await this.getUserById(window.user.uid)
    await this.getUserRecipes()
  }
}
</script>
<style scoped>

.profileMode {
  width: 250px;
  height: 300px;
}

</style>
