<template>
<!--  <div style="display: flex; justify-content: center; flex-direction: column; align-items: center">-->
<!--<h3 v-bind:class="{model}">-->
<!--  TEST PAGE!!!!!!!!!!!!!!S-->
<!--</h3>-->

<!--  <q-btn v-model="model" icon="favorite" color="red" v-if="model" @click="model = !model"/>-->
<!--  <q-btn v-model="model" icon="favorite" color="orange" v-if="!model" @click="model = !model"/>-->
<!--  </div>-->

  <div>
    <Child :age="age"/>
    <h3>I AM Futher AND I AM {{age}} YEARS OLD</h3>
    <Brother @updateAge="setAge"/>
  </div>

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
