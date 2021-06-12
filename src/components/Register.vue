<template>
  <div class="register" dir="rtl">
    <q-input color="orange" v-model="localUser.fullName" label="שם מלא" dir="rtl">
      <template v-slot:prepend>
        <q-icon name="face"/>
      </template>
    </q-input>

    <q-input color="orange" v-model="localUser.email" label="אימייל" dir="ltr">
      <template v-slot:prepend>
        <q-icon name="email"/>
      </template>
    </q-input>

    <q-input color="orange" type="password" v-model="password" label="סיסמא" dir="ltr">
      <template v-slot:prepend>
        <q-icon name="lock"/>
      </template  >
    </q-input>

    <q-input color="orange" type="password" v-model="confirmPassword" label="אימות סיסמא" dir="ltr">
      <template v-slot:prepend>
        <q-icon name="lock"/>
      </template>
    </q-input>


<!--    <div class="checkBox q-gutter-sm">-->
<!--      <p style="color: darkgray"> העדפה למתכונים :</p>-->
<!--      <q-checkbox dense v-model="localUser.sweet" label="מתוק" color="deep-orange-4"/>-->
<!--      <q-checkbox dense v-model="localUser.salt" label="מלוח" color="deep-orange-4"/>-->
<!--    </div>-->

    <!--    <q-input v-model="email" label="Email" :dense="dense"/>-->
    <!--    <q-input v-model="password" label="Password" :dense="dense"/>-->

    <q-btn @click="signUp()" color="deep-orange-4" style="margin-top: 40px">הירשם</q-btn>

    <br>
    <!--    <p> או </p>-->
    <!--    <br>-->
    <!--    <div class="registerBtn">-->
    <!--      <q-btn class="glossy" icon="facebook" @click="facebookRegister()" rounded color="primary" label="FACEBOOK"/>-->
    <!--      <q-btn class="glossy" icon="Google" @click="googleRegister()" rounded color="orange-10" label="GOOGLE"/>-->
    <!--    </div>-->
  </div>
</template>

<script>
import firebaseInstance from '../middleware/firebase'
import firebaseDatabase from '../middleware/firebase/database'
import {mapActions, mapState} from 'vuex';


export default {
  name: "Register",
  computed: mapState('users', ['user']),
  data() {
    return {
      password: '',
      confirmPassword: '',
      localUser: {
        email: '',
        dense: false,
        fullName: '',
        sweet: false,
        salt: false,
      }
    }
  },
  methods: {
    ...mapActions('users', ['insertLogin']),
    signUp() {
      firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.localUser.email, this.password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            window.user = user
            const newUser = user.providerData[0]
            firebaseDatabase.setUser({user: newUser})
            // this.$router.push('/home')
            console.log(user)
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    },
  },
}
</script>

<style scoped>

.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  font-family: Arial;
  width: 300px;
  height: 450px;
}

.checkBox {
  flex: 1;
  margin: 60px;
}

.registerBtn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
}
</style>
