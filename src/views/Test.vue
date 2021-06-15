<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 400px" class="shadow-2 rounded-borders">
<!--      <q-header reveal elevated>-->
<!--        <q-toolbar>-->
<!--          <q-btn flat round dense icon="menu" class="q-mr-sm" />-->
<!--          <q-avatar>-->
<!--            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
<!--          </q-avatar>-->

<!--          <q-toolbar-title>Quasar Framework</q-toolbar-title>-->

<!--          <q-btn flat round dense icon="whatshot" />-->
<!--        </q-toolbar>-->
<!--      </q-header>-->

      <q-footer reveal elevated>
        <q-toolbar>
          <q-toolbar-title>Footer</q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page class="q-pa-md">
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>

  <!--  <div style="display: flex; justify-content: center; flex-direction: column; align-items: center">-->
<!--<h3 v-bind:class="{model}">-->
<!--  TEST PAGE!!!!!!!!!!!!!!S-->
<!--</h3>-->

<!--  <q-btn v-model="model" icon="favorite" color="red" v-if="model" @click="model = !model"/>-->
<!--  <q-btn v-model="model" icon="favorite" color="orange" v-if="!model" @click="model = !model"/>-->
<!--  </div>-->

<!--  <div>-->
<!--    <Child :age="age"/>-->
<!--    <h3>I AM Futher AND I AM {{age}} YEARS OLD</h3>-->
<!--    <Brother @updateAge="setAge"/>-->
<!--  </div>-->

</template>

<script>
import Brother from "@/components/test/Brother";
import Child from "@/components/test/Child";
export default {
  name: "Test",
  components: {Brother, Child},
  data() {
    return {
      model: false,
      age: 0
    }
  },
  methods: {
    setAge(age) {
      this.age = age;
    }
  }
}
</script>

<style scoped>
h3 {
  transition: 0.5s ;
}

.model {
  transition: 0.5s;
  font-size: 100px;
}

</style>
