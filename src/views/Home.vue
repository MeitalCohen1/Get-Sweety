<template>
  <div class="home" dir="rtl">
    <div class="header-container">
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Cookie&family=Dancing+Script:wght@500&display=swap"
          rel="stylesheet">
      <!--      <q-parallax>-->
      <!--        <template v-slot:media>-->
      <!--          <img src="../assets/picHome1.jpg" class="background">-->
      <!--        </template>-->
      <!--      </q-parallax>-->
      <!--      <q-layout view="lHh lpr lFf" container style="height: 100px" class="bg-white rounded-borders">-->
      <!--        <q-header elevated class="bg-deep-orange-3">-->
      <!--&lt;!&ndash;          <q-toolbar>&ndash;&gt;-->
      <!--&lt;!&ndash;            &lt;!&ndash;            <q-btn flat round dense icon="assignment_ind"/>&ndash;&gt;&ndash;&gt;-->

      <!--&lt;!&ndash;            <q-space/>&ndash;&gt;-->
      <!--&lt;!&ndash;            <div class="head text-h3 text-white headLine">GET SWEETY</div>&ndash;&gt;-->
      <!--&lt;!&ndash;            &lt;!&ndash;            <q-btn flat round dense icon="sim_card" class="q-mr-xs"/>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;            &lt;!&ndash;            <q-btn flat round dense icon="gamepad"/>&ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;          </q-toolbar>&ndash;&gt;-->

      <!--          <q-toolbar inset>-->
      <!--            <q-breadcrumbs active-color="white" style="font-size: 16px">-->
      <!--              <q-breadcrumbs-el label="בית" icon="home" @click="$router.push('/home')"/>-->
      <!--              <q-breadcrumbs-el label="מתכונים" icon="restaurant" class="recipes" @click="$router.push('/recipes')"/>-->
      <!--              <q-breadcrumbs-el label="התחבר / הירשם" icon="people" @click="openDialog()"/>-->
      <!--            </q-breadcrumbs>-->
      <!--          </q-toolbar>-->
      <!--          <Auth/>-->
      <!--        </q-header>-->
      <!--      </q-layout>-->
    </div>

    <!--    <div class="sub-container">-->
    <div class="container">
      <img class="img1" src="../assets/picHome1.jpg"/>
      <div class="home-text">
        !welcome
      </div>
    </div>


    <div class="container-2">
      <div class="number">
        01
        02
        03
      </div>

      <div class="home-text3">
        מזינים את המרכיבים שיש ברשותינו במטבח
      </div>

      <div class="home-text4">
        ובוחרים את המתכון שהכי בא לנו!
      </div>

      <div class="home-text5">
        ניתן לבחור מתכונים גם לפי פרווה או חלבי
      </div>
    </div>

    <div dir="rtl" class="btn">
      <q-btn style="width: 200px" unelevated rounded color="brown-5" label="בוא נתחיל!" />
    </div>
  </div>
  <!--  </div>-->
</template>

<script>
// import carousel from "../components/carousel";
import firebaseInstance from "@/middleware/firebase";
import {mapActions, mapMutations} from 'vuex';
import Auth from "@/views/Auth";

export default {
  name: 'Home',
  props: ['item'],
  components: {
    Auth
  },
  data() {
    return {
      isClicked: false,
    }
  },
  methods: {
    ...mapActions('recipes', ['googleRegister']),
    ...mapMutations('recipes', ['setEditedRecipe']),
    ...mapMutations('users', ['openDialog']),

    // logout() {
    //   firebaseInstance.firebase.auth().signOut().then(() => {
    //     this.$router.push('/')
    //     // Sign-out successful.
    //   }).catch((error) => {
    //     // An error happened.
    //   });
    // },
  }
}
</script>
<style scoped>
/** {*/
/*  padding: 0;*/
/*  margin: 0;*/
/*  !*box-sizing: unset;*!*/
/*}*/

.home {
  /*  !*display: flex;*!*/
  /*  !*flex-direction: column;*!*/
  /*  !*justify-content: center;*!*/
  /*  !*align-items: center;*!*/
  /*  !*background-image: url("../assets/background2.jpg");*!*/
  background-color: rgba(190, 140, 100, 0.2);
}


/*.sub-container {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  !*justify-content: center;*!*/
/*  align-items: center;*/
/*}*/

.container {
  /*  display: flex;*/
  /*  flex-direction: row;*/
  /*  justify-content: space-around;*/
  /*  flex-wrap: nowrap;*/
  /*  align-items: center;*/
  /*  min-height: 250px;*/
  /*  margin-bottom: 10px;*/
  /*  !*height :33vh;*!*/
  /*  !*margin: 60px;*!*/
}

.tree {
  /*max-width: 450px;*/
  /*display: block;*/


}

.container-2 {
  display: flex;
  /*flex-direction: row;*/
  justify-content: space-around;
  /*flex-wrap: nowrap;*/
  /*align-items: normal;*/
  /*padding-block: 100px;*/
  padding-block-end: 260px;

  /*height: 33.3%;*/
  /*background-size: cover;*/
  /*margin-right: 60px;*/
}

/*.container-3 {*/
/*  !*flex: 1;*!*/
/*  max-width: 450px;*/
/*  !*width: 50%;*!*/
/*  display: block;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  height: 33.3%;*/

/*}*/

/*.box-1 {*/
/*  flex: 1;*/
/*}*/

.img1 {
  flex: 1;
  opacity: 95%;
  /*height: 100%;*/
  /*width: 50%;*/
  height: 80vw;
  width: 100vw;
  /*border-radius: 8px;*/
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
  display: flex;
  flex-direction: column;
  flex: auto;
}


.home-text {
  /*font-family: 'Poiret One', cursive;*/
  /*font-size: 1rem;*/
  /*text-align: center;*/
  /*margin: 30px;*/
  flex-direction: column;
  font-family: 'Cookie', cursive;
  position: absolute;
  transform: translateY(-62px) translateX(170px);
  font-size: 70px;
  color: #0a0101;
}

.number {
  font-family: 'Cookie', cursive;
  /*position: absolute;*/
  display: flex;
  /*flex-direction: column;*/
  max-width: min-content;
  margin: 10px;
  /*padding: 20px;*/
  transform: translateY(50px) translateX(10px);
  font-size: 50px;
  /*margin-right: 30px;*/
  /*margin-top: 200px;*/
  color: black;
  /*padding: 20px;*/
}

.home-text3 {
  display: flex;
  flex-direction: row;
  font-family: Arial;
  /*width: 60px;*/
  color: gray;
  /*max-width: min-content;*/
  /*justify-content: space-between;*/
  font-size: 12px;
  /*position: absolute;*/
  transform: translateY(80px) translateX(10px)

}

.home-text4 {
  display: flex;
  /*flex-direction: row;*/
  font-family: Arial;
  color: gray;
  /*max-width: min-content;*/
  /*justify-content: space-between;*/
  font-size: 12px;
  /*position: absolute;*/
  transform: translateY(155px) translateX(-100px)

}

.home-text5 {
  display: flex;
  /*flex-direction: row;*/
  font-family: Arial;
  color: gray;
  /*max-width: min-content;*/
  /*justify-content: space-between;*/
  font-size: 12px;
  /*position: absolute;*/
  transform: translateY(230px) translateX(-190px)
}

.btn {
  transform: translateY(-80px) translateX(80px);
  /*width: 300px;*/
}
.recipes {
  display: block;
}

.background {
  /*background-attachment: fixed;*/
  /*  background-image: image('/src/assets/background2.jpg');*/
}

</style>
