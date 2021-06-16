<template>
  <div class="login" dir="rtl">
    <div class="inputLogin">
      <q-input color="deep-orange-4" v-model="email" label="אימייל" dir="ltr">
        <template v-slot:prepend>
          <q-icon name="email"/>
        </template>
      </q-input>

      <q-input color="deep-orange-4" type="password" v-model="password" label="סיסמא" dir="ltr">
        <template v-slot:prepend>
          <q-icon name="lock"/>
        </template>
      </q-input>
    </div>

    <br>
    <q-btn color="deep-orange-4" @click="loginWithEmailPasswordBtn()">התחבר</q-btn>
    <br>
    <p> או </p>
    <br>
    <div class="loginBtn">
      <q-btn style="margin-bottom: 20px" @click="facebookRegister()" rounded color="primary" label="FACEBOOK"/>
      <q-btn style="text-align:center" @click="loginWithGoogleBtn()" outline rounded color="red" label="GOOGLE"/>
    </div>
  </div>
</template>

<script>
import firebaseInstance from '../middleware/firebase'
import database from '../middleware/firebase/database'
import {mapActions, mapMutations} from 'vuex';

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      dense: false
    }
  },
  methods: {
    ...mapActions('users', ['loginWithGoogle', 'loginWithEmailPassword']),
    ...mapMutations('users', ['setLocalUser']),

    loginWithGoogleBtn() {
      this.loginWithGoogle()
      this.$router.push('/home')
  },

    loginWithEmailPasswordBtn() {
      let payload = {};
      payload.email = this.email
      payload.password = this.password
      this.setLocalUser(payload)
      this.loginWithEmailPassword()
      this.$router.push('/home')
    }

  },
  created() {
    if (window.user) {
      this.$router.push('/recipes')
    }
  }
}
</script>

<style scoped>

.inputLogin {
  margin-bottom: 40px;

}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  font-family: Arial, sans-serif;
  /*width: 300px;*/
  height: 700px;
}

.loginBtn {
  display: flex;
  flex-direction: column;
}
</style>
