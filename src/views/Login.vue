<template>
  <div class="login" dir="rtl">

    <!--    <img class="blabla" src="https://veg.co.il/wp-content/uploads/vegan-pancake-1932x942.jpg" style="width:500px">-->
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

    <br>
    <q-btn @click="loginWithEmailPassword()">התחבר</q-btn>

    <br>
    <p> או </p>
    <br>
    <div class="loginBtn">
      <q-btn class="glossy" icon="facebook" @click="facebookRegister()" rounded color="primary" label="FACEBOOK"/>
      <q-btn class="glossy" icon="Google" @click="googleProvider()" rounded color="orange-10" label="GOOGLE"/>
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
.login {
  display: flex;
  max-width: 400px;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  font-family: 'Amatic SC', cursive;
  width: 300px;
  margin-right: auto;
  margin-left: auto;
}

.loginBtn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
}

</style>


<!--makegood@test.com-->
