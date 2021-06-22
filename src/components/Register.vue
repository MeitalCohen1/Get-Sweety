<template>
  <div class="register" dir="rtl">
    <div style="margin-bottom: 50px">
      <q-input color="deep-orange-4" v-model="displayName" label="שם מלא" dir="rtl">
        <template v-slot:prepend>
          <q-icon name="face"/>
        </template>
      </q-input>

      <q-input color="deep-orange-4" v-model="email" type="email" label="אימייל" dir="ltr">
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
    <q-btn @click="clickToRegister()" color="deep-orange-4" style="margin-top: 40px">הירשם</q-btn>
    <br>
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
      favorite: '',
      dense: false,
      confirmPassword: '',
      isPwd: true,
    }
  },
  methods: {
    ...mapActions('users', ['register']),
    ...mapMutations('users', ['setLocalUser']),

    clickToRegister() {
      let payload = {}
      payload.displayName = this.displayName
      payload.email = this.email
      payload.password = this.password
      this.setLocalUser(payload)
      this.register()
      this.$router.push('/home')
    }
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
  height: 700px;
}
</style>
