<template>
  <div class="login" dir="rtl">
    <div class="btnsLogin">
      <q-input color="orange" v-model="email" label="אימייל" dir="ltr">
        <template v-slot:prepend>
          <q-icon name="email"/>
        </template>
      </q-input>

      <q-input color="orange" type="password" v-model="password" label="סיסמא" dir="ltr">
        <template v-slot:prepend>
          <q-icon name="lock"/>
        </template>
      </q-input>
    </div>

    <br>
    <q-btn color="deep-orange-4" @click="loginWithEmailPassword()">התחבר</q-btn>
    <br>
    <p> או </p>
    <br>
    <div class="loginBtn">
      <q-btn style="margin-bottom: 20px" @click="facebookRegister()" rounded color="primary" label="FACEBOOK"/>
      <q-btn style="text-align:center" @click="googleProvider()" outline rounded color="red" label="GOOGLE"/>
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
    ...mapActions('users', ['googleLogin', 'providerEmailPassword']),
    ...mapMutations('users', ['setUser']),

    googleProvider() {
      const self = this
      var provider = new firebaseInstance.firebase.auth.GoogleAuthProvider();
      firebaseInstance.firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            const newUser = user.providerData[0]
            newUser.uid = user.uid;
            window.user = result.user;
            database.setUser({user: newUser}).then(() => {
              self.setUser(newUser)
              localStorage.setItem('user', JSON.stringify(newUser))
            })
          }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
    },

    loginWithEmailPassword() {
      const self = this
      firebaseInstance.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            // Signed in
            return userCredential.user;
            // console.log(user)
            // self.setUser(user)
            // localStorage.setItem('user', JSON.stringify(user))
          }).then(() => {
        // this.$router.push('/home')
      })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
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

.btnsLogin {
  margin-bottom: 40px;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  font-family: Arial;
  width: 300px;
  height:450px;
}

.loginBtn {
  display: flex;
  flex-direction: column;
}
</style>
