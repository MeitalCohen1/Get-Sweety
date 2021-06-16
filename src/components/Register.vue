<template>
  <div class="register" dir="rtl">
    <div style="margin-bottom: 50px">
      <q-input color="deep-orange-4" v-model="displayName" label="שם מלא" dir="rtl">
        <template v-slot:prepend>
          <q-icon name="face"/>
        </template>
      </q-input>

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

      <q-input color="deep-orange-4" type="password" v-model="confirmPassword"
               label="אימות סיסמא" dir="ltr" :rules="[comparePassword => comparePassword === password]">
        <template v-slot:prepend>
          <q-icon name="lock"/>
        </template>
      </q-input>
    </div>

    <!--        <div class="checkBox q-gutter-sm">-->
    <!--          <p style="color: darkgray"> העדפה למתכונים :</p>-->
    <!--          <q-checkbox dense v-model="localUser.sweet" label="מתוק" color="deep-orange-4"/>-->
    <!--          <q-checkbox dense v-model="localUser.salt" label="מלוח" color="deep-orange-4"/>-->
    <!--        </div>-->

    <q-btn @click="clickToRegister()" color="deep-orange-4" style="margin-top: 40px">הירשם</q-btn>
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
import {mapActions, mapState, mapMutations} from 'vuex';


export default {
  name: "Register",
  computed: mapState('users', ['user']),
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
      dense: false,
      confirmPassword: '',
      // sweet: false,
      // salt: false,
    }
  },
  methods: {
    ...mapActions('users', ['register']),
    ...mapMutations('users', ['setLocalUser']),
    // validatePass() {
    //   console.log(this.password.value === this.confirmPassword.value)
    // },

    clickToRegister() {
      let payload = {}
      payload.displayName = this.displayName
      payload.email = this.email
      payload.password = this.password
      this.setLocalUser(payload)
      this.register()
      this.$router.push('/home')
    }



    // register() {
    //   firebaseInstance.firebase.auth().createUserWithEmailAndPassword(this.localUser.email, this.password)
    //       .then((userCredential) => {
    //         // Signed in
    //         var user = userCredential.user;
    //         window.user = user
    //         // const newUser = user.providerData[0]
    //         // firebaseDatabase.setUser({user: newUser})
    //         // this.$router.push('/home')
    //         // console.log(user)
    //         this.register()
    //       })
    //       .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //       });
    // },
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
  font-family: Arial, sans-serif;
  /*width: 300px;*/
  height: 700px;
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
