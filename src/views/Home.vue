<template>
  <div class="home" dir="rtl">
    <div class="header-container">
        <q-parallax>
          <template v-slot:media>
            <img src="../assets/background2.jpg" class="background">
          </template>
        </q-parallax>
      <q-layout view="lHh lpr lFf" container style="height: 100px" class="bg-white rounded-borders">
        <q-header elevated class="bg-deep-orange-3">
          <q-toolbar>
            <q-btn flat round dense icon="assignment_ind"/>

            <q-space/>
            <div class="head text-h3 text-white headLine">GET SWEETY</div>
            <q-btn flat round dense icon="sim_card" class="q-mr-xs"/>
            <q-btn flat round dense icon="gamepad"/>
          </q-toolbar>

          <q-toolbar inset>
            <q-breadcrumbs active-color="white" style="font-size: 16px">
              <q-breadcrumbs-el label="בית" icon="home" @click="$router.push('/home')"/>
              <q-breadcrumbs-el label="מתכונים" icon="restaurant" class="recipes" @click="$router.push('/recipes')"/>
              <q-breadcrumbs-el label="התנתקות" icon="logout" @click="logout()"/>
            </q-breadcrumbs>
          </q-toolbar>
        </q-header>
      </q-layout>
    </div>

<div class="sub-container">
    <div class="container">
        <img class="img1" src="../assets/picHome1.jpg"
        />
      <div class="home-text">
        ברוכים הבאים לאפליקציה - Get sweety! <br>
        אנו כאן כדי לעזור לכם למצוא את המתכון המתאים ביותר עבורכם בהתאם למצרכים שיש לכם כרגע בבית <br>
        אז איך זה קורה?!
      </div>
    </div>

    <div class="container">
      <div class="home-text">
        קודם כל אתם בוחרים מה בא לכם? חלבי או פרווה?<br>
        לאחר מכן, אתם בוחרים את המצרכים שיש ברשותכם<br>
        ואנחנו נציע לכם את המתכונים המתאימים<br>
        אז למה אתם מחכים? תתחברו ונתחיל להכין יחד דברים סופר טעימים! <br>
        <br>
      </div>
        <img class="img2" src="../assets/picHome2.jpg"
        />
    </div>
</div>

    <div class="container tree">
      <q-card>
        <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator

        >
          <q-tab name="login" label="Log in"/>
          <q-tab name="sign up" label="Sign up"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div class="text-h6">Log in</div>
            <Login/>
          </q-tab-panel>

          <q-tab-panel name="sign up">
            <div class="text-h6">Sign up</div>
            <Register/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
// import carousel from "../components/carousel";
import firebaseInstance from "@/middleware/firebase";
import Login from "../views/Login"
import Register from "@/views/Register";
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
  name: 'Home',
  props: ['item'],
  components: {
    Register,
    Login
  },
  data() {
    return {
      tab: 'login'
    }
  },
  methods: {
    ...mapActions('recipes', ['googleRegister']),
    ...mapMutations('recipes', ['setEditedRecipe']),

    logout() {
      firebaseInstance.firebase.auth().signOut().then(() => {
        this.$router.push('/')
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    },
  }
}
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  /*box-sizing: unset;*/
}

.home {
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*background-image: url("../assets/background2.jpg");*/
}
.sub-container{
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
}
.container{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: nowrap;
  align-items: center;
  min-height: 250px;
  margin-bottom: 10px;
  /*height :33vh;*/
  /*margin: 60px;*/
}
.tree{
  /*max-width: 450px;*/
  /*display: block;*/


}

.container-2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: nowrap;
  align-items: center;
  height: 33.3%;

  /*margin: 60px;*/
}

.container-3 {
  /*flex: 1;*/
  max-width: 450px;
  /*width: 50%;*/
  display: block;
  justify-content: center;
  align-items: center;
  height: 33.3%;

}
.box-1 {
  flex: 1;
}

.img1 {
  flex: 1;
  /*opacity: 90%;*/
  height: 100%;
  width: 50%;
  border-radius: 8px;
}


.img2 {
  height: 100%;
  width: 50%;
  border-radius: 8px;
  /*opacity: 90%;*/
}


.headLine {
  font-family: 'Prata', serif;
}

.head {
  /*align-items: center;*/
  /*align-content: center;*/

}


.home-text {
  font-family: 'Poiret One', cursive;
  font-size: 1rem;
  text-align: center;
  /*margin: 30px;*/

}

.recipes {
  display: block;
}

.background {
  /*background-attachment: fixed;*/
  /*  background-image: image('/src/assets/background2.jpg');*/
}

</style>
