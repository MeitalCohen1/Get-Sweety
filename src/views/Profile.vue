<template>
  <q-page class="q-pa-md" dir="rtl">
<h4>הפרופיל שלי</h4>
    <q-card class="my-card" flat>

      <q-btn
          class="q-mr-sm"
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
            <q-icon color="grey" name="email"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.data.email }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>
            <q-icon color="grey" name="favorite"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ "מתכונים שהכי אהבתי" }}</q-item-label>
          </q-item-section>
        </q-item>

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
</template>

<script>
import firebaseInstance from "@/middleware/firebase";
import {mapActions, mapState, mapMutations} from 'vuex'

export default {
  name: "Profile",
  data() {
    return {

    }
  },
  computed: {...mapState('users', ['user', 'userId'])},

  methods: {
    // ...mapMutations('auth', ['resetUserId', 'resetUser','']),
    ...mapActions('users', ['getUserById']),
    // logout() {/
    //   this.logoutAction(this.userId).then(()=>{
    //     localStorage.setItem('uid', JSON.stringify(false))
    //     localStorage.setItem('user', JSON.stringify(false))
    //     this.$router.push('/Login')
    //   })
    // }
  },

  created() {
    this.getUserById(window.user.uid)
    console.log('nnnnnn'+ window.user.uid)
  }

}
</script>
<style lang="sass" scoped>

</style>
