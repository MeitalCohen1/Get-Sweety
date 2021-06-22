<template>
  <q-layout view="lHh Lpr lFf" id="app">

    <div id="q-app">
      <q-page-container>
        <router-view/>
      </q-page-container>
    </div>

  </q-layout>
</template>


<script>
import firebaseInstance from "@/middleware/firebase";
import database from 'firebase/database';
export default {
  name: 'app',
  // data() {
  //   return {
  //   }
  // },
  // methods: {
  //
  // }
}


</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
