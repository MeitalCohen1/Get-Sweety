<template>
  <div class="container">
    <!--    <q-dialog v-model="isClicked">-->
    <q-card class="tabs">
      <q-tabs
          v-model="tab"
          class="text-black"
          active-color="deep-orange-4"
          indicator-color="deep-orange-4"
          align="justify"
          narrow-indicator
      >
        <q-tab name="login" label="התחבר"/>
        <q-tab name="register" label="הירשם"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels class="tabs" v-model="tab" animated>
        <q-tab-panel name="register">
          <div class="register text-h6">הירשם</div>
          <Register/>
          <!--          <q-btn flat label="ביטול" @click="closeDialog"/>-->
        </q-tab-panel>

        <q-tab-panel name="login">
          <div class="login text-h6">התחבר</div>
          <Login/>
          <!--          <q-btn flat label="ביטול" @click="closeDialog"/>-->
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <!--    </q-dialog>-->
  </div>
</template>

<script>
import Register from "@/components/Register";
import Login from "@/components/Login";
import {mapState, mapMutations} from "vuex";

export default {
  name: "Auth",
  components: {
    Register,
    Login
  },
  data() {
    return {
      tab: 'register',
    }
  },
  // computed: mapState('users', ['isClicked']),
  methods: {
    // ...mapMutations('users', ['closeDialog']),
  }
}
</script>

<style scoped>

.tabs {
  background-image: linear-gradient(rgba(200, 170, 150, 0.2), rgba(120, 130, 130, 0.5)),url("../assets/piccc.jpg");

/*  background-color: #1D1D1D;*/
  background-size: 1150px;
  background-repeat: no-repeat;
  position: relative;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*margin: 30px;*/
  /*justify-content: start;*/
}

.register {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

</style>
